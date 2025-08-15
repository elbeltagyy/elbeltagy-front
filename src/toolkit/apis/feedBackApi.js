import { apiSlice } from "../apiSlice";

const feedBackApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getFeedBacks: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/feedBacks",
                    params
                }
            }
        }),
        createFeedBack: builder.mutation({
            query: data => ({
                url: '/feedBacks',
                method: 'POST',
                body: data
            })
        }),
        getOneFeedBack: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/feedBacks/" + params.id,
                    params
                }
            }
        }),
        updateFeedBack: builder.mutation({
            query: data => ({
                url: '/feedBacks/' + data._id,
                method: 'PUT',
                body: data
            })
        }),
        deleteFeedBack: builder.mutation({
            query: (data) => {
                return {
                    url: '/feedBacks/' + data._id,
                    method: 'delete',
                }
            }
        })
    })
})


export const {
    useLazyGetFeedBacksQuery, useGetOneFeedBackQuery,
    useUpdateFeedBackMutation, useCreateFeedBackMutation, useDeleteFeedBackMutation
} = feedBackApi