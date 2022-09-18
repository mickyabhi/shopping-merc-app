export const config = {
  screens: {
    RespondToOrderScreen: "orderDetail/:orderId",
  },
};
/** npx uri-scheme open blocalMerchant://orderDetail --android */

/**
 * @type {import('@react-navigation/native').LinkingOptions }
 **/
export const linking = {
  config,
  prefixes: ["blocalMerchant://", "https://blocalMerchant.app"],
};

export default linking;
