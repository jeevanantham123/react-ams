import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import { fetchUsersSuccess, fetchUsersFailure } from "./slice";

function* fetchUsersSaga() {
  try {
    const { data } = yield call(
      async () => await axios.get(`http://localhost:3004/users`)
    );
    yield put(fetchUsersSuccess(data));
  } catch (error) {
    yield put(fetchUsersFailure(error));
  }
}

function* fetchDeleteUsersSaga({ payload }: any) {
  try {
    yield call(
      async () =>
        await axios.delete(`${"http://localhost:3004/users/" + payload}`)
    );
    const { data } = yield call(
      async () => await axios.get("http://localhost:3004/users")
    );
    yield put(fetchUsersSuccess(data));
  } catch (error) {
    yield put(fetchUsersFailure(error));
  }
}

function* fetchPatchUsersSaga({ payload }: any) {
  try {
    yield call(
      async () =>
        await axios.patch(
          `${"http://localhost:3004/users/" + payload.id}`,
          payload
        )
    );
    const { data } = yield call(
      async () => await axios.get("http://localhost:3004/users")
    );
    yield put(fetchUsersSuccess(data));
  } catch (error) {
    yield put(fetchUsersFailure(error));
  }
}

function* fetchAddUsersSaga({ payload }: any) {
  try {
    yield call(
      async () => await axios.post("http://localhost:3004/users/", payload)
    );
    const { data } = yield call(
      async () => await axios.get("http://localhost:3004/users")
    );
    yield put(fetchUsersSuccess(data));
  } catch (error) {
    yield put(fetchUsersFailure(error));
  }
}

export function* watchFetchUsers() {
  yield takeEvery("FETCH_USER", fetchUsersSaga);
  yield takeEvery("DELETE_USER", fetchDeleteUsersSaga);
  yield takeEvery("ADD_USER", fetchAddUsersSaga);
  yield takeEvery("PATCH_USER", fetchPatchUsersSaga);
}
