import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    error: "",
};

const authSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        logoutUser: (state, action) => {
            state.user = null;
            localStorage.removeItem("user");
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    },
})

export const {
    setUser,
    logoutUser,
    setLoading,
    setError
} = authSlice.actions;

export default authSlice.reducer;