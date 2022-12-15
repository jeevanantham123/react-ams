import { isAdmin, isDoctor } from "@components/Appointments";
import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  fetchAppointmentsSuccess,
  fetchAppointments,
  fetchAppointmentsFailure,
} from "./slice";

function* fetchAppointmentsSaga({ payload }: any) {
  try {
    const { data } = yield call(
      async () =>
        await axios.get(`http://localhost:3004/appointments?user=${payload}`)
    );
    yield put(fetchAppointmentsSuccess(data));
  } catch (error) {
    yield put(fetchAppointmentsFailure(error));
  }
}

function* fetchAppointmentsForAdminSaga() {
  try {
    const { data } = yield call(
      async () => await axios.get(`http://localhost:3004/appointments`)
    );
    yield put(fetchAppointmentsSuccess(data));
  } catch (error) {
    yield put(fetchAppointmentsFailure(error));
  }
}

function* fetchAppointmentsForDoctorSaga({ payload }: any) {
  try {
    const { data } = yield call(
      async () =>
        await axios.get(`http://localhost:3004/appointments?doctor=${payload}`)
    );
    yield put(fetchAppointmentsSuccess(data));
  } catch (error) {
    yield put(fetchAppointmentsFailure(error));
  }
}

function* fetchDeleteAppointmentsSaga({ payload }: any) {
  let url = "";
  if (isAdmin(payload.auth)) {
    url = "http://localhost:3004/appointments";
  } else if (isDoctor(payload.auth)) {
    url = `http://localhost:3004/appointments?doctor=${payload.user}`;
  } else {
    url = `http://localhost:3004/appointments?user=${payload.user}`;
  }
  try {
    yield call(
      async () =>
        await axios.delete(
          `${"http://localhost:3004/appointments/" + payload.id}`
        )
    );
    const { data } = yield call(async () => await axios.get(url));
    yield put(fetchAppointmentsSuccess(data));
  } catch (error) {
    yield put(fetchAppointmentsFailure(error));
  }
}

function* fetchPatchAppointmentsSaga({ payload }: any) {
  let url = "";
  if (isAdmin(payload.auth)) {
    url = "http://localhost:3004/appointments";
  } else if (isDoctor(payload.auth)) {
    url = `http://localhost:3004/appointments?doctor=${payload.user}`;
  } else {
    url = `http://localhost:3004/appointments?user=${payload.user}`;
  }
  try {
    yield call(
      async () =>
        await axios.patch(
          `${"http://localhost:3004/appointments/" + payload.data.id}`,
          payload.data
        )
    );
    const { data } = yield call(async () => await axios.get(url));
    yield put(fetchAppointmentsSuccess(data));
  } catch (error) {
    yield put(fetchAppointmentsFailure(error));
  }
}

function* fetchAddAppointmentsSaga({ payload }: any) {
  let url = "";
  if (isAdmin(payload.auth)) {
    url = "http://localhost:3004/appointments";
  } else if (isDoctor(payload.auth)) {
    url = `http://localhost:3004/appointments?doctor=${payload.user}`;
  } else {
    url = `http://localhost:3004/appointments?user=${payload.user}`;
  }
  try {
    yield call(
      async () =>
        await axios.post("http://localhost:3004/appointments/", payload.data)
    );
    const { data } = yield call(async () => await axios.get(url));
    yield put(fetchAppointmentsSuccess(data));
  } catch (error) {
    yield put(fetchAppointmentsFailure(error));
  }
}

export function* watchFetchAppointments() {
  yield takeEvery("FETCH_APPOINTMENT", fetchAppointmentsSaga);
  yield takeEvery("FETCH_APPOINTMENT_FOR_DOC", fetchAppointmentsForDoctorSaga);
  yield takeEvery("FETCH_APPOINTMENT_FOR_ADMIN", fetchAppointmentsForAdminSaga);
  yield takeEvery("DELETE_APPOINTMENT", fetchDeleteAppointmentsSaga);
  yield takeEvery("ADD_APPOINTMENT", fetchAddAppointmentsSaga);
  yield takeEvery("PATCH_APPOINTMENT", fetchPatchAppointmentsSaga);
}
