import { apiSlice } from "../apiSlice";

const applicationsApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getApplications: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/applications",
                    params
                }
            }
        }),
        getApplicationsCount: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/applications/count",
                    params
                }
            }
        }),
        getOneApplication: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/applications/" + params._id, // *_*
                    params
                }
            }
        }),
        createApplication: builder.mutation({
            query: data => ({
                url: '/applications',
                method: 'POST',
                body: data
            })
        }),
        updateApplication: builder.mutation({
            query: (data) => {
                return {
                    url: '/applications/' + data._id,
                    method: 'PUT',
                    body: data
                }
            }
        }),
        deleteApplication: builder.mutation({
            query: (data) => {
                return {
                    url: '/applications/' + data._id,
                    method: 'delete',
                }
            }
        }),

    })
})


export const {
    useLazyGetApplicationsQuery, useCreateApplicationMutation, useLazyGetOneApplicationQuery,
    useUpdateApplicationMutation, useDeleteApplicationMutation
} = applicationsApi