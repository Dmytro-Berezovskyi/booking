import { configureStore } from "@reduxjs/toolkit";

import themeReducer from "./slices/themeSlice";
import destinationReducer from "./slices/destinationSlice";
import hotelsReducer from "./slices/hotelsSlice";
import selectedHotelsSlice from "./slices/selectedHotelsSlice";
import oneHotelSlice from "./slices/oneHotelSlice";
import authReducer from "./slices/authSlice";
import reservedHotelsReducer from "./slices/reservedHotelsSlice";

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        destination: destinationReducer,
        hotels: hotelsReducer,
        selectedHotels: selectedHotelsSlice,
        oneHotel: oneHotelSlice,
        user: authReducer,
        reservedHotels: reservedHotelsReducer,
    }
})