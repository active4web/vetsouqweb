/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_URL_API,
    credentials: "include",
})

export const tags = [
    "Auth",
    "StaticPages",
    "Locations",
    "Products",
    "Home",
    "Blogs",
    "ContactUs",
    "Cart",
    "Fav",
    "Search",
    "Checkout",
    "Comments",
]

export const apiSlice = createApi({
    baseQuery,
    tagTypes: tags,
    endpoints: (builder) => ({}),
});