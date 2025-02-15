import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    userData: JSON.parse(localStorage.getItem("userData")) || null,
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
            state.openModal = action.payload;
        },
        saveUserData: (state, action) => {
            state.userData = action.payload;
        }
    },
})

export const {
    logIn,
    logoutUser,
    setLoading,
    setError,
    openModal,
    saveUserData,
} = authSlice.actions;

export default authSlice.reducer;