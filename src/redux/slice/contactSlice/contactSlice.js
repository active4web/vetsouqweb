import { apiSlice } from "../../apiSlice";

export const contactSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        contactUs: builder.mutation({
            query: (payload) => ({
                url: `/api/contactUs`,
                method: "POST",
                body: payload
            }),
            invalidatesTags: ["ContactUs"]
        }),
    })
})

export const {
    useContactUsMutation
} = contactSlice;