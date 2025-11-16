import { apiSlice } from "../../apiSlice";

export const homeSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        banners: builder.query({
            query: (lang) => ({
                url: `/api/banners?lang=${lang}`,
                method: "GET",
            }),
            providesTags: ["Home"]
        }),

        services: builder.query({
            query: (lang) => ({
                url: `/api/details-services?lang=${lang}`,
                method: "GET",
            }),
            providesTags: ["Home"]
        }),

        partners: builder.query({
            query: (lang) => ({
                url: `/api/partners?lang=${lang}`,
                method: "GET",
            }),
            providesTags: ["Home"]
        }),
    })
})

export const {
    useServicesQuery,
    useBannersQuery,
    usePartnersQuery
} = homeSlice;