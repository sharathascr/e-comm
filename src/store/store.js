import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../store/slice/categorySlice";
import cartReducer from "../store/slice/cartSlice";
import userReducer from '../store/slice/userSlice'


export const store = configureStore({
  reducer: {
    categorySlice: categoryReducer,
    cartSlice: cartReducer,
    userSlice:userReducer
  },
});
