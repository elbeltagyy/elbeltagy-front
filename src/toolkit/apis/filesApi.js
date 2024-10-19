import { apiSlice } from "../apiSlice";

const filesApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        uploadFiles: builder.mutation({
            query: data => ({
                url: '/files',
                method: 'POST',
                body: data,
            })
        }),
        deleteFile: builder.mutation({
            query: data => ({
                url: '/files',
                method: 'DELETE',
                body: data,
            })
        }),
    })
})
export const { useUploadFilesMutation, useDeleteFileMutation } = filesApi