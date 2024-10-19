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
        getLectureForCenter: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/content/lectures/center/" + params.id,
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
        deleteLecture: builder.mutation({
            query: data => {
                return ({
                    url: '/content/lectures/' + data.id, //remove it 
                    method: 'DELETE',
                })
            }
        }),
        patchLecture: builder.mutation({
            query: data => {
                return ({
                    url: '/content/lectures/' + data.get("id"),
                    method: 'PATCH',
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
        updateExam: builder.mutation({
            query: data => ({
                url: '/content/lectures/exams/' + data.lecture,
                method: 'PUT',
                body: data
            })
        }),

    })
})
export const { useLazyGetLecturesQuery, useGetOneLectureQuery, useLazyGetOneLectureQuery, useGetLectureForCenterQuery, useCreateLectureMutation, useUpdateLectureMutation, useDeleteLectureMutation,
    useGetSecureVideoMutation
    , useCreateExamMutation, useUpdateExamMutation, usePatchLectureMutation
} = lecturesApi