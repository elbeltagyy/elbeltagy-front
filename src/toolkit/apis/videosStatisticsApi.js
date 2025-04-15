import { apiSlice } from "../apiSlice";

const videosStatisticsApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        videoOn: builder.mutation({
            query: (data) => ({
                url: `/video_statistics/on`,
                method: 'POST',
                body: data
            })
        }),
        getViews: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/video_statistics",
                    params
                }
            }
        }),
        getByUserViews: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/video_statistics/users",
                    params
                }
            }
        }),
        updateView: builder.mutation({
            query: (data) => ({
                url: `/video_statistics/` + data.id,
                method: 'PUT',
                body: data
            })
        }),
        deleteView: builder.mutation({
            query: (data) => ({
                url: `/video_statistics/` + data._id,
                method: 'DELETE',
                body: data
            })
        }),
    }),
    overrideExisting: false,
})

export const {
    useVideoOnMutation,

    useLazyGetByUserViewsQuery,
    useLazyGetViewsQuery,
    useUpdateViewMutation,
    useDeleteViewMutation,
} = videosStatisticsApi