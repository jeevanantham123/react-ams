import { all } from "redux-saga/effects";
import { watchFetchAppointments } from "./appointments/saga";
import { watchFetchUsers } from "./users/saga";

export default function* rootSaga() {
  yield all([watchFetchAppointments(), watchFetchUsers()]);
}
