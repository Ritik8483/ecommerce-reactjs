import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userToken: {},
};

const authSlice = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    storeLoginToken: (state, { payload }) => {
      state.userToken = payload;
    },
    clearLoginDetails: (state) => {
      state.userToken = {};
    },
  },
});

export const {
  storeLoginToken,
  clearLoginDetails,
} = authSlice.actions;
export default authSlice.reducer;
