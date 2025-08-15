import { apiSlice } from "../apiSlice";

const paymentsApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getPayments: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/payments",
                    params
                }
            }
        }),
        getOnePayment: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/payments/" + params.id,
                    params
                }
            }
        }),
        createPayment: builder.mutation({
            query: (data) => {
                return {
                    url: '/payments',
                    method: 'POST',
                    body: data
                }
            }
        }),

        updatePayment: builder.mutation({
            query: (data) => {
                return {
                    url: '/payments/' + data.get('_id'),
                    method: 'put',
                    body: data
                }
            }
        }),
        deletePayment: builder.mutation({
            query: (data) => {
                return {
                    url: '/payments/' + data._id,
                    method: 'delete',
                }
            }
        }),
    })
})


export const { useLazyGetPaymentsQuery,useGetPaymentsQuery,
    useCreatePaymentMutation, useUpdatePaymentMutation, useDeletePaymentMutation
} = paymentsApi