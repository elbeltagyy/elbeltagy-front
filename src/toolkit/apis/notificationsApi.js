import { apiSlice } from "../apiSlice";

const notificationsApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getNotifications: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/notifications",
                    params
                }
            }
        }),
        makeSeen: builder.query({
            query: (data) => {
                return {
                    url: '/notifications/seen/' + data.user,
                }
            }
        }),
        getOneNotification: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/notifications/" + params.id,
                    params
                }
            }
        }),
        createNotification: builder.mutation({
            query: (data) => {
                return {
                    url: '/notifications',
                    method: 'POST',
                    body: data
                }
            }
        }),

        updateNotification: builder.mutation({
            query: (data) => {
                return {
                    url: '/notifications/' + data._id,
                    method: 'put',
                    body: data
                }
            }
        }),
        deleteNotification: builder.mutation({
            query: (data) => {
                return {
                    url: '/notifications/' + data.id,
                    method: 'delete',
                }
            }
        }),

    })
})


export const { useLazyGetNotificationsQuery, useCreateNotificationMutation, useUpdateNotificationMutation, useDeleteNotificationMutation, useLazyMakeSeenQuery
} = notificationsApi