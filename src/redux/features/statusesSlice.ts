import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICard } from "../../interfaces/interfaces";

export interface StatusesState {
  [key: string]: StatusesStateValue;
}

export interface StatusesStateValue {
  id: string;
  name: string;
  primaryColor: string;
  cards: ICard[];
}

const initialState: StatusesState = {};

const statusesSlice = createSlice({
  name: "statuses",
  initialState,
  reducers: {
    setStatusesData: (state, action: PayloadAction<StatusesState>) => {
      state = action.payload;
    },
  },
});

export const { setStatusesData } = statusesSlice.actions;
export default statusesSlice.reducer;
