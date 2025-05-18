import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://hostel-management-wky9.onrender.com/api/"
    }),
    endpoints: (build) => ({
        register: build.mutation({
            query(body) {
                return {
                    url: "register",
                    method: "POST",
                    body,
                    extraOptions: { maxRetries: 0 }
                }
            }
        }),
        login: build.mutation({
            query(body) {
                return {
                    url: "login",
                    method: "POST",
                    body,
                    extraOptions: { maxRetries: 0 }
                }
            }
        })
    }),
})

export const {useRegisterMutation, useLoginMutation} = authApi