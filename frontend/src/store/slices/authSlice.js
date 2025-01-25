import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

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
        },
        createUserInFirebase: (state, action) => {
            createUserWithEmailAndPassword(auth, state.users.email, )
        }
    },
})

export const { pushUser } = authSlice.actions;

export default authSlice.reducer;