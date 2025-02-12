import { apiSlice } from "../apiSlice";

const reportFailedApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getFailedReports: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/reports_failed",
                    params
                }
            }
        }),
        getFailedReportUser: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/reports_failed/" + params.report,
                    params
                }
            }
        }),
        deleteFailedReport: builder.mutation({
            query: (data) => {
                return {
                    url: '/reports_failed/' + data._id,
                    method: 'delete',
                }
            }
        }),

    })
})

export const {
    useLazyGetFailedReportsQuery, useLazyGetFailedReportUserQuery, useDeleteFailedReportMutation
} = reportFailedApi