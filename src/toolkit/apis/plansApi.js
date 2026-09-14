import { apiSlice } from "../apiSlice";

const plansAPi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getPlans: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/plans",
                    params
                }
            }
        }),
        createPlan: builder.mutation({
            query: (data) => {
                return {
                    url: '/plans',
                    method: 'POST',
                    body: data
                }
            }
        }),

        updatePlan: builder.mutation({
            query: (data) => {
                return {
                    url: '/plans/' + data._id,
                    method: 'put',
                    body: data
                }
            }
        }),
        deletePlan: builder.mutation({
            query: (data) => {
                return {
                    url: '/plans/' + data._id,
                    method: 'delete',
                }
            }
        }),

    })
})

export const {
    useLazyGetPlansQuery, useCreatePlanMutation, useUpdatePlanMutation, useDeletePlanMutation,
} = plansAPi