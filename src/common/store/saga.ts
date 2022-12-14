import { all } from "redux-saga/effects";
import { helloSaga, CounterSaga } from "./counter/saga";
import { watchFetchProducts } from "./products/saga";

export default function* rootSaga() {
  yield all([helloSaga(), CounterSaga(), watchFetchProducts()]);
}
