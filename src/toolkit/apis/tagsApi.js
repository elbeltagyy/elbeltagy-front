import { apiSlice } from "../apiSlice";

const tagsApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getTags: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/tags",
                    params
                }
            }
        }),
        createTag: builder.mutation({
            query: data => ({
                url: '/tags',
                method: 'POST',
                body: data
            })
        }),
        getOneTag: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/tags/" + params.id,
                    params
                }
            }
        }),
        updateTag: builder.mutation({
            query: data => ({
                url: '/tags/' + data._id,
                method: 'PUT',
                body: data
            })
        }),
        deleteTag: builder.mutation({
            query: (data) => {
                return {
                    url: '/tags/' + data._id,
                    method: 'delete',
                }
            }
        }),
        linkTag: builder.mutation({
            query: data => ({
                url: '/tags/' + data._id + '/questions',
                method: 'POST',
                body: data
            })
        }),
        unLinkTag: builder.mutation({
            query: data => ({
                url: '/tags/' + data._id + '/questions',
                method: 'DELETE',
                body: data
            })
        }),

    })
})


export const {
    useLazyGetTagsQuery, useCreateTagMutation, useUpdateTagMutation, useDeleteTagMutation,
    useLinkTagMutation, useUnLinkTagMutation
} = tagsApi