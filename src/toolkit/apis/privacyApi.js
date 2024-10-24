import { apiSlice } from "../apiSlice";

const privacyApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getPrivacies: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/privacy",
                    params
                }
            }
        }),
        createPrivacy: builder.mutation({
            query: (data) => {
                return {
                    url: '/privacy',
                    method: 'POST',
                    body: data
                }
            }
        }),

        updatePrivacy: builder.mutation({
            query: (data) => {
                return {
                    url: '/privacy/' + data.id,
                    method: 'put',
                    body: data
                }
            }
        }),
        deletePrivacy: builder.mutation({
            query: (data) => {
                return {
                    url: '/privacy/' + data.id,
                    method: 'delete',
                }
            }
        }),

    })
})

export const { useLazyGetPrivaciesQuery, useGetPrivaciesQuery, useUpdatePrivacyMutation, useCreatePrivacyMutation, useDeletePrivacyMutation
} = privacyApi