import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface FullProfileVisibleState {
  fullProfileVisible: boolean;
}

const initialState: FullProfileVisibleState = {
  fullProfileVisible: false,
};

export const FullProfileVisibleSlice = createSlice({
  name: "fullProfileVisible",
  initialState,
  reducers: {
    updateFullProfileVisible: (state, action: PayloadAction<boolean>) => {
      state.fullProfileVisible = action.payload;
    },
  },
});

export const { updateFullProfileVisible } = FullProfileVisibleSlice.actions;

export default FullProfileVisibleSlice.reducer;
