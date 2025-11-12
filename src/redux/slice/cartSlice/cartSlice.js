import { apiSlice } from "../../apiSlice";

export const cartSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCart: builder.query({
            query: ({ lang, token, firebase_token }) => ({
                url: `/api/myCartWeb?lang=${lang}&firebase_id=${firebase_token}`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            providesTags: ["Cart"]
        }),

        addToCart: builder.mutation({
            query: ({ token, payload }) => ({
                url: `/api/AddToCartWeb`,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: payload
            }),
            invalidatesTags: ["Cart"]
        }),

        delFromCart: builder.mutation({
            query: ({ token, id, firebase_token }) => ({
                url: `/api/deleteItemCartWeb?id=${id}&firebase_id=${firebase_token}`,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            invalidatesTags: ["Cart"]
        }),

        addToFav: builder.mutation({
            query: ({ token, id }) => ({
                url: `/api/FavProduct`,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: { product_id: id }
            }),
            invalidatesTags: ["Fav"]
        }),

        getFav: builder.query({
            query: (token) => ({
                url: `/api/AllFavProduct`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            providesTags: ["Fav"]
        }),
    })
})

export const {
    useGetCartQuery,
    useAddToCartMutation,
    useDelFromCartMutation,
    useAddToFavMutation,
    useGetFavQuery
} = cartSlice;