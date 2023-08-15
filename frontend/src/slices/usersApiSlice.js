import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/login`,
                method: "POST",
                body: data,
                credentials: "include"
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`
            })
        })
    })
})

export const { useLoginMutation, useLogoutMutation } = usersApiSlice