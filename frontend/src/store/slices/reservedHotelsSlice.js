import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    reservedHotels:  Array.isArray(JSON.parse(localStorage.getItem("reserved_hotels")))
        ? JSON.parse(localStorage.getItem("reserved_hotels"))
        : [],
    details: [],
    loading: false,
    error: "",
};

const reservedHotelsSlice = createSlice({
    name: "reservedHotels",
    initialState,
    reducers: {
        setReserve: (state, action) => {
            state.reservedHotels.push(action.payload);
            localStorage.setItem("reserved_hotels", JSON.stringify(state.reservedHotels));
        },
        removeReserve: (state, action) => {
            state.reservedHotels = state.reservedHotels.filter(hotel => hotel.id !== action.payload);
            localStorage.setItem("reserved_hotels", JSON.stringify(state.reservedHotels));
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    },
})

export const { setReserve, removeReserve } = reservedHotelsSlice.actions;

export default reservedHotelsSlice.reducer;