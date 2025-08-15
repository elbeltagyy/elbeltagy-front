import { apiSlice } from "../apiSlice";

const groupsApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getGroups: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/groups",
                    params
                }
            }
        }),
        createGroup: builder.mutation({
            query: (data) => {
                return {
                    url: '/groups',
                    method: 'POST',
                    body: data
                }
            }
        }),

        updateGroup: builder.mutation({
            query: (data) => {
                return {
                    url: '/groups/' + data._id,
                    method: 'put',
                    body: data
                }
            }
        }),
        deleteGroup: builder.mutation({
            query: (data) => {
                return {
                    url: '/groups/' + data.id,
                    method: 'delete',
                }
            }
        }),
        addUserToGroup: builder.mutation({
            query: (data) => {
                return {
                    url: '/groups/' + data.groupId + '/users',
                    method: 'POST',
                    body: data
                }
            }
        }),
        removeUserFromGroup: builder.mutation({
            query: (data) => {
                return {
                    url: '/groups/' + data.groupId + '/users',
                    method: 'DELETE',
                    body: data
                }
            }
        }),
        addLectureToGroup: builder.mutation({
            query: (data) => {
                return {
                    url: '/groups/' + data.groupId + '/lectures',
                    method: 'POST',
                    body: data
                }
            }
        }),
        removeLectureFromGroup: builder.mutation({
            query: (data) => {
                return {
                    url: '/groups/' + data.groupId + '/lectures',
                    method: 'DELETE',
                    body: data
                }
            }
        }),
    })
})

export const {
    useLazyGetGroupsQuery, useCreateGroupMutation, useUpdateGroupMutation, useDeleteGroupMutation,
    useAddUserToGroupMutation, useRemoveUserFromGroupMutation,
    useAddLectureToGroupMutation, useRemoveLectureFromGroupMutation,
} = groupsApi