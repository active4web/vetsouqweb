import { apiSlice } from "../../apiSlice";

export const chexkOutSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        makeOrder: builder.mutation({
            query: ({ token, payload }) => ({
                url: `/api/make_order`,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: payload
            }),
            invalidatesTags: ["Checkout"]
        }),
    })
})

export const {
    useMakeOrderMutation
} = chexkOutSlice;