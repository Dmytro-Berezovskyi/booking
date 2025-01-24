import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    loading: false,
    error: "",
};

const authSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        pushUser: (state, action) => {
            state.users = action.payload;
        }
    },
})

export const { pushUser } = authSlice.actions;

export default authSlice.reducer;