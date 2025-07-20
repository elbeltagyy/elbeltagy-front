import { apiSlice } from "../apiSlice";

const attemptsApi = apiSlice.injectEndpoints({
    endpoints: builder => ({

        getAttempts: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/attempts",
                    params
                }
            }
        }),
        getOneAttempt: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/attempts/" + params.id,
                    params
                }
            }
        }),
        startExam: builder.mutation({
            query: (data) => {
                return {
                    url: '/attempts',
                    method: 'POST',
                    body: data
                }
            }
        }),
        deleteAttempt: builder.mutation({
            query: (data) => {
                return {
                    url: '/attempts/' + data.id,
                    method: 'delete',
                    data
                }
            }
        }),
        getUserInfo: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/attempts/" + 'users/' + params.user,
                    params
                }
            }
        }),
    })
})


export const { useLazyGetAttemptsQuery, useLazyGetOneAttemptQuery, useStartExamMutation,
    useDeleteAttemptMutation,
    useLazyGetUserInfoQuery } = attemptsApi