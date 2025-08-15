import { apiSlice } from "../apiSlice";

const invoicesApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getInvoices: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/invoices",
                    params
                }
            }
        }),
        getOneInvoice: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/invoices/" + params.id,
                    params
                }
            }
        }),
        makeInvoice: builder.mutation({
            query: (data) => {
                return {
                    url: '/invoices',
                    method: 'POST',
                    body: data
                }
            }
        }),
        invoiceWebhook: builder.mutation({
            query: (data) => {
                return {
                    url: '/invoices/' + data._id + '/webhook',
                    method: 'PUT',
                    body: data
                }
            }
        }),
        updateInvoice: builder.mutation({
            query: (data) => {
                return {
                    url: '/invoices/' + data._id,
                    method: 'put',
                    body: data
                }
            }
        }),
        deleteInvoice: builder.mutation({
            query: (data) => {
                return {
                    url: '/invoices/' + data._id,
                    method: 'delete',
                }
            }
        }),
        deleteManyInvoices: builder.mutation({
            query: (data) => {
                return {
                    url: '/invoices',
                    method: 'delete',
                    params: data,
                    body: data
                }
            }
        }),
    })
})


export const { useLazyGetInvoicesQuery,
    useUpdateInvoiceMutation, useDeleteInvoiceMutation, useDeleteManyInvoicesMutation,
    useMakeInvoiceMutation, useInvoiceWebhookMutation
} = invoicesApi