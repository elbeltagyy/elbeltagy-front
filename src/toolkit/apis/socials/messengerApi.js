import { apiSlice } from "../../apiSlice";

const messengerAPi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getMessengerConversations: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/messenger/conversations",
                    params
                }
            }
        }),
        getMessengerConversationMessages: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/messenger/conversations/" + params.conversationId,
                    params
                }
            }
        }),
        replayToMessage: builder.mutation({
            query: data => ({
                url: "/messenger/conversations/" + data.get('conversationId'),
                method: 'POST',
                body: data
            })
        }),
        deletePost: builder.mutation({
            query: data => ({
                url: '/facebook/posts/' + data.postId,
                method: 'DELETE',
                body: data
            })
        }),
    })
})


export const {
    useLazyGetMessengerConversationsQuery, useLazyGetMessengerConversationMessagesQuery,
    useGetMessengerConversationsQuery,
    useReplayToMessageMutation
} = messengerAPi