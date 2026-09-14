import { apiSlice } from "../apiSlice";

const tasksApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getTasks: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/tasks",
                    params
                }
            }
        }),
        createTask: builder.mutation({
            query: (data) => {
                return {
                    url: '/tasks',
                    method: 'POST',
                    body: data
                }
            }
        }),

        updateTask: builder.mutation({
            query: (data) => {
                return {
                    url: '/tasks/' + data._id,
                    method: 'put',
                    body: data
                }
            }
        }),
        deleteTask: builder.mutation({
            query: (data) => {
                return {
                    url: '/tasks/' + data._id,
                    method: 'delete',
                }
            }
        }),

    })
})

export const {
    useLazyGetTasksQuery, useCreateTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation
} = tasksApi