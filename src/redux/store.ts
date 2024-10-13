import { configureStore } from "@reduxjs/toolkit";
import boardDataSlice from "./features/boardSlice";
import statusesSlice from "./features/statusesSlice";

const store = configureStore({
  reducer: {
    board: boardDataSlice,
    statuses: statusesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
