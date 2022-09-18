import { combineReducers } from "redux";
import homeReducer from "../screens/HomeScreen/store/reducer";
import registerStoreReducer from "../screens/RegisterAsMerchantStoreInfo/Store/reducer";

export default combineReducers({
  homeReducer,
  registerStoreReducer,
});
