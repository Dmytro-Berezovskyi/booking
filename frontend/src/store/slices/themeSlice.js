import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    themeMode: "dark",
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleThemeMode: (state) => {
            state.themeMode = state.themeMode === "dark" ? "light" : "dark";
        }
    }
})

export const { toggleThemeMode } = themeSlice.actions;

export default themeSlice.reducer;