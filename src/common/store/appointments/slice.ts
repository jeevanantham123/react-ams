import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AppointmentModel {
  id: number;
  doctor: string;
  date: string;
  user: string;
}

interface AppointmentState {
  data: Array<AppointmentModel>;
  loading: boolean;
  error: string;
}

const initialState: AppointmentState = {
  data: [],
  loading: false,
  error: "",
};

export const appointment = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    fetchAppointments: (
      state: AppointmentState,
      action: PayloadAction<any>
    ) => {
      state.loading = true;
    },
    fetchAppointmentsSuccess: (
      state: AppointmentState,
      action: PayloadAction<any>
    ) => {
      state.data = action.payload;
      state.loading = false;
    },
    fetchAppointmentsFailure: (
      state: AppointmentState,
      action: PayloadAction<any>
    ) => {
      state.error = action.payload;
      state.loading = false;
      state.data = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  fetchAppointmentsSuccess,
  fetchAppointments,
  fetchAppointmentsFailure,
} = appointment.actions;

export default appointment.reducer;
