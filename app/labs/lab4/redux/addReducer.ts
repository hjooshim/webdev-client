import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
const slice = createSlice({
  name: "add",
  initialState: { sum: 0 },
  reducers: {
    add: (state, action: PayloadAction<{ a: number; b: number }>) => {
      state.sum = action.payload.a + action.payload.b;
    },
  },
});
export const { add } = slice.actions;
export default slice.reducer;
