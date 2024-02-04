import { createSlice } from "@reduxjs/toolkit";

export interface SectionState {
  list: { name: string; active: boolean; _id?: string }[];
  selected: number;
}

const initialState: SectionState = {
  list: [
    { name: "Hero", active: true },
    { name: "Experience", active: true },
    { name: "Projects", active: true },
    { name: "Skills", active: true },
    { name: "Reviews", active: true },
    { name: "About", active: true },
    { name: "Contact Us", active: true },
  ],
  selected: 6,
};

export const sectionSlice = createSlice({
  name: "section",
  initialState,
  reducers: {
    addSectionList: (state, action) => {
      state.list = action.payload;
    },
    toogleIsSelected: (state, action) => {
      state.list.map((item, index) => {
        if (index + 1 == action.payload) {
          state.selected = action.payload;
        }
      });
    },
    toogleSection: (state, action) => {
      state.list.map((item) => {
        if (item._id == action.payload.id) {
          item.active = action.payload.active;
        }
      });
    },
  },
});

export const { addSectionList, toogleIsSelected, toogleSection } = sectionSlice.actions;

export default sectionSlice.reducer;
