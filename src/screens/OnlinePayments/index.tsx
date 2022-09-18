import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import { scaledValue } from "../../utils/design.utils";
import { fetchPaymentHistory } from "../AppStore/actions";
import EditPaymentModal from "../OnlinePayments/Component/EditPaymentModal";
import PaymentHistoryCard from "./Component/PaymentHistory";

const OnlinePayments = () => {
  const [paymentModal, setPaymentModal] = useState(false);
  const dispatch = useDispatch();
  const paymentHistory = useSelector<any>((state) => state?.paymentHistory);

  useEffect(() => {
    dispatch(fetchPaymentHistory());
  }, []);
  return (
    <View style={styles.paymentHistoryView}>
      <Header
        headerTitle="Online Payments"
        textButton={`${
          paymentHistory ? paymentHistory?.length : ""
        } Online Payments`}
      />
      <View style={styles.paymentHistoryMainView}>
        <FlatList
          data={paymentHistory?.sort(
            (a, b) => new Date(b?.createdAt) - new Date(a?.createdAt)
          )}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <PaymentHistoryCard
              userId={item?.userId}
              orderId={item?.orderId}
              transactionId={item?.razorpay_payment_id}
              date={item?.createdAt}
            />
          )}
        />
        <EditPaymentModal
          visible={paymentModal}
          hideModal={() => setPaymentModal(false)}
        />
      </View>
    </View>
  );
};

export default OnlinePayments;
const styles = StyleSheet.create({
  paymentHistoryView: {
    flex: 1,
    backgroundColor: "#fff",
  },
  paymentHistoryMainView: {
    flex: 1,
    alignItems: "center",
    paddingTop: scaledValue(47),
  },
});
