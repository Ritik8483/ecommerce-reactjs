import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showAlert: false,
  message: "",
  severity: "",
  deleteBtn: false,
};

const SnackbarSlice = createSlice({
  name: "SnackbarSlice",
  initialState: initialState,
  reducers: {
    openAlert: (state, action) => {
      state.showAlert = true;
      state.message = action.payload.message;
      state.severity = action.payload.severity;
    },
    closeAlert: (state, action) => {
      state.showAlert = action.payload;
      state.message = "";
      state.severity = "";
    },

    showDeleteBtn: (state, action) => {
      state.deleteBtn = action.payload;
    },
  },
});

export const { closeAlert, openAlert, showDeleteBtn } = SnackbarSlice.actions;
export default SnackbarSlice.reducer;
