import { apiSlice } from "../apiSlice";

const reportsApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getReports: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/reports",
                    params
                }
            }
        }),
        createReport: builder.mutation({
            query: (data) => {
                return {
                    url: '/reports',
                    method: 'POST',
                    body: data
                }
            }
        }),
        updateReport: builder.mutation({
            query: (data) => {
                return {
                    url: '/reports/' + data._id,
                    method: 'PUT',
                    body: data
                }
            }
        }),
        deleteReport: builder.mutation({
            query: (data) => {
                return {
                    url: '/reports/' + data._id,
                    method: 'delete',
                }
            }
        }),

    })
})

export const {
    useLazyGetReportsQuery, useCreateReportMutation, useUpdateReportMutation, useDeleteReportMutation
} = reportsApi