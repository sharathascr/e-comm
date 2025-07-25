import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, payload) => {
      console.log(payload);
    },
  },
});
