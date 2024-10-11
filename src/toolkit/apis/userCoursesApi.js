import { apiSlice } from "../apiSlice";

const userCoursesApi = apiSlice.injectEndpoints({
    endpoints: builder => ({

        getCourseSubscriptions: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/subscriptions/courses",
                    params
                }
            }
        }),
        createSubscription: builder.mutation({
            query: (data) => {
                console.log('data ==>', data)
                return {
                    url: "/subscriptions/courses",
                    method: 'POST',
                    body: data
                }
            }
        }),
        deleteSubscription: builder.mutation({
            query: (data) => ({
                url: "/subscriptions/courses/" + data._id,
                method: 'DELETE',
            })
        }),

    })
})

export const { useLazyGetCourseSubscriptionsQuery, useCreateSubscriptionMutation, useDeleteSubscriptionMutation } = userCoursesApi