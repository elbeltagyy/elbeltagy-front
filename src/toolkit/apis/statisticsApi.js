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
        getUsersNotificationsCount: builder.query({
            query: (queries) => {
                const params = queries

                return {
                    url: "/statistics/notifications",
                    params
                }
            }
        }),
        getUserExamAttemptsCount: builder.query({
            query: (queries) => {
                const params = queries

                return {
                    url: "/statistics/attempts",
                    params
                }
            }
        }),
        getViewsCount: builder.query({
            query: (queries) => {
                const params = queries

                return {
                    url: "/statistics/views",
                    params
                }
            }
        }),
        getByUsersViewsCount: builder.query({
            query: (queries) => {
                const params = queries

                return {
                    url: "/statistics/views_users",
                    params
                }
            }
        }),
    })
})



export const { useLazyGetUsersCountQuery, useLazyGetUserExamAttemptsCountQuery,
    useLazyGetUnitsCountQuery, useLazyGetCoursesCountQuery, useLazyGetLecturesCountQuery, useGetSubscriptionsCountQuery, useGetUsersNotificationsCountQuery,
    useGetViewsCountQuery, useGetByUsersViewsCountQuery
} = statisticsApi