import { apiSlice } from "../../apiSlice";

export const homeSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        homePage: builder.query({
            query: (lang) => ({
                url: `/api/home?lang=${lang}`,
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

        socialMedia: builder.query({
            query: () => ({
                url: `/api/contacts`,
                method: "GET",
            }),
            providesTags: ["Home"]
        }),

        ourTeam: builder.query({
            query: (lang) => ({
                url: `/api/our_team?lang=${lang}`,
                method: "GET",
            }),
            providesTags: ["Home"]
        }),
    })
})

export const {
    useHomePageQuery,
    useServicesQuery,
    useSocialMediaQuery,
    useOurTeamQuery
} = homeSlice;