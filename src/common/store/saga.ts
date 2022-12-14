import { all } from "redux-saga/effects";
import { watchFetchProducts } from "./products/saga";

export default function* rootSaga() {
  yield all([watchFetchProducts()]);
}
