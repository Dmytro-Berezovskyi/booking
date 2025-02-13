import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    error: "",
    openModal: false,
};

const authSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logIn: (state, action) => {
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        logoutUser: (state, action) => {
            localStorage.removeItem("user");
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        openModal: (state, action) => {
            state.openModal = state.openModal === false;
        }
    },
})

export const {
    logIn,
    logoutUser,
    setLoading,
    setError,
    openModal,
} = authSlice.actions;

export default authSlice.reducer;