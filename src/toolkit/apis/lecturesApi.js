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
                    url: "/content/lectures/" + params.lecture,
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
                    url: '/content/lectures/' + data.get("id"),
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
        })

    })
})
//السلام عليكم و رحمه الله وبركاته:
export const { useLazyGetLecturesQuery, useLazyGetOneLectureQuery, useCreateLectureMutation, useUpdateLectureMutation, useGetSecureVideoMutation } = lecturesApi