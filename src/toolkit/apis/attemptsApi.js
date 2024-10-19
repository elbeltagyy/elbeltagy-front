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


export const { useLazyGetAttemptsQuery, useLazyGetOneAttemptQuery, useLazyGetUserInfoQuery } = attemptsApi