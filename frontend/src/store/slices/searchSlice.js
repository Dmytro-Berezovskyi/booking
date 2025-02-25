import { createSlice } from "@reduxjs/toolkit";

import { fetchSearch } from "../thunks/searchThunk";

const initialState = {
    searchHotel: [],
    loading: false,
    error: "",
};

const searchSlice = createSlice({
    name: "searchHotel",
    initialState,
    reducers: {
        clearSearch: (state, action) => {
            state.searchHotel = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSearch.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(fetchSearch.fulfilled, (state, action) => {
                state.loading = false;
                state.error = "";
                state.searchHotel = action.payload;
            })
            .addCase(fetchSearch.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export default searchSlice.reducer;

export const { clearSearch } = searchSlice.actions;