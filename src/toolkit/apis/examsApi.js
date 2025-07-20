import { apiSlice } from "../apiSlice";

const examsApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getExams: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: '/content/exams',
                    params
                }
            }
        }),
        getOneExam: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: '/content/exams/' + params.id,
                    params
                }
            }
        }),
        createExam: builder.mutation({
            query: data => ({
                url: '/content/exams',
                method: 'POST',
                body: data
            })
        }),
        updateExam: builder.mutation({
            query: data => ({
                url: '/content/exams/lectures/' + data.lecture,
                method: 'PUT',
                body: data
            })
        }),
    })
})
export const {
    useLazyGetExamsQuery, useCreateExamMutation, useUpdateExamMutation
} = examsApi

// Get LectureForUser => center || group => isValid
// Protect GetLectures