import { apiSlice } from "../apiSlice";

const tokensApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getSessions: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/sessions",
                    params
                }
            }
        }),
        getOneCode: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/codes" + params.id,
                    params
                }
            }
        }),
        sessionLogout: builder.mutation({
            query: data => ({
                url: '/sessions/' + data._id + '/logout',
                method: 'POST',
                body: data
            })
        }),
        updateCode: builder.mutation({
            query: (data) => {

                return {
                    url: '/codes/' + data._id,
                    method: 'put',
                    body: data
                }
            }
        }),
        deleteCode: builder.mutation({
            query: (data) => {
                return {
                    url: '/codes/' + data._id,
                    method: 'delete',
                }
            }
        }),
        analysisSessions: builder.query({
            query: (queries) => {
                const params = queries

                return {
                    url: "/sessions/statistics/analysis",
                    params
                }
            }
        }),
    })
})


export const { useLazyGetSessionsQuery, useSessionLogoutMutation,
    useLazyAnalysisSessionsQuery
} = tokensApi