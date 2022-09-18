import { createStore, applyMiddleware } from "redux";
import appStore from "../screens/AppStore/reducer";
import createSagaMiddleWare from "redux-saga";
import saga from "./saga";
const sagaMiddleWare = createSagaMiddleWare();
const store = createStore(appStore, applyMiddleware(sagaMiddleWare));
sagaMiddleWare.run(saga);

export default store;
