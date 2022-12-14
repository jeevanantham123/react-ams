import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  fetchProductsSuccess,
  fetchProducts,
  fetchProductsFailure,
} from "./slice";

function* fetchProductsSaga() {
  try {
    const { data } = yield call(
      async () => await axios.get("http://localhost:3004/products")
    );
    yield put(fetchProductsSuccess(data));
  } catch (error) {
    yield put(fetchProductsFailure(error));
  }
}

function* fetchDeleteProductsSaga({ payload }: any) {
  try {
    yield call(
      async () =>
        await axios.delete(`${"http://localhost:3004/products/" + payload}`)
    );
    const { data } = yield call(
      async () => await axios.get("http://localhost:3004/products")
    );
    yield put(fetchProductsSuccess(data));
  } catch (error) {
    yield put(fetchProductsFailure(error));
  }
}

function* fetchPatchProductsSaga({ payload }: any) {
  try {
    yield call(
      async () =>
        await axios.patch(
          `${"http://localhost:3004/products/" + payload.id}`,
          payload
        )
    );
    const { data } = yield call(
      async () => await axios.get("http://localhost:3004/products")
    );
    yield put(fetchProductsSuccess(data));
  } catch (error) {
    yield put(fetchProductsFailure(error));
  }
}

function* fetchAddProductsSaga({ payload }: any) {
  try {
    yield call(
      async () => await axios.post("http://localhost:3004/products/", payload)
    );
    const { data } = yield call(
      async () => await axios.get("http://localhost:3004/products")
    );
    yield put(fetchProductsSuccess(data));
  } catch (error) {
    yield put(fetchProductsFailure(error));
  }
}

export function* watchFetchProducts() {
  yield takeEvery(fetchProducts.type, fetchProductsSaga);
  yield takeEvery("DELETE_PRODUCT", fetchDeleteProductsSaga);
  yield takeEvery("ADD_PRODUCT", fetchAddProductsSaga);
  yield takeEvery("PATCH_PRODUCT", fetchPatchProductsSaga);
}
