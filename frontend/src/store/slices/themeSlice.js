import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    themeMode: JSON.parse(localStorage.getItem("theme")),
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleThemeMode: (state) => {
            state.themeMode = state.themeMode === "dark" ? "light" : "dark";
            localStorage.setItem("theme", JSON.stringify(state.themeMode));
        }
    }
})

export const { toggleThemeMode } = themeSlice.actions;

export default themeSlice.reducer;