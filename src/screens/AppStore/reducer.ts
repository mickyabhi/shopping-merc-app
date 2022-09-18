import { actions } from "./actions";
const initialState = {
  logOutModal: false,
  rateUsModal: false,
  store: [],
  products: [],
  storeProducts: [],
  bankInfo: [],
  loadingState: false,
  inventoryData: [],
  orders: [],
  cartItems: [],
  storeImage: [],
  saveMessage: [],
  subCategory: [],
  storeRating: null,
  paymentHistory: null,
  itemQty: null,
  alertData: null,
  user: null,
  storeCategories: [],
  graphOrder: [],
};
const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.STORE_DATA: {
      return {
        ...state,
        store: action.store,
      };
    }

    case actions.SAVE_USER: {
      return {
        ...state,
        user: action.user,
      };
    }

    case actions.SHOW_LOG_OUT_MODAL: {
      return {
        ...state,
        logOutModal: action.logOutModal,
      };
    }

    case actions.SHOW_RATE_US_MODAL: {
      return {
        ...state,
        rateUsModal: action.rateUsModal,
      };
    }

    case actions.SAVE_PRODUCTS_CATEGORIES: {
      return {
        ...state,
        categories: action.categories,
      };
    }

    case actions.SAVE_ALL_PRODUCTS: {
      return {
        ...state,
        products: action.products,
      };
    }

    case actions.SAVE_BANK_INFO_DATA: {
      return {
        ...state,
        bankInfo: action.storeBankInfo,
      };
    }

    case actions.INVENTORY_MODAL_DATA: {
      return {
        ...state,
        inventoryData: action.data,
      };
    }

    case actions.SAVE_ALL_STORE_PRODUCTS: {
      return {
        ...state,
        storeProducts: action.storeProducts,
      };
    }

    case actions.SAVE_STORE_ORDERS: {
      return {
        ...state,
        orders: action.orders,
      };
    }

    case actions.SAVE_CART_ITEMS: {
      return {
        ...state,
        cartItems: action.cartItems,
      };
    }

    case actions.SAVE_STORE_IMAGE: {
      return {
        ...state,
        storeImage: action.image,
      };
    }

    case actions.SHOW_LOADING: {
      return {
        ...state,
        loadingState: action.loadingState,
      };
    }

    case actions.SAVE_MESSAGE: {
      return {
        ...state,
        saveMessage: action.message,
      };
    }

    case actions.SAVE_PRODUCTS_SUB_CATEGORIES: {
      return {
        ...state,
        subCategory: action.subCategory,
      };
    }

    case actions.SAVE_STORE_RATING: {
      return {
        ...state,
        storeRating: action.rating,
      };
    }

    case actions.SAVE_PAYMENT_HISTORY: {
      return {
        ...state,
        paymentHistory: action.paymentHistory,
      };
    }

    case actions.SUMMARY_TABLE_ITEM_QUANTITY: {
      return {
        ...state,
        itemQty: action.itemQty,
      };
    }

    case actions.SHOW_ALERT_TOAST: {
      return {
        ...state,
        alertData: action.alertData,
      };
    }

    case actions.SAVE_RAZOR_PAY_ORDER: {
      return {
        ...state,
        razorPayOrder: action.order,
      };
    }

    case actions.SAVE_RAZOR_PAY_PAYMENT: {
      return {
        ...state,
        razorPayPayment: action.payment,
      };
    }

    case actions.SAVE_STORE_CATEGORIES: {
      return {
        ...state,
        storeCategories: action.storeCategories,
      };
    }
    case actions.SAVE_ORDERS_FOR_GRAPH: {
      return {
        ...state,
        graphOrder: action.orders,
      };
    }
    default:
      return { ...state };
  }
};

export default AppReducer;
