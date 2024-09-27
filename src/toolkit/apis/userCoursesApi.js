import { apiSlice } from "../apiSlice";

const userCoursesApi = apiSlice.injectEndpoints({
    endpoints: builder => ({

        getUserCourses: builder.query({
            query: (queries) => {
                const params = queries

                return {
                    url: "/user_courses/courses",
                    params
                }
            }
        }),
        getOneUserCourse: builder.query({
            query: (queries) => {
                const params = queries

                return {
                    url: "/user_courses/courses/" + params.course,
                    params
                }
            }
        }),
        getAllUsersCourses: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/user_courses/users",
                    params
                }
            }
        }),
        subscribe: builder.mutation({
            query: data => ({
                url: '/user_courses/subscribe',
                method: 'POST',
                body: data
            })
        }),
    })
})

export const { useLazyGetUserCoursesQuery, useGetUserCoursesQuery, useGetOneUserCourseQuery, useGetAllUsersCoursesQuery,useLazyGetAllUsersCoursesQuery, useSubscribeMutation
} = userCoursesApi