import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addedcartArr: [],
  cartValuesArr: [],
  cartItemsArr: [],
};

const cartSlice = createSlice({
  name: "cartReducer",
  initialState,
  reducers: {
    storeCartArr: (state, { payload }) => {
      state.addedcartArr = payload;
    },
    storeCartValues: (state, { payload }) => {
      state.cartValuesArr = payload;
    },
    storeCartItems: (state, { payload }) => {
      state.cartItemsArr = payload;
    },
  },
});

export const { storeCartArr, storeCartValues, storeCartItems } =
  cartSlice.actions;
export default cartSlice.reducer;
