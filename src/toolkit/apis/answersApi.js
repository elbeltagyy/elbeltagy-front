import { apiSlice } from "../apiSlice";

const answersApi = apiSlice.injectEndpoints({
    endpoints: builder => ({

        getAnswers: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/answers",
                    params
                }
            }
        }),
        getOneAnswer: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/answers/" + params.id,
                    params
                }
            }
        }),
        updateAnswer: builder.mutation({
            query: data => ({
                url: '/answers/' + data._id,
                method: 'PUT',
                body: data
            })
        }),
        removeAnswer: builder.mutation({
            query: data => ({
                url: '/answers/' + data._id,//question Id
                method: 'DELETE',
                body: data
            })
        }),
        markAQuestion: builder.mutation({
            query: data => ({
                url: '/answers/' + data._id,//question Id
                method: 'POST',
                body: data
            })
        }),
        markAttempt: builder.mutation({
            query: data => ({
                url: '/answers/attempt',
                method: 'POST',
                body: data
            })
        }),
    })
})


export const { useLazyGetAnswersQuery, useRemoveAnswerMutation, useUpdateAnswerMutation,
    useMarkAQuestionMutation, useMarkAttemptMutation
} = answersApi