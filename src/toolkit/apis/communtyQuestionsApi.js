import { apiSlice } from "../apiSlice";

const communityQuestionsApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCommunityQuestions: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/community/questions",
                    params
                }
            }
        }),
        getCommunityQuestionsCount: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/community/questions/count",
                    params
                }
            }
        }),
        getOneCommunityQuestion: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/community/questions/" + params.id, // *_*
                    params
                }
            }
        }),
        createCommunityQuestion: builder.mutation({
            query: data => ({
                url: '/community/questions',
                method: 'POST',
                body: data
            })
        }),
        updateCommunityQuestion: builder.mutation({
            query: (data) => {
                return {
                    url: '/community/questions/' + data._id,
                    method: 'PUT',
                    body: data
                }
            }
        }),
        addCommunityQuestionLike: builder.mutation({
            query: (data) => {
                return {
                    url: '/community/questions/' + data._id + '/likes',
                    method: 'PUT',
                    body: data
                }
            }
        }),
        deleteManyCommunityQuestions: builder.mutation({
            query: (data) => {
                return {
                    url: '/community/questions',
                    method: 'delete',
                    body: data, params: data
                }
            }
        }),
        deleteCommunityQuestion: builder.mutation({
            query: (data) => {
                return {
                    url: '/community/questions/' + data._id,
                    method: 'delete',
                }
            }
        }),

    })
})


export const {
    useLazyGetCommunityQuestionsQuery, useGetCommunityQuestionsCountQuery, useLazyGetOneCommunityQuestionQuery,
    useCreateCommunityQuestionMutation, useDeleteCommunityQuestionMutation,
    useUpdateCommunityQuestionMutation, useAddCommunityQuestionLikeMutation
} = communityQuestionsApi