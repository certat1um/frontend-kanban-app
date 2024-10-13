import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FullBoardData, ICard } from "../../interfaces/interfaces";

interface BoardState {
  board: FullBoardData | null;
}

// Initial state
const initialState: BoardState = {
  board: null,
};

// Create the slice
const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setBoardData: (state, action: PayloadAction<FullBoardData | null>) => {
      state.board = action.payload;
      state.board?.statuses.forEach((s) => {
        switch (s.name) {
          case "To Do":
            s.primaryColor = "var(--primary-red)";
            break;
          case "In Progress":
            s.primaryColor = "var(--primary-yellow)";
            break;
          case "Done":
            s.primaryColor = "var(--primary-blue)";
            break;
        }
      });
    },
    setBoardName: (state, action: PayloadAction<string>) => {
      if (state.board) {
        state.board.name = action.payload;
      }
    },
    addNewCard: (state, action: PayloadAction<ICard>) => {
      if (state.board) {
        state.board.statuses
          .find((s) => s.id === action.payload.status_id)
          ?.cards.unshift(action.payload);
      }
    },
  },
});

export const { setBoardData, setBoardName, addNewCard } = boardSlice.actions;
export default boardSlice.reducer;
