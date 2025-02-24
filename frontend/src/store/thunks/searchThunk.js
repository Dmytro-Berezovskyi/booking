import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = process.env.REACT_APP_API_URL;

export const fetchSearch = createAsyncThunk("hotels/fetchSearch", async (debounceValue, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${API_URL}/hotels`, {
            params: { query: debounceValue }
        });

        return data;
    } catch (e) {
        return rejectWithValue(e.response?.data?.message || e.message);
    }
})