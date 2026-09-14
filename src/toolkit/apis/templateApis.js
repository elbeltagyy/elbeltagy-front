import { apiSlice } from "../apiSlice";

const templateApis = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getTemplates: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/templates",
                    params
                }
            }
        }),
        createTemplate: builder.mutation({
            query: (data) => {
                return {
                    url: '/templates',
                    method: 'POST',
                    body: data
                }
            }
        }),

        updateTemplate: builder.mutation({
            query: (data) => {
                return {
                    url: '/templates/' + data._id,
                    method: 'put',
                    body: data
                }
            }
        }),
        incrementUses: builder.mutation({
            query: (data) => {
                return {
                    url: '/templates/' + data._id + '/increment',
                    method: 'put',
                    body: data
                }
            }
        }),
        deleteTemplate: builder.mutation({
            query: (data) => {
                return {
                    url: '/templates/' + data._id,
                    method: 'delete',
                }
            }
        }),

    })
})

export const {
    useLazyGetTemplatesQuery, useCreateTemplateMutation, useUpdateTemplateMutation, useDeleteTemplateMutation, useIncrementUsesMutation
} = templateApis