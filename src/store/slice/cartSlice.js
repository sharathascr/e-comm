import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct(state, action) {
      state.cart.push(action.payload);
    },
  },
});

export const { addProduct } = cartSlice.actions;
export default cartSlice.reducer;
