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
                    url: "/content/courses/" + params.id,

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
                url: '/content/courses/' + data.id,
                method: 'PUT',
                body: data
            })
        }),

    })
})

export const { useLazyGetCoursesQuery, useLazyGetOneCourseQuery, useCreateCourseMutation, useUpdateCourseMutation } = coursesApi