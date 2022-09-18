import { put, takeEvery } from "redux-saga/effects";
import {
  actions,
  saveStore,
  saveAllProducts,
  saveStoreBankInfo,
  saveAllStoreProducts,
  saveStoreCategories,
  saveStoreOrders,
  saveCartItems,
  saveStoreImage,
  saveMessage,
  saveSubCategory,
  saveStoreRating,
  savePaymentHistory,
  showLoading,
  showAlertToast,
  saveUser,
  saveRazorPayOrder,
  saveRazorPayPayment,
  saveOrdersForGraph,
} from "./actions";
import * as queries from "../../graphql/queries";
import { API } from "aws-amplify";
import { getItemFromAsyncStorage } from "../../utils/storage.utils";
import { AlertMessage, ErrorMessage, OrderStatus } from "../../utils/constants";
import crashlytics from "@react-native-firebase/crashlytics";

function* fetchStoreData() {
  try {
    yield put(showLoading(true));
    const storeId = yield getItemFromAsyncStorage("store_id");
    const userId = yield getItemFromAsyncStorage("current_user_id");

    if (storeId) {
      const store = yield API.graphql({
        query: queries.getStore,
        variables: { id: storeId },
      }).then((resp) => resp.data.getStore);
      yield put(saveStore(store));
    }

    if (userId) {
      const user = yield API.graphql({
        query: queries.getUser,
        variables: { id: userId },
      }).then((resp) => resp.data.getUser);
      yield put(saveUser(user));
      yield put(showLoading(false));
    }
  } catch (error) {
    crashlytics().recordError(error);
    yield put(showLoading(false));
    if (error?.errors[0]?.message == ErrorMessage.GRAPHQL_NETWORK_ERROR) {
      yield put(
        showAlertToast({
          alertMessage: AlertMessage.NETWORK_CONNECTION_MESSAGE,
          actionButtonTitle: "OK",
        })
      );
    } else {
      yield put(
        showAlertToast({
          alertMessage: error?.message || AlertMessage.SOMETHING_WENT_WRONG,
          actionButtonTitle: "OK",
        })
      );
    }
  }
}

function* bankInfo() {
  try {
    yield put(showLoading(true));
    const storeId = yield getItemFromAsyncStorage("store_id");
    if (storeId != null) {
      const bankInfo = yield API.graphql({
        query: queries.bankInfoByStoreId,
        variables: { storeId: storeId },
      }).then((resp) => resp.data.bankInfoByStoreId.items);
      yield put(saveStoreBankInfo(bankInfo));
    }
    yield put(showLoading(false));
  } catch (error) {
    yield put(showLoading(false));
    if (error?.errors[0]?.message == ErrorMessage.GRAPHQL_NETWORK_ERROR) {
      yield put(
        showAlertToast({
          alertMessage: AlertMessage.NETWORK_CONNECTION_MESSAGE,
          actionButtonTitle: "OK",
        })
      );
    } else {
      yield put(
        showAlertToast({
          alertMessage: error?.message || AlertMessage.SOMETHING_WENT_WRONG,
          actionButtonTitle: "OK",
        })
      );
    }

    crashlytics().recordError(error);
  }
}

function* fetchAllStoreProducts({ category }: any) {
  try {
    yield put(showLoading(true));
    const storeId = yield getItemFromAsyncStorage("store_id");
    let products = null;
    if (category != null) {
      products = yield API.graphql({
        query: queries.productByCategory,
        variables: {
          category,
          limit: 10000,
          filter: { deletedAt: { attributeExists: false } },
        },
      }).then((resp) => resp?.data?.productByCategory?.items);
      products = products?.sort((a, b) =>
        a?.description.localeCompare(b?.description)
      );
    }
    let storeProducts = yield API.graphql({
      query: queries.productsByStoreId,
      variables: {
        storeId,
        limit: 10000,
        filter: { deletedAt: { attributeExists: false } },
      },
    }).then((resp) => resp?.data?.productsByStoreId?.items);

    storeProducts = storeProducts?.sort((a, b) =>
      a?.product?.description.localeCompare(b?.product?.description)
    );

    yield put(saveAllStoreProducts(storeProducts));
    if (products != null) {
      yield put(saveAllProducts(products));
    }
    yield put(showLoading(false));
  } catch (error) {
    yield put(showLoading(false));
    console.log("fetchAllStoreProducts.saga.error", error);
    if (error?.errors[0]?.message == ErrorMessage.GRAPHQL_NETWORK_ERROR) {
      yield put(
        showAlertToast({
          alertMessage: AlertMessage.NETWORK_CONNECTION_MESSAGE,
          actionButtonTitle: "OK",
        })
      );
    } else {
      yield put(
        showAlertToast({
          alertMessage: error?.message || AlertMessage.SOMETHING_WENT_WRONG,
          actionButtonTitle: "OK",
        })
      );
    }

    crashlytics().recordError(error);
  }
}

function* fetchCartItems({ cartId }: any) {
  try {
    if (cartId != null) {
      const cartItemsByCart = yield API.graphql({
        query: queries.cartsItemsByCartId,
        variables: { cartId },
      }).then((resp) => resp.data.cartsItemsByCartId.items);
      yield put(saveCartItems(cartItemsByCart));
    }
  } catch (error) {
    put(
      showAlertToast({
        alertMessage: error?.message || AlertMessage.SOMETHING_WENT_WRONG,
        actionButtonTitle: "OK",
      })
    );
    crashlytics().recordError(error);
  }
}

function* fetchStoreOrders() {
  try {
    const storeId = yield getItemFromAsyncStorage("store_id");
    let orders = yield API.graphql({
      query: queries.ordersByStoreId,
      variables: {
        limit: 10000,
        filter: {
          orderStatus: { ne: OrderStatus.OPEN },
          deliveryAddress: { attributeExists: true },
        },
        storeId: storeId,
      },
    }).then((resp) => resp.data.ordersByStoreId.items);
    orders = orders.filter(
      (order) => order.orderStatus != OrderStatus.CANCELLED
    );
    yield put(saveStoreOrders(orders));
  } catch (error) {
    crashlytics().recordError(error);
    if (error?.errors[0]?.message == ErrorMessage.GRAPHQL_NETWORK_ERROR) {
      yield put(
        showAlertToast({
          alertMessage: AlertMessage.NETWORK_CONNECTION_MESSAGE,
          actionButtonTitle: "OK",
        })
      );
    } else {
      yield put(
        showAlertToast({
          alertMessage: error?.message || AlertMessage.SOMETHING_WENT_WRONG,
          actionButtonTitle: "OK",
        })
      );
    }
  }
}

function* fetchStoreImage() {
  try {
    const storeId = yield getItemFromAsyncStorage("store_id");
    if (storeId != null) {
      const storeImage = yield API.graphql({
        query: queries.imagesByStoreId,
        variables: { storeId: storeId },
      }).then((resp) => resp.data.imagesByStoreId.items);

      yield put(saveStoreImage(storeImage));
    }
  } catch (error) {
    if (error?.errors[0]?.message == ErrorMessage.GRAPHQL_NETWORK_ERROR) {
      yield put(
        showAlertToast({
          alertMessage: AlertMessage.NETWORK_CONNECTION_MESSAGE,
          actionButtonTitle: "OK",
        })
      );
    } else {
      yield put(
        showAlertToast({
          alertMessage: error?.message || AlertMessage.SOMETHING_WENT_WRONG,
          actionButtonTitle: "OK",
        })
      );
    }

    crashlytics().recordError(error);
  }
}

function* fetchMessage({ conversationId }: any) {
  try {
    if (conversationId != null) {
      const chat = yield API.graphql({
        query: queries.messagesByConversationId,
        variables: {
          limit: 10000,
          conversationId: conversationId,
        },
      }).then((resp) => resp.data.messagesByConversationId.items);
      yield put(saveMessage(chat));
    }
  } catch (error) {
    yield put(showLoading(false));
    if (error?.errors[0]?.message == ErrorMessage.GRAPHQL_NETWORK_ERROR) {
      yield put(
        showAlertToast({
          alertMessage: AlertMessage.NETWORK_CONNECTION_MESSAGE,
          actionButtonTitle: "OK",
        })
      );
    } else {
      yield put(
        showAlertToast({
          alertMessage: error?.message || AlertMessage.SOMETHING_WENT_WRONG,
          actionButtonTitle: "OK",
        })
      );
    }

    crashlytics().recordError(error);
  }
}

function* fetchSubCategoryByCategory({ subCategory }: any) {
  try {
    yield put(showLoading(true));
    if (subCategory != null) {
      const products = yield API.graphql({
        query: queries.productByMasterCategory,
        variables: { masterCategory: subCategory, limit: 10000 },
      }).then((res) => res.data.productByMasterCategory.items);
      const category = [...new Set(products.map((item) => item.category))];
      yield put(saveSubCategory(category));
    }
    yield put(showLoading(false));
  } catch (error) {
    yield put(showLoading(false));
    if (error?.errors[0]?.message == ErrorMessage.GRAPHQL_NETWORK_ERROR) {
      yield put(
        showAlertToast({
          alertMessage: AlertMessage.NETWORK_CONNECTION_MESSAGE,
          actionButtonTitle: "OK",
        })
      );
    } else {
      yield put(
        showAlertToast({
          alertMessage: error?.message || AlertMessage.SOMETHING_WENT_WRONG,
          actionButtonTitle: "OK",
        })
      );
    }

    crashlytics().recordError(error);
  }
}

function* orderRatingByStoreId({ storeId }: any) {
  try {
    if (storeId != null) {
      const storeRating = yield API.graphql({
        query: queries.orderRatingByStoreId,
        variables: { storeId: storeId },
      }).then((resp) => resp.data.orderRatingByStoreId.items);

      yield put(saveStoreRating(storeRating));
    }
  } catch (error) {
    if (error?.errors[0]?.message == ErrorMessage.GRAPHQL_NETWORK_ERROR) {
      yield put(
        showAlertToast({
          alertMessage: AlertMessage.NETWORK_CONNECTION_MESSAGE,
          actionButtonTitle: "OK",
        })
      );
    } else {
      yield put(
        showAlertToast({
          alertMessage: error?.message || AlertMessage.SOMETHING_WENT_WRONG,
          actionButtonTitle: "OK",
        })
      );
    }

    crashlytics().recordError(error);
  }
}

function* fetchPaymentHistory() {
  try {
    const storeId = yield getItemFromAsyncStorage("store_id");
    if (storeId != null) {
      const fetchPayment = yield API.graphql({
        query: queries.razorPayPaymentByStoreId,
        variables: { storeId: storeId },
      }).then((resp) => resp.data?.razorPayPaymentByStoreId?.items);
      yield put(savePaymentHistory(fetchPayment));
    }
  } catch (error) {
    yield put(showLoading(false));
    if (error?.errors[0]?.message == ErrorMessage.GRAPHQL_NETWORK_ERROR) {
      yield put(
        showAlertToast({
          alertMessage: AlertMessage.NETWORK_CONNECTION_MESSAGE,
          actionButtonTitle: "OK",
        })
      );
    } else {
      yield put(
        showAlertToast({
          alertMessage: error?.message || AlertMessage.SOMETHING_WENT_WRONG,
          actionButtonTitle: "OK",
        })
      );
    }

    crashlytics().recordError(error);
  }
}

function* fetchRazorPayOrder({ orderIdForPayment, orderIdForOrder }: any) {
  try {
    yield put(showLoading(true));
    if (orderIdForPayment != null) {
      const razorPayPayment = yield API.graphql({
        query: queries.razorPayPaymentByOrderId,
        variables: { orderId: orderIdForPayment },
      }).then((resp) => resp.data.razorPayPaymentByOrderId.items[0]);
      yield put(saveRazorPayPayment(razorPayPayment));
    }
    if (orderIdForOrder != null) {
      const razorPayOrder = yield API.graphql({
        query: queries.razorPayOrderByOrderId,
        variables: { orderId: orderIdForOrder },
      }).then((resp) => resp.data.razorPayOrderByOrderId.items[0]);
      yield put(saveRazorPayOrder(razorPayOrder));
    }
    yield put(showLoading(false));
  } catch (error) {
    console.log("fetchRazorPayOrder.error", error);
    yield put(showLoading(false));
    if (error?.errors[0]?.message == ErrorMessage.GRAPHQL_NETWORK_ERROR) {
      yield put(
        showAlertToast({
          alertMessage: AlertMessage.NETWORK_CONNECTION_MESSAGE,
          actionButtonTitle: "OK",
        })
      );
    } else {
      yield put(
        showAlertToast({
          alertMessage: error?.message || AlertMessage.SOMETHING_WENT_WRONG,
          actionButtonTitle: "OK",
        })
      );
    }
  }
}

function* fetchStoreCategory() {
  try {
    const listProducts = yield API.graphql({
      query: queries.listProducts,
      variables: { limit: 10000 },
    }).then((resp) => resp.data.listProducts.items);
    const categories = [
      ...new Set(listProducts.map((product) => product.masterCategory)),
    ];
    yield put(saveStoreCategories(categories));
  } catch (error) {
    console.log("listProducts.error", error);
  }
}

function* fetchGraphOrder({ agoTime }: any) {
  try {
    const currentDate = new Date().toISOString();

    const filter = {
      orderStatus: {
        ne: OrderStatus.OPEN,
      },
      createdAt: {
        between: [agoTime, currentDate],
      },
    };

    const storeId = yield getItemFromAsyncStorage("store_id");
    if (agoTime != null) {
      const graphOrders = yield API.graphql({
        query: queries.ordersByStoreId,
        variables: {
          filter: filter,
          storeId: storeId,
        },
      }).then((resp) => resp.data.ordersByStoreId.items);
      let graphOrder = graphOrders
        .sort((a, b) => a.createdAt - b.createdAt)
        .filter((order) => order?.orderStatus != OrderStatus.DECLINED);
      yield put(
        saveOrdersForGraph(
          graphOrder.filter(
            (order) => order?.orderStatus != OrderStatus.CONFIRMED
          )
        )
      );
    }
  } catch (error) {
    if (error?.errors[0]?.message == ErrorMessage.GRAPHQL_NETWORK_ERROR) {
      yield put(
        showAlertToast({
          alertMessage: AlertMessage.NETWORK_CONNECTION_MESSAGE,
          actionButtonTitle: "OK",
        })
      );
    } else {
      yield put(
        showAlertToast({
          alertMessage: error?.message || AlertMessage.SOMETHING_WENT_WRONG,
          actionButtonTitle: "OK",
        })
      );
    }

    crashlytics().recordError(error);
  }
}

function* saga() {
  yield takeEvery(actions.FETCH_STORE_DATA, fetchStoreData);
  yield takeEvery(actions.FETCH_BANK_INFO_DATA, bankInfo);
  yield takeEvery(actions.FETCH_ALL_STORE_PRODUCTS, fetchAllStoreProducts);
  yield takeEvery(actions.FETCH_STORE_ORDERS, fetchStoreOrders);
  yield takeEvery(actions.FETCH_CART_ITEMS, fetchCartItems);
  yield takeEvery(actions.FETCH_STORE_IMAGE, fetchStoreImage);
  yield takeEvery(actions.FETCH_STORE_RATING, orderRatingByStoreId);
  yield takeEvery(actions.FETCH_PAYMENT_HISTORY, fetchPaymentHistory);
  yield takeEvery(actions.FETCH_RAZOR_PAY_ORDER, fetchRazorPayOrder);
  yield takeEvery(actions.FETCH_MESSAGE, fetchMessage);
  yield takeEvery(
    actions.FETCH_PRODUCTS_SUB_CATEGORIES,
    fetchSubCategoryByCategory
  );
  yield takeEvery(actions.FETCH_STORE_CATEGORIES, fetchStoreCategory);
  yield takeEvery(actions.FETCH_ORDERS_FOR_GRAPH, fetchGraphOrder);
}
export default saga;
