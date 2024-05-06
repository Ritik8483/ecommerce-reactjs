import { combineReducers } from "@reduxjs/toolkit";
import { api } from "./api/api";
import authSlice from "./slices/authSlice";
import snackbarSlice from "./slices/snackbarSlice";
import cartSlice from "./slices/cartSlice";

const rootReducer = combineReducers({
  authSlice,
  cartSlice,
  snackbarSlice,
  [api.reducerPath]: api.reducer,
});

export default rootReducer;
