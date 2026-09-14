import { apiSlice } from "../apiSlice";

const booksAPis = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getBooks: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/books",
                    params
                }
            }
        }),
        getBooksCount: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/books/count",
                    params
                }
            }
        }),
        getOneBook: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/books/" + params.id, // *_*
                    params
                }
            }
        }),
        createBook: builder.mutation({
            query: data => ({
                url: '/books',
                method: 'POST',
                body: data
            })
        }),
        updateBook: builder.mutation({
            query: (data) => {

                return {
                    url: '/books/' + data.get('_id'),
                    method: 'put',
                    body: data
                }
            }
        }),
        deleteBook: builder.mutation({
            query: (data) => {
                return {
                    url: '/books/' + data._id,
                    method: 'delete',
                }
            }
        }),

    })
})


export const {
    useGetBooksQuery, useLazyGetBooksQuery, useGetBooksCountQuery,
    useCreateBookMutation, useUpdateBookMutation, useDeleteBookMutation
} = booksAPis