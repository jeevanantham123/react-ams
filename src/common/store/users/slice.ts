import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserModel {
  id: number;
  user: string;
  pwd: string;
  roles: string[];
}

interface UserState {
  data: Array<UserModel>;
  loading: boolean;
  error: string;
}

const initialState: UserState = {
  data: [],
  loading: false,
  error: "",
};

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchUsers: (state: UserState, action: PayloadAction<any>) => {
      state.loading = true;
    },
    fetchUsersSuccess: (state: UserState, action: PayloadAction<any>) => {
      state.data = action.payload;
      state.loading = false;
    },
    fetchUsersFailure: (state: UserState, action: PayloadAction<any>) => {
      state.error = action.payload;
      state.loading = false;
      state.data = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { fetchUsersSuccess, fetchUsers, fetchUsersFailure } =
  user.actions;

export default user.reducer;
