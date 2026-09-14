import { apiSlice } from "../apiSlice";

const booksOrdersApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getBooksOrders: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/booksOrders",
                    params
                }
            }
        }),
        getBooksOrdersCount: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/booksOrders/count",
                    params
                }
            }
        }),
        getOneBooksOrders: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/booksOrders/" + params.id, // *_*
                    params
                }
            }
        }),
        createBookOrder: builder.mutation({
            query: data => ({
                url: '/booksOrders',
                method: 'POST',
                body: data
            })
        }),
        updateBookOrder: builder.mutation({
            query: (data) => {
                return {
                    url: '/booksOrders/' + data._id,
                    method: 'PUT',
                    body: data
                }
            }
        }),
        deleteBooksOrder: builder.mutation({
            query: (data) => {
                return {
                    url: '/booksOrders/' + data._id,
                    method: 'delete',
                }
            }
        }),

    })
})


export const {
    useLazyGetBooksOrdersQuery, useUpdateBookOrderMutation, useGetBooksOrdersCountQuery,
    useCreateBookOrderMutation, useDeleteBooksOrderMutation
} = booksOrdersApi