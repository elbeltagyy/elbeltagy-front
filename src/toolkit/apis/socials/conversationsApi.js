import { apiSlice } from "../../apiSlice";

const conversationsApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getConversations: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/conversations",
                    params
                }
            }
        }),
        sendMessage: builder.mutation({
            query: data => ({
                url: '/conversations/' + data.get('phone'),
                method: 'POST',
                body: data
            }),
        }),
        updateConversation: builder.mutation({
            query: data => ({
                url: '/conversations/' + data._id,
                method: 'PATCH',
                body: data
            }),
        }),
        markConversationSeen: builder.mutation({
            query: data => ({
                url: '/conversations/' + data.phone + '/mark_seen',
                method: 'PATCH',
                body: data
            }),
        }),
        deleteConversation: builder.mutation({
            query: data => ({
                url: '/conversations/' + data._id,
                method: 'DELETE',
                body: data
            })
        }),
    })
})


export const {
    useLazyGetConversationsQuery, useGetConversationsQuery,
    useMarkConversationSeenMutation, useDeleteConversationMutation, useUpdateConversationMutation,
    useSendMessageMutation
} = conversationsApi