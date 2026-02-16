import { apiSlice } from "../apiSlice";

const questionsApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getQuestions: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/questions",
                    params
                }
            }
        }),
        getOneQuestion: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/questions/" + params.id,
                    params
                }
            }
        }),
        createQuestion: builder.mutation({
            query: data => ({
                url: '/questions',
                method: 'POST',
                body: data
            })
        }),
        updateQuestion: builder.mutation({
            query: (data) => {

                return {
                    url: '/questions/' + data._id,
                    method: 'put',
                    body: data
                }
            }
        }),
        deleteQuestion: builder.mutation({
            query: (data) => {
                return {
                    url: '/questions/' + data._id,
                    method: 'delete',
                }
            }
        }),
        startQuestionBank: builder.mutation({
            query: (data) => {
                return {
                    url: '/questions/bank',
                    method: 'POST',
                    body: data
                }
            }
        }),
        linkQuestionToTags: builder.mutation({
            query: data => ({
                url: '/questions/' + data._id + '/tags',
                method: 'POST',
                body: data
            })
        }),
        unlinkQuestionToTags: builder.mutation({
            query: data => ({
                url: '/questions/' + data._id + '/tags',
                method: 'DELETE',
                body: data
            })
        }),
        formatQAi : builder.mutation({
            query: data => ({
                url: '/questions/format/ai' ,
                method: 'POST',
                body: data
            })
        }),

    })
})


export const {
    useLazyGetQuestionsQuery, useLazyGetOneQuestionQuery,
    useCreateQuestionMutation, useUpdateQuestionMutation, useDeleteQuestionMutation,
    useLinkQuestionToTagsMutation, useUnlinkQuestionToTagsMutation,

    //user
    useStartQuestionBankMutation,
    useFormatQAiMutation
} = questionsApi