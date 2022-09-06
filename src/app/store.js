import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "../features/transaction/transactionSlice";
import paginationReducer from "../features/pagination/paginationSlice";

export const store = configureStore({
  reducer: {
    transaction: transactionReducer,
    pagination: paginationReducer,
  },
});
