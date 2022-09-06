import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTotalTransactions } from "./paginationAPI";

let initialState = {
  totalTransactions: [],
  itemsPerPage: 6,
  start: 0,
  end: 6,
  pageNumber: 1,
  isLoading: false,
  isError: false,
  error: "",
};

// thunk function
export const fetchTotalTransactions = createAsyncThunk(
  "pagination/fetchTotalTransactions",
  async () => {
    const totalTransactions = await getTotalTransactions();
    return totalTransactions;
  }
);
const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    paginate: (state, action) => {
      state.pageNumber = action.payload;
      state.start = (action.payload - 1) * state.itemsPerPage;
      let end = state.itemsPerPage * action.payload;
      state.end = end > state.totalTransactions ? state.totalTransactions : end;
    },
    resetPage: (state) => {
      state.start = 0;
      state.end = state.itemsPerPage;
      state.pageNumber = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTotalTransactions.pending, (state, action) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchTotalTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.totalTransactions = action.payload;
      })
      .addCase(fetchTotalTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.totalTransactions = [];
        state.isError = true;
        state.error = action.error?.message;
      });
  },
});

export default paginationSlice.reducer;
export const { paginate, resetPage } = paginationSlice.actions;
