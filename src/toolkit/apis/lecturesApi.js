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
        getAllLectures: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/content/lectures/all",
                    params
                }
            }
        }),
        //Admin, SubAdmin
        getOneLecture: builder.query({
            query: (queries) => {
                const params = queries

                return {
                    url: "/content/lectures/" + params.id,
                    params
                }
            }
        }),
        getLectureForCenter: builder.query({ //Get Lecture
            query: (queries) => {
                const params = queries
                return {
                    url: "/content/lectures/center/" + params.id,
                    params
                }
            }
        }),
        changeLectureIndex: builder.mutation({
            query: data => {
                return ({
                    url: '/content/lectures/' + data.id + '/reorder', //remove it 
                    method: 'POST',
                    body: data
                })
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
                const id = (data.get("id") || data.get("_id"))
                return ({
                    url: '/content/lectures/' + id, //remove it 
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
        }),
        addToLectures: builder.mutation({
            query: data => ({
                url: '/content/lectures/array',
                method: 'POST',
                body: data
            })
        }),
        removeFromLectures: builder.mutation({
            query: data => ({
                url: '/content/lectures/array',
                method: 'DELETE',
                body: data
            })
        }),
        pushLectures: builder.mutation({
            query: data => ({
                url: '/content/lectures/push',
                method: 'POST',
                body: data
            })
        }),
    })
})
export const {
    useLazyGetLecturesQuery, useGetOneLectureQuery, useLazyGetOneLectureQuery, useLazyGetLectureForCenterQuery, useLazyGetAllLecturesQuery,
    useCreateLectureMutation, useUpdateLectureMutation, useDeleteLectureMutation,
    useGetSecureVideoMutation
    , usePatchLectureMutation, useChangeLectureIndexMutation,
    useAddToLecturesMutation, useRemoveFromLecturesMutation, usePushLecturesMutation
} = lecturesApi

// Get LectureForUser => center || group => isValid
// Protect GetLectures