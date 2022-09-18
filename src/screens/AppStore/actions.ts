export const actions = {
  FETCH_STORE_DATA: "FETCH_STORE_DATA",
  STORE_DATA: "STORE_DATA",
  SAVE_USER: "SAVE_USER",
  FETCH_BANK_INFO_DATA: "FETCH_BANK_INFO_DATA",
  SAVE_BANK_INFO_DATA: "SAVE_BANK_INFO_DATA",
  SHOW_LOG_OUT_MODAL: "SHOW_LOG_OUT_MODAL",
  SHOW_RATE_US_MODAL: "SHOW_RATE_US_MODAL",
  FETCH_ALL_PRODUCTS: "FETCH_ALL_PRODUCTS",
  SAVE_ALL_PRODUCTS: "SAVE_ALL_PRODUCTS",
  SAVE_PRODUCTS_CATEGORIES: "SAVE_PRODUCTS_CATEGORIES",
  FETCH_ALL_STORE_PRODUCTS: "FETCH_ALL_STORE_PRODUCTS",
  SAVE_ALL_STORE_PRODUCTS: "SAVE_ALL_STORE_PRODUCTS",
  INVENTORY_MODAL_DATA: "INVENTORY_MODAL_DATA",
  SEARCH_PRODUCTS_DATA: "SEARCH_PRODUCTS_DATA",
  FETCH_STORE_ORDERS: "FETCH_STORE_ORDERS",
  FETCH_CART_ITEMS: "FETCH_CART_ITEMS",
  SAVE_STORE_ORDERS: "SAVE_STORE_ORDERS",
  SAVE_CART_ITEMS: "SAVE_CART_ITEMS",
  FETCH_STORE_IMAGE: "FETCH_STORE_IMAGE",
  SAVE_STORE_IMAGE: "SAVE_STORE_IMAGE",
  SHOW_LOADING: "SHOW_LOADING",
  FETCH_MESSAGE: "FETCH_MESSAGE",
  SAVE_MESSAGE: "SAVE_MESSAGE",
  FETCH_PRODUCTS_SUB_CATEGORIES: "FETCH_PRODUCTS_SUB_CATEGORIES",
  SAVE_PRODUCTS_SUB_CATEGORIES: "SAVE_PRODUCTS_SUB_CATEGORIES",
  FETCH_STORE_RATING: "FETCH_STORE_RATING",
  SAVE_STORE_RATING: "SAVE_STORE_RATING",
  FETCH_PAYMENT_HISTORY: "FETCH_PAYMENT_HISTORY",
  SAVE_PAYMENT_HISTORY: "SAVE_PAYMENT_HISTORY",
  SUMMARY_TABLE_ITEM_QUANTITY: "SUMMARY_TABLE_ITEM_QUANTITY",
  SHOW_ALERT_TOAST: "SHOW_ALERT_TOAST",
  FETCH_RAZOR_PAY_ORDER: "FETCH_RAZOR_PAY_ORDER",
  SAVE_RAZOR_PAY_ORDER: "SAVE_RAZOR_PAY_ORDER",
  SAVE_RAZOR_PAY_PAYMENT: "SAVE_RAZOR_PAY_PAYMENT",
  FETCH_STORE_CATEGORIES: "FETCH_STORE_CATEGORIES",
  SAVE_STORE_CATEGORIES: "SAVE_STORE_CATEGORIES",
  FETCH_ORDERS_FOR_GRAPH: "FETCH_ORDERS_FOR_GRAPH",
  SAVE_ORDERS_FOR_GRAPH: "SAVE_ORDERS_FOR_GRAPH",
};

export const fetchStoreData = () => ({
  type: actions.FETCH_STORE_DATA,
});

export const saveStore = (store) => ({
  type: actions.STORE_DATA,
  store,
});

export const saveUser = (user) => ({
  type: actions.SAVE_USER,
  user,
});

export const showLogOutModal = (logOutModal) => ({
  type: actions.SHOW_LOG_OUT_MODAL,
  logOutModal,
});

export const showRateUsModal = (rateUsModal) => ({
  type: actions.SHOW_RATE_US_MODAL,
  rateUsModal,
});

export const fetchBankData = () => ({
  type: actions.FETCH_BANK_INFO_DATA,
});

export const saveStoreBankInfo = (storeBankInfo) => ({
  type: actions.SAVE_BANK_INFO_DATA,
  storeBankInfo,
});

export const saveAllProducts = (products) => ({
  type: actions.SAVE_ALL_PRODUCTS,
  products,
});

export const inventoryModalData = (data) => ({
  type: actions.INVENTORY_MODAL_DATA,
  data,
});

export const searchProductsData = (input) => ({
  type: actions.SEARCH_PRODUCTS_DATA,
  input,
});

export const fetchAllStoreProducts = (category) => ({
  type: actions.FETCH_ALL_STORE_PRODUCTS,
  category,
});

export const saveAllStoreProducts = (storeProducts) => ({
  type: actions.SAVE_ALL_STORE_PRODUCTS,
  storeProducts,
});

export const fetchStoreOrders = () => ({
  type: actions.FETCH_STORE_ORDERS,
});

export const saveStoreOrders = (orders) => ({
  type: actions.SAVE_STORE_ORDERS,
  orders,
});

export const fetchCartItems = (cartId) => ({
  type: actions.FETCH_CART_ITEMS,
  cartId,
});

export const saveCartItems = (cartItems) => ({
  type: actions.SAVE_CART_ITEMS,
  cartItems,
});

export const fetchStoreImage = () => ({
  type: actions.FETCH_STORE_IMAGE,
});

export const saveStoreImage = (image) => ({
  type: actions.SAVE_STORE_IMAGE,
  image,
});

export const showLoading = (loadingState = true) => ({
  type: actions.SHOW_LOADING,
  loadingState,
});

export const fetchMessage = (conversationId) => ({
  type: actions.FETCH_MESSAGE,
  conversationId,
});

export const saveMessage = (message) => ({
  type: actions.SAVE_MESSAGE,
  message,
});

export const fetchSubCategory = (subCategory) => ({
  type: actions.FETCH_PRODUCTS_SUB_CATEGORIES,
  subCategory,
});

export const saveSubCategory = (subCategory) => ({
  type: actions.SAVE_PRODUCTS_SUB_CATEGORIES,
  subCategory,
});
export const fetchOrderRatingByStoreId = (storeId) => ({
  type: actions.FETCH_STORE_RATING,
  storeId,
});
export const saveStoreRating = (rating) => ({
  type: actions.SAVE_STORE_RATING,
  rating,
});

export const fetchPaymentHistory = () => ({
  type: actions.FETCH_PAYMENT_HISTORY,
});

export const savePaymentHistory = (paymentHistory) => ({
  type: actions.SAVE_PAYMENT_HISTORY,
  paymentHistory,
});

export const summaryTableItemQty = (itemQty) => ({
  type: actions.SUMMARY_TABLE_ITEM_QUANTITY,
  itemQty,
});

export const showAlertToast = (alertData) => ({
  type: actions.SHOW_ALERT_TOAST,
  alertData,
});
export const fetchRazorPayOrderByOrderId = (
  orderIdForPayment,
  orderIdForOrder
) => ({
  type: actions.FETCH_RAZOR_PAY_ORDER,
  orderIdForPayment,
  orderIdForOrder,
});
export const saveRazorPayOrder = (order) => ({
  type: actions.SAVE_RAZOR_PAY_ORDER,
  order,
});

export const saveRazorPayPayment = (payment) => ({
  type: actions.SAVE_RAZOR_PAY_PAYMENT,
  payment,
});

export const fetchStoreCategories = () => ({
  type: actions.FETCH_STORE_CATEGORIES,
});

export const saveStoreCategories = (storeCategories) => ({
  type: actions.SAVE_STORE_CATEGORIES,
  storeCategories,
});

export const fetchOrdersForGraph = (agoTime) => ({
  type: actions.FETCH_ORDERS_FOR_GRAPH,
  agoTime,
});
export const saveOrdersForGraph = (orders) => ({
  type: actions.SAVE_ORDERS_FOR_GRAPH,
  orders,
});
