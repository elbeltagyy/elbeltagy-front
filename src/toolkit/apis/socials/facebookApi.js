import { apiSlice } from "../../apiSlice";

const facebookApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        loginFacebook: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/facebook/login",
                    params
                }
            }
        }),
        logoutFacebook: builder.mutation({
            query: (data) => {
                return {
                    url: '/facebook/login',
                    method: 'delete',
                    body: data
                }
            }
        }),
        facebookCallback: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/facebook/callback",
                    params
                }
            }
        }),
        getPages: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/facebook/pages",
                    params
                }
            }
        }),
        getPosts: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/facebook/posts",
                    params
                }
            }
        }),
        createPost: builder.mutation({
            query: data => ({
                url: '/facebook/posts',
                method: 'POST',
                body: data
            })
        }),
        updatePost: builder.mutation({
            query: data => ({
                url: '/facebook/posts/' + data.postId,
                method: 'PUT',
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
        getComments: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/facebook/comments",
                    params
                }
            }
        }),
        createComment: builder.mutation({
            query: data => ({
                url: '/facebook/comments',
                method: 'POST',
                body: data
            })
        }),
        updateComment: builder.mutation({
            query: data => ({
                url: '/facebook/comments',
                method: 'PUT',
                body: data
            })
        }),
        deleteComment: builder.mutation({
            query: data => ({
                url: '/facebook/comments',
                method: 'DELETE',
                body: data
            })
        }),
    })
})


export const {
    useLazyLoginFacebookQuery, useLazyFacebookCallbackQuery, useLogoutFacebookMutation,
    useLazyGetPagesQuery, useGetPagesQuery,
    useGetPostsQuery, useLazyGetPostsQuery, useCreatePostMutation, useDeletePostMutation, useUpdatePostMutation,
    useGetCommentsQuery, useLazyGetCommentsQuery, useCreateCommentMutation, useUpdateCommentMutation, useDeleteCommentMutation
} = facebookApi