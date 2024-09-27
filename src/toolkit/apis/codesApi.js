import { apiSlice } from "../apiSlice";

const codesApi = apiSlice.injectEndpoints({
    endpoints: builder => ({

        verifyCode: builder.mutation({
            query: data => ({
                url: '/codes/verify',
                method: 'POST',
                body: data
            })
        }),
        getCodes: builder.query({
            query: (queries) => {
                const params = queries

                return {
                    url: "/codes",
                    params
                }
            }
        }),
        getOneCode: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/codes" + params.id,
                    params
                }
            }
        }),
        createCode: builder.mutation({
            query: data => ({
                url: '/codes',
                method: 'POST',
                body: data
            })
        }),
        updateCode: builder.mutation({
            query: (data) => {

                return {
                    url: '/codes/' + data._id,
                    method: 'put',
                    body: data
                }
            }
        }),
        deleteCode: builder.mutation({
            query: (data) => {
                return {
                    url: '/codes/' + data._id,
                    method: 'delete',
                }
            }
        }),

    })
})


export const { useVerifyCodeMutation, useLazyGetCodesQuery, useLazyGetOneCodeQuery,
    useCreateCodeMutation, useUpdateCodeMutation, useDeleteCodeMutation
} = codesApi