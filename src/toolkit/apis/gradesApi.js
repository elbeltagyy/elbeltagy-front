import { apiSlice } from "../apiSlice";

const gradesApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getGrades: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/grades",
                    params
                }
            }
        }),
        createGrade: builder.mutation({
            query: data => ({
                url: '/grades',
                method: 'POST',
                body: data
            })
        }),
        getOneGrade: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/grades/" + params._id,
                    params
                }
            }
        }),
        updateGrade: builder.mutation({
            query: data => ({
                url: '/grades/' + data.get('_id') || data._id,
                method: 'PUT',
                body: data
            })
        }),
        deleteGrade: builder.mutation({
            query: (data) => {
                return {
                    url: '/grades/' + data._id,
                    method: 'delete'
                }
            }
        })
    })
})


export const {
    useLazyGetGradesQuery, useLazyGetOneGradeQuery,useGetGradesQuery,

    useCreateGradeMutation, useUpdateGradeMutation,useDeleteGradeMutation
} = gradesApi