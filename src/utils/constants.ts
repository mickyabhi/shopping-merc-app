export const IMAGE_BASE_URL =
  "https://blocalappstorage.s3.ap-south-1.amazonaws.com/";

export const PRODUCT_IMAGE_BASE_URL = IMAGE_BASE_URL + "product_images/";
const categoryImageMap = {
  foods: IMAGE_BASE_URL + "app/FMCG+Food%403x.png",
  chicken: IMAGE_BASE_URL + "app/Chicken%402x.png",
  fish: IMAGE_BASE_URL + "app/Fish%402x.png",
  fruits: IMAGE_BASE_URL + "app/Fruits%402x.png",
  poultry: IMAGE_BASE_URL + "app/Meat_Poultry_And_Seafood%402x.png",
  chicken_and_poultry: IMAGE_BASE_URL + "app/Meat_Poultry_And_Seafood%402x.png",
  mutton: IMAGE_BASE_URL + "app/Mutton%403x.png",
  non_foods: IMAGE_BASE_URL + "app/Nonfood%403x.png",
  others_or_masala_powders:
    IMAGE_BASE_URL + "app/Others_or_Masala_Powders%402x.png",
  pharmacy: IMAGE_BASE_URL + "app/Pharmacy%402x.png",
  vegetables: IMAGE_BASE_URL + "app/Vegetables%402x.png",
  flowers: IMAGE_BASE_URL + "app/Vegetables-1%402x.png",
  fish_and_seafood: IMAGE_BASE_URL + "app/Sea+Foods%403x.png",
  staples: IMAGE_BASE_URL + "app/Staples@3x.png",
};

export const getCategoryImage = (category) => {
  category = category.replace("&", "and");
  category = category?.split(" ").join("_");
  category = category.toLowerCase();
  console.log("category", category);
  return categoryImageMap[category] || null;
};

export const range = (start, end) => {
  return Array(end - start + 1)
    .fill()
    .map((_, idx) => start + idx);
};

export const OrderStatus = {
  OPEN: "OPEN",
  CONFIRMED: "CONFIRMED",
  CANCELLED: "CANCELLED",
  DELIVERED: "DELIVERED",
  DELIVERY_IN_PROGRESS: "DELIVERY_IN_PROGRESS",
  DECLINED: "DECLINED",
};

export const OrderStatusMapping = {
  OPEN: "Open",
  CONFIRMED: "Ordered",
  DELIVERED: "Delivered",
  DELIVERY_IN_PROGRESS: "Delivery In Progress",
  DECLINED: "Cancelled",
};

export const MessageType = {
  TEXT: "TEXT",
  IMAGE: "IMAGE",
};

export const Refund = {
  REASON: "MODIFIED_BY_MERCHANT",
  STATUS: "PENDING",
};

export const PaymentType = {
  ONLINE: "ONLINE",
  COD: "COD",
};

export const ErrorMessage = {
  NETWORK: "auth/network-request-failed",
  INVALID_PHONE_NUMBER: "auth/invalid-phone-number",
  OTP_REQUEST: "auth/too-many-requests",
  GRAPHQL_NETWORK_ERROR: "Network Error",
};

export const AlertMessage = {
  NETWORK_CONNECTION_MESSAGE: "Network Connection Failed!",
  INVALID_PHONE_NUMBER_MESSAGE: "Please Enter Valid Phone Number",
  OTP_REQUEST_MESSAGE:
    "We have blocked all requests from this device due to unusual activity",
  SOMETHING_WENT_WRONG: "Oops! Something went wrong!",
};
export const GraphWeeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
