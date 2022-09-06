import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filterSelected: (state, action) => {
      state.type = action.payload;
    },
    filterRemoved: (state, action) => {
      state.type = "action.payload";
    },
  },
});
export default createSlice.reducer;
export const { filterRemoved, filterSelected } = filterSlice.actions;
