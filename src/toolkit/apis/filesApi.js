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
    })
})
export const { useUploadFilesMutation } = filesApi