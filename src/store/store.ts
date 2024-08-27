import { configureStore } from "@reduxjs/toolkit";
import companiesSlice from "./companiesSlice";

export const store = configureStore({
  reducer: {
    companies: companiesSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
