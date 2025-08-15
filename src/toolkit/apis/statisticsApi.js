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
        analysisSubscriptions: builder.query({
            query: (queries) => {
                const params = queries

                return {
                    url: "/statistics/subscriptions/analysis",
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
        getTagsCount: builder.query({
            query: (queries) => {
                const params = queries

                return {
                    url: "/statistics/tags",
                    params
                }
            }
        }),
        getQuestionsCount: builder.query({
            query: (queries) => {
                const params = queries

                return {
                    url: "/statistics/questions",
                    params
                }
            }
        }),
        getAnswersCount: builder.query({
            query: (queries) => {
                const params = queries

                return {
                    url: "/statistics/answers",
                    params
                }
            }
        }),
    })
})



export const {
    useLazyGetUsersCountQuery, 
    useLazyGetUserExamAttemptsCountQuery,
    useLazyGetUnitsCountQuery,
    useLazyGetCoursesCountQuery, useLazyGetLecturesCountQuery,
    useGetSubscriptionsCountQuery, useLazyAnalysisSubscriptionsQuery,
    useGetUsersNotificationsCountQuery,
    useGetViewsCountQuery, useGetByUsersViewsCountQuery,
    useGetTagsCountQuery, useGetQuestionsCountQuery, useGetAnswersCountQuery
} = statisticsApi