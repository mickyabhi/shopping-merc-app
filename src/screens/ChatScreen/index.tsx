import React, { useEffect, useRef, useState } from "react";
import { View, Text, Image, FlatList, Keyboard } from "react-native";
import Header from "../../components/Header";
import Input from "../../components/InputText";
import { scaledValue } from "../../utils/design.utils";
import cameraIcon from "../../../assets/images/camera_icon.png";
import { TextInput, TouchableRipple } from "react-native-paper";
import rightArrowIcon from "../../../assets/images/right-arrow.png";
import Message from "./components/Messages";
import {
  getItemFromAsyncStorage,
  uploadImageInS3,
} from "../../utils/storage.utils";
import { API } from "aws-amplify";
import * as queries from "../../graphql/queries";
import * as mutations from "../../graphql/mutations";
import * as subscriptions from "../../graphql/subscriptions";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMessage,
  fetchStoreData,
  fetchStoreImage,
  showAlertToast,
  showLoading,
} from "../AppStore/actions";
import ChooseImageModal from "../ProfileSettings/components/ChooseImageModal";
import ImagePicker from "react-native-image-crop-picker";
import ChatImageModal from "./components/ChatImageModal";
import { styles } from "./styles";
import { AlertMessage, MessageType } from "../../utils/constants";
import { sendNotificationToTopic } from "../../utils/services";
import crashlytics from "@react-native-firebase/crashlytics";

const ChatScreen = (props) => {
  const dispatch = useDispatch();
  const flatListRef = useRef<any>();
  const storeImage = useSelector<any>((state) => state?.storeImage);
  const storeName = useSelector<any>((state) => state?.store?.name);
  const [message, setMessage] = useState("");
  const [conversationId, setConversationId] = useState(null);
  const chat = useSelector<any>((state) => state?.saveMessage);
  const [imageSelectModal, setImageSelectModal] = useState(false);
  const [chatImageModal, setChatImageModal] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [userImage, setUserImage] = useState(null);
  const [sortedStoreImage, setSortedStoreImage] = useState(null);

  const loadUserImage = async (userId) => {
    const userImg = await API.graphql({
      query: queries.imagesByUserId,
      variables: { userId: userId },
    }).then((resp: any) => resp.data.imagesByUserId.items);
    setUserImage(
      userImg.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    );
  };

  const sendMessage = async () => {
    Keyboard.dismiss();
    setMessage("");
    const storeId = await getItemFromAsyncStorage("store_id");
    const createMessageInput = {
      userId: props?.route?.params?.userId,
      storeId: storeId,
      senderId: storeId,
      conversationId: conversationId,
      message: message,
      type: message.includes(".jpg") ? MessageType.IMAGE : MessageType.TEXT,
    };

    const createMessage = await API.graphql({
      query: mutations.createMessage,
      variables: { input: createMessageInput },
    }).catch((error) => {
      console.log("createMessage.error", error);
      crashlytics()?.recordError(error);
      dispatch(
        showAlertToast({
          alertMessage: error?.message || AlertMessage.SOMETHING_WENT_WRONG,
        })
      );
    });
    console.log("createMessage", createMessage);
    dispatch(fetchMessage(conversationId));
    sendNotificationToTopic(
      "Blocal Message",
      createMessageInput.message,
      "CAU" + props?.route?.params?.userId,
      {
        conversationId: conversationId,
        storeId: storeId,
        shortId: props?.route?.params?.orderId,
        storeName: storeName,
        sortedStoreImage: sortedStoreImage
          ? sortedStoreImage[0]?.imagePath
          : null,
      }
    );
  };
  const loadConversation = async (userId) => {
    const storeId = await getItemFromAsyncStorage("store_id");
    const conversation = await API.graphql({
      query: queries.conversationsByStoreId,
      variables: {
        storeId: storeId,
        filter: { userId: { eq: userId } },
      },
    }).then((resp) => resp.data.conversationsByStoreId.items[0].id);

    setConversationId(conversation);
  };
  const loadMessage = async () => {
    dispatch(fetchMessage(conversationId));
    API.graphql({
      query: subscriptions.onCreateMessageByConversationId,
      variables: { conversationId: conversationId },
    }).subscribe({
      next: ({ value }) => {
        dispatch(fetchMessage(conversationId));
      },
      error: (error) => {
        console.log("subscribe.error", JSON.stringify(error));
      },
    });
  };
  useEffect(() => {
    loadMessage();
  }, [conversationId]);

  useEffect(() => {
    setSortedStoreImage(
      storeImage?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    );
  }, [storeImage]);

  useEffect(() => {
    loadConversation(props?.route?.params?.userId);
    dispatch(fetchStoreImage());
    dispatch(fetchStoreData());
    loadUserImage(props?.route?.params?.userId);
  }, []);
  return (
    <>
      <View style={styles.chatScreenView}>
        <Header
          headerTitle={props?.route?.params?.userName}
          avatarImage={userImage ? userImage[0]?.imagePath : null}
        />
        <View style={styles.mainView}>
          <View style={styles.orderIdView}>
            <Text allowFontScaling={false} style={styles.orderIdText}>
              Order ID: {props?.route?.params?.orderId}
            </Text>
          </View>
          <View style={styles.chatScreenMainView}>
            <FlatList
              ref={flatListRef}
              showsVerticalScrollIndicator={false}
              onContentSizeChange={() => flatListRef.current.scrollToEnd()}
              data={chat?.sort(
                (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
              )}
              renderItem={({ item }) => (
                <Message
                  message={item.message}
                  senderId={item.senderId}
                  storeId={item.storeId}
                  label={props?.route?.params?.userName}
                  storeName={storeName ? storeName : ""}
                  storeImage={sortedStoreImage}
                  userImage={userImage}
                  type={item?.type}
                  onPress={() => {
                    setChatImageModal(true);
                    setPreviewImage(item.message);
                  }}
                />
              )}
            />
            <View style={styles.inputMainView}>
              <Input
                style={styles.inputText}
                borderRadius={scaledValue(8)}
                underlineColor="#e8e8e8"
                value={message}
                onChangeText={(value) => setMessage(value)}
                label={"Type a message"}
                rightPosition={
                  <TextInput.Icon
                    color="gray"
                    name={cameraIcon}
                    size={scaledValue(51.17)}
                    onPress={() => {
                      setImageSelectModal(true);
                      setPreviewImage("");
                      Keyboard.dismiss();
                    }}
                  />
                }
              />
              <TouchableRipple
                style={styles.iconView(message)}
                rippleColor="#F5672E"
                onPress={sendMessage}
                disabled={message ? false : true}
              >
                <Image source={rightArrowIcon} style={styles.rightArrowIcon} />
              </TouchableRipple>
            </View>
          </View>
        </View>
        <ChooseImageModal
          visible={imageSelectModal}
          onDismiss={() => setImageSelectModal(false)}
          selectImage={() => {
            dispatch(showLoading(true));
            ImagePicker.openPicker({
              width: scaledValue(300),
              height: scaledValue(300),
            }).then(async (image) => {
              setMessage(await uploadImageInS3(image.path));
              setChatImageModal(true);
              dispatch(showLoading(false));
            });
            setImageSelectModal(false);
          }}
          takeImage={() => {
            dispatch(showLoading(true));
            ImagePicker.openCamera({
              width: scaledValue(300),
              height: scaledValue(300),
            }).then(async (image) => {
              setMessage(await uploadImageInS3(image.path));
              setChatImageModal(true);
              dispatch(showLoading(false));
            });

            setImageSelectModal(false);
          }}
        />
      </View>
      <ChatImageModal
        visible={chatImageModal}
        onDismiss={() => setChatImageModal(false)}
        chatImage={message}
        sendMessage={sendMessage}
        previewImage={previewImage}
        onPress={() => {
          setChatImageModal(false);
          setMessage("");
          dispatch(showLoading(false));
        }}
      />
    </>
  );
};

export default ChatScreen;
