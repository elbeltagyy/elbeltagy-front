import { apiSlice } from "../apiSlice";

const usersApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/users",
                    params
                }
            },
        }),
        deleteManyUsers: builder.mutation({
            query: data => ({
                url: '/users',
                method: 'DELETE',
                body: data,
                params: data
            })
        }),
        analysisUsers: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/users/analysis",
                    params
                }
            },
        }),
        getOneUser: builder.query({
            query: (userName) => `/users/${userName}`
        }),
        createUser: builder.mutation({
            query: data => ({
                url: '/users',
                method: 'POST',
                body: data
            })
        }),
        addToUser: builder.mutation({
            query: (data) => {
                return {
                    url: `/users/push`,
                    method: 'PATCH',
                    body: data
                }
            }
        }),
        updateUser: builder.mutation({
            query: (data) => {
                return {
                    url: `/users/` + data._id,
                    method: 'PUT',
                    body: data
                }
            }
        }),
        updateUserProfile: builder.mutation({
            query: (data) => ({
                url: `/users/` + data.get("id"),
                method: 'PATCH',
                body: data
            })
        }),
        deleteUser: builder.mutation({
            query: (data) => ({
                url: `/users/` + data._id,
                method: 'DELETE',
                // body: data
            })
        }),
        login: builder.mutation({
            query: data => ({
                url: '/auth/login',
                method: 'POST',
                body: data,
                credentials: 'include',

            }),
        }),
        signup: builder.mutation({
            query: data => ({
                url: '/auth/signup',
                method: 'POST',
                body: data
            }),
        }),
        logout: builder.query({
            query: () => {
                return {
                    url: "/auth/logout",
                }
            },
        }),
        isLogged: builder.query({
            query: () => {
                return {
                    url: "/auth/is_logged",
                }
            },
        }),
        forget_password: builder.mutation({
            query: data => ({
                url: '/auth/forget_password',
                method: 'POST',
                body: data
            }),
        }),
        verify_password: builder.mutation({
            query: data => ({
                url: '/auth/verify_password',
                method: 'POST',
                body: data
            }),
        }),
    }),
    overrideExisting: false,
})

export const {
    useLazyGetUsersQuery,
    useDeleteManyUsersMutation,
    useLazyGetOneUserQuery,
    useLazyAnalysisUsersQuery,

    useCreateUserMutation,
    useAddToUserMutation,
    useUpdateUserMutation,
    useUpdateUserProfileMutation,

    useDeleteUserMutation,

    // for auth
    useLoginMutation,
    useSignupMutation,
    useLazyLogoutQuery,
    useLazyIsLoggedQuery,

    useForget_passwordMutation,
    useVerify_passwordMutation
} = usersApi