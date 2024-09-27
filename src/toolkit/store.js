import { configureStore } from "@reduxjs/toolkit"
import globalSlice from "./globalSlice"
import { apiSlice } from "./apiSlice"

export const store = configureStore({
    reducer: {
        global: globalSlice,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware)
})
