import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {
  list: { title: string; id: number; isSelected: boolean }[];
  selected: number;
}

const initialState: CounterState = {
  list: [
    { title: "Hero", id: 1, isSelected: false },
    { title: "Experience", id: 2, isSelected: false },
    { title: "Projects", id: 3, isSelected: false },
    { title: "Skills", id: 4, isSelected: false },
    { title: "Reviews", id: 5, isSelected: false },
    { title: "About", id: 6, isSelected: false },
    { title: "Contact Us", id: 7, isSelected: false },
  ],
  selected: 2,
};

export const counterSlice = createSlice({
  name: "section",
  initialState,
  reducers: {
    toogleIsSelected: (state, action) => {
      state.list.map((item) => {
        if (item.id == action.payload) {
          item.isSelected = !item.isSelected;
          state.selected = item.id;
        } else {
          item.isSelected = false;
        }
      });
    },
  },
});

export const { toogleIsSelected } = counterSlice.actions;

export default counterSlice.reducer;
