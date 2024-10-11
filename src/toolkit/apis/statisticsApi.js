import { apiSlice } from "../apiSlice";

const statisticsApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsersCount: builder.query({
            query: (queries) => {
                const params = queries

                return {
                    url: "/statistics/users",
                    params
                }
            }
        }),
        getUnitsCount: builder.query({
            query: (queries) => {
                const params = queries

                return {
                    url: "/statistics/units",
                    params
                }
            }
        }),
        getCoursesCount: builder.query({
            query: (queries) => {
                const params = queries

                return {
                    url: "/statistics/courses",
                    params
                }
            }
        }),
        getLecturesCount: builder.query({
            query: (queries) => {
                const params = queries

                return {
                    url: "/statistics/lectures",
                    params
                }
            }
        }),
        getSubscriptionsCount: builder.query({
            query: (queries) => {
                const params = queries
                
                return {
                    url: "/statistics/subscriptions",
                    params
                }
            }
        }),

    })
})



export const { useLazyGetUsersCountQuery,
    useLazyGetUnitsCountQuery, useLazyGetCoursesCountQuery, useLazyGetLecturesCountQuery, useGetSubscriptionsCountQuery
} = statisticsApi