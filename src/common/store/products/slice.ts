import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ProductModel {
  id: number;
  price: string;
  name: string;
}

interface ProductState {
  data: Array<ProductModel>;
  loading: boolean;
  error: string;
}

const initialState: ProductState = {
  data: [],
  loading: false,
  error: "",
};

export const product = createSlice({
  name: "product",
  initialState,
  reducers: {
    fetchProducts: (state: ProductState) => {
      state.loading = true;
    },
    fetchProductsSuccess: (state: ProductState, action: PayloadAction<any>) => {
      state.data = action.payload;
      state.loading = false;
    },
    fetchProductsFailure: (state: ProductState, action: PayloadAction<any>) => {
      state.error = action.payload;
      state.loading = false;
      state.data = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { fetchProductsSuccess, fetchProducts, fetchProductsFailure } =
  product.actions;

export default product.reducer;
