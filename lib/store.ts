import { configureStore } from "@reduxjs/toolkit";
import SectionListReducer from "./slices/SectionListSlice";
export const makeStore = () => {
  return configureStore({
    reducer: {
      SectionListReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
