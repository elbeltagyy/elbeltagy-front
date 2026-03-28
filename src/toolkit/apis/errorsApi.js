import { apiSlice } from "../apiSlice";

const errorsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    getErrors: builder.query({
      query: (queries) => {
        const params = queries;
        return {
          url: "/errors",
          params,
        };
      },
    }),
    deleteSameErrors: builder.mutation({
      query: data => ({
        url: '/errors/many/' + data._id,
        method: 'DELETE',
        body: data,
      })
    }),
  }),
});

export const { useLazyGetErrorsQuery, useDeleteSameErrorsMutation } = errorsApi;
