import { all } from "redux-saga/effects";
import appStoreSaga from "../screens/AppStore/saga";
import signInSaga from "../screens/SignInWithPhoneNumber/store/saga";
export default function* rootSaga() {
  yield all([appStoreSaga(), signInSaga()]);
}
