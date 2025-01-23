import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    loading: false,
    error: "",
};

const authSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
})

export default authSlice.reducer;