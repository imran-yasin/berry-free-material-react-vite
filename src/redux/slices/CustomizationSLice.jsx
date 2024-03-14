// constants.js
// theme constant
export const gridSpacing = 3;
export const drawerWidth = 260;
export const appDrawerWidth = 320;

// customizationSlice.js
import { createSlice } from "@reduxjs/toolkit";
import config from "../../config";

const customizationSlice = createSlice({
  name: "customization",
  initialState: {
    isOpen: [],
    defaultId: "default",
    fontFamily: config.fontFamily,
    borderRadius: config.borderRadius,
    opened: true
  },
  reducers: {
    menuOpen: (state, action) => {
      const id = action.payload;
      state.isOpen = [id];
    },
    setMenu: (state, action) => {
      state.opened = action.payload.opened;
    },
    setFontFamilySlice: (state, action) => {
      state.fontFamily = action.payload;
    },
    setBorderRadiusSlice: (state, action) => {
      state.borderRadius = action.payload;
    }
  }
});

export const { menuOpen, setMenu, setFontFamilySlice, setBorderRadiusSlice } = customizationSlice.actions;

export default customizationSlice.reducer;
