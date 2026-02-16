import { apiSlice } from "../apiSlice";

const couponsApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        verifyCoupon: builder.mutation({
            query: data => ({
                url: '/coupons/verify',
                method: 'POST',
                body: data
            })
        }),
        getCoupons: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/coupons",
                    params
                }
            }
        }), addToCoupon: builder.mutation({
            query: (data) => {
                return {
                    url: `/coupons/push`,
                    method: 'PATCH',
                    body: data
                }
            }
        }),
        // getOneCoupon: builder.query({
        //     query: (queries) => {
        //         const params = queries
        //         return {
        //             url: "/coupons" + params.id,
        //             params
        //         }
        //     }
        // }),
        createCoupon: builder.mutation({
            query: data => ({
                url: '/coupons',
                method: 'POST',
                body: data
            })
        }),
        updateCoupon: builder.mutation({
            query: (data) => {
                return {
                    url: '/coupons/' + data._id,
                    method: 'put',
                    body: data
                }
            }
        }),
        deleteCoupon: builder.mutation({
            query: (data) => {
                return {
                    url: '/coupons/' + data._id,
                    method: 'delete',
                }
            }
        }),

    })
})


export const { useLazyGetCouponsQuery, useCreateCouponMutation, useUpdateCouponMutation, useDeleteCouponMutation, useVerifyCouponMutation,
    useAddToCouponMutation
} = couponsApi