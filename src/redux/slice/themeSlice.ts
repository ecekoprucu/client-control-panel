import { USER_THEME } from "@/appConfig";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  themeCode: USER_THEME,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.themeCode = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
