import { apiSlice } from "../apiSlice";

const lecturesApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getLectures: builder.query({
            query: (queries) => {
                const params = queries

                return {
                    url: "/content/lectures",
                    params
                }
            }
        }),
        getOneLecture: builder.query({
            query: (queries) => {
                const params = queries

                return {
                    url: "/content/lectures/" + params.id,
                    params
                }
            }
        }),
        createLecture: builder.mutation({
            query: data => ({
                url: '/content/lectures',
                method: 'POST',
                body: data
            })
        }),
        updateLecture: builder.mutation({
            query: data => {
                return ({
                    url: '/content/lectures/' + data.get("id"), //remove it 
                    method: 'PUT',
                    body: data
                })
            }
        }),
        getSecureVideo: builder.mutation({
            query: (data) => {
                return {
                    url: '/content/lectures/' + data.lecture + '/secure_video',
                    method: 'POST', body: data
                }
            }
        }), createExam: builder.mutation({
            query: data => ({
                url: '/content/lectures/exams',
                method: 'POST',
                body: data
            })
        }),

    })
})
export const { useLazyGetLecturesQuery, useGetOneLectureQuery, useCreateLectureMutation, useUpdateLectureMutation, useGetSecureVideoMutation
    , useCreateExamMutation
} = lecturesApi