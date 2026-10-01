import { apiSlice } from "../apiSlice";

const communityCommentsApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCommunityComments: builder.query({
            query: (queries) => ({
                url: "/community/comments",
                params: queries
            })
        }),

        getCommunityCommentsCount: builder.query({
            query: (queries) => ({
                url: "/community/comments/count",
                params: queries
            })
        }),

        getOneCommunityComment: builder.query({
            query: (queries) => ({
                url: "/community/comments/" + queries.id,
                params: queries
            })
        }),

        createCommunityComment: builder.mutation({
            query: data => ({
                url: "/community/comments",
                method: "POST",
                body: data
            })
        }),

        updateCommunityComment: builder.mutation({
            query: data => ({
                url: "/community/comments/" + data._id,
                method: "PUT",
                body: data
            })
        }),
        addCommunityCommentLike: builder.mutation({
            query: (data) => {
                return {
                    url: '/community/comments/' + data._id + '/likes',
                    method: 'PUT',
                    body: data
                }
            }
        }),

        deleteCommunityComment: builder.mutation({
            query: data => ({
                url: "/community/comments/" + data._id,
                method: "DELETE"
            })
        }),
    })
});

export const {
    useLazyGetCommunityCommentsQuery,
    useLazyGetCommunityCommentsCountQuery,
    useLazyGetOneCommunityCommentQuery,
    useCreateCommunityCommentMutation,
    useDeleteCommunityCommentMutation,
    useUpdateCommunityCommentMutation, useAddCommunityCommentLikeMutation
} = communityCommentsApi;