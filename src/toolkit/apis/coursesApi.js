import { apiSlice } from "../apiSlice";

const coursesApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCourses: builder.query({
            query: (queries) => {
                const params = queries

                return {
                    url: "/content/courses",
                    params
                }
            }
        }),
        getOneCourse: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/content/courses/" + params._id,
                    params

                }
            }
        }),
        createCourse: builder.mutation({
            query: data => ({
                url: '/content/courses',
                method: 'POST',
                body: data
            })
        }),
        updateCourse: builder.mutation({
            query: data => ({
                url: '/content/courses/' + data.get("_id"),
                method: 'PUT',
                body: data
            })
        }),
        getCourseLecturesAndCheckUser: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/content/courses/" + queries.index + '/lectures',
                    // params
                }
            }
        }),
        getLectureAndCheck: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/content/courses/" + queries.index + '/lectures/' + queries.lectureId,
                    // params: {
                    //     courseId: params.courseId
                    // }
                }
            }
        }),
        passLecture: builder.mutation({
            query: (data) => {
                return {
                    url: "/content/courses/" + data.courseId + '/lectures/' + data.lectureId + '/pass',
                    method: 'POST',
                    body: data
                }
            }
        }),
        getExam: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/content/courses/" + queries.courseId + '/exams/' + queries.examId,
                    // params: {
                    //     courseId: params.courseId
                    // }
                }
            }
        }),
        addAttempt: builder.mutation({
            query: (data) => {
                return {
                    url: "/content/courses/" + data.course + '/attempts',
                    method: 'POST',
                    body: data
                }
            }
        }),
        subscribe: builder.mutation({
            query: (data) => {
                return {
                    url: "/content/courses/" + data.course + '/subscribe',
                    method: 'POST',
                    body: data
                }
            }
        }),
        linkCourse: builder.mutation({
            query: (data) => {
                return {
                    url: "/content/courses/" + data.course + '/link',
                    method: 'POST',
                    body: data
                }
            }
        }),

    })
})

export const {
    useLazyGetCoursesQuery, useLazyGetOneCourseQuery, useGetOneCourseQuery, useCreateCourseMutation, useUpdateCourseMutation,
    useSubscribeMutation, useLazyGetCourseLecturesAndCheckUserQuery, useGetLectureAndCheckQuery, usePassLectureMutation,
    useLazyGetExamQuery, useAddAttemptMutation, useLinkCourseMutation
} = coursesApi