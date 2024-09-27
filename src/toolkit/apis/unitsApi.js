import { apiSlice } from "../apiSlice";

const unitsApi = apiSlice.injectEndpoints({
    endpoints: builder => ({

        getUnits: builder.query({
            query: (queries) => {
                const params = queries

                return {
                    url: "/content/units",
                    params
                }
            }
        }),
        createUnit: builder.mutation({
            query: data => ({
                url: '/content/units',
                method: 'POST',
                body: data
            })
        }),
        updateUnit: builder.mutation({
            query: (data) => {
                console.log(data)
                // return (
                //     {
                //         url: '/content/unit',
                //         method: 'POST',
                //         body: data
                //     }
                // )
            }
        }),
    })
})


export const { useLazyGetUnitsQuery, useCreateUnitMutation, useUpdateUnitMutation } = unitsApi