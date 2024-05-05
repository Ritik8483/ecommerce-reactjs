import { combineReducers } from "@reduxjs/toolkit";
import { api } from "./api/api";
import authSlice from "./slices/authSlice";
import snackbarSlice from "./slices/snackbarSlice";

const rootReducer = combineReducers({
  authSlice,
  snackbarSlice,
  [api.reducerPath]: api.reducer,
});

export default rootReducer;
