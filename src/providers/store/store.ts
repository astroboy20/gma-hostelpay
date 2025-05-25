import { configureStore } from "@reduxjs/toolkit"
import { authApi } from "../apis/auth-api"
import authReducer from "./auth-slice"
import { hostelApi } from "../apis/hostel-api"

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [hostelApi.reducerPath]:hostelApi.reducer,
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(
            authApi.middleware,
            hostelApi.middleware
        )
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;