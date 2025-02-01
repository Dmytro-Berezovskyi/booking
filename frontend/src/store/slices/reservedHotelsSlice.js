import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    reservedHotels: [],
    loading: false,
    error: "",
};

const reservedHotelsSlice = createSlice({
    name: "reservedHotels",
    initialState,
    reducers: {
        setReserve: (state, action) => {
            state.reservedHotels.push(action.payload);
        },
        removeReserve: (state, action) => {
            state.reservedHotels.filter(hotel => hotel.id !== action.payload);
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    },
})

export const { setReserve } = reservedHotelsSlice.actions;

export default reservedHotelsSlice.reducer;