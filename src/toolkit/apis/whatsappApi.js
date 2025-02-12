import { apiSlice } from "../apiSlice";

const whatsappApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getWhatsappStatus: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/whatsapp/userId/status",
                    params
                }
            }
        }),
        initWhatsapp: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/whatsapp/userId/init",
                    params
                }
            },
        }),
        closeWhats: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/whatsapp/userId/close",
                    params
                }
            }
        }),
        getWhatsappQR: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/whatsapp/userId/qr",
                    params
                }
            }
        }),
        sendWhatsappMsg: builder.mutation({
            query: (data) => {
                return {
                    url: "/whatsapp/userId/send",
                    method: 'POST',
                    body: data
                }
            }
        }),
        sendWhatsappFile: builder.mutation({
            query: (data) => {
                return {
                    url: "/whatsapp/userId/send_file",
                    method: 'POST',
                    body: data
                }
            }
        }),

    })
})

export const {
    useGetWhatsappStatusQuery, useLazyGetWhatsappQRQuery, useLazyCloseWhatsQuery,
    useLazyInitWhatsappQuery, useSendWhatsappMsgMutation,
} = whatsappApi