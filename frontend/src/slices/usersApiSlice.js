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
                url: `${USERS_URL}/logout`,
                method: "POST",
                credentials: "include"
            })
        }),
        register: builder.mutation({
            query: (data) => ({
                url: USERS_URL,
                method: "POST",
                body: data,
                credentials: "include"
            })
        }),
        updateProfile: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: "PUT",
                body: data,
                credentials: "include"
            })
        }),
        // admin
        getUsers: builder.query({
            query: (data) => ({
                url: USERS_URL,
                credentials: "include"
            }),
            keepUnusedDataFor: 5,
            providesTags: ["User"]
        }),
        getUserDetails: builder.query({
            query: ({ userId }) => ({
                url: `${USERS_URL}/${userId}`,
                credentials: "include"
            }),
            keepUnusedDataFor: 5
        }),
        deleteUser: builder.mutation({
            query: ({ userId }) => ({
                url: `${USERS_URL}/${userId}`,
                method: "DELETE",
                credentials: "include"
            }),
            invalidatesTags: ["User"]
        }),
        updateUser: builder.mutation({
            query: ({ userId, data }) => ({
                url: `${USERS_URL}/${userId}`,
                method: "PUT",
                body: data,
                credentials: "include"
            }),
            invalidatesTags: ["User"]
        }),
    })
})

export const {
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
    useUpdateProfileMutation,
    useGetUsersQuery,
    useGetUserDetailsQuery,
    useDeleteUserMutation,
    useUpdateUserMutation
} = usersApiSlice