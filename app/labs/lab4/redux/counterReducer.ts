import { createSlice } from "@reduxjs/toolkit";
const slice = createSlice({
  name: "counter",
  initialState: { count: 7 },
  reducers: {
    up: (state) => {
      state.count += 1;
    },
    down: (state) => {
      state.count -= 1;
    },
    reset: (state) => {
      state.count = 7;
    },
    resetPersonal: (state) => {
      state.count = 7;
    },
  },
});
export const { up, down, reset, resetPersonal } = slice.actions;
export default slice.reducer;
