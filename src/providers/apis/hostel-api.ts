import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const hostelApi = createApi({
    reducerPath: "hostelApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://hostel-management-wky9.onrender.com/api/"
    }),
    endpoints: (build) => ({

        getHostels: build.query<any, { token: string | null }>({
            query({ token }) {
                return {
                    url: "hostels",
                    method: "GET",
                    extraOptions: { maxRetries: 0 },
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            }
        })
    }),
})

export const { useGetHostelsQuery } = hostelApi