import { apiSlice, tags } from "../../apiSlice";

export const AuthSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (payload) => ({
                url: `/api/login`,
                method: "POST",
                body: payload
            }),
            invalidatesTags: tags
        }),

        register: builder.mutation({
            query: (payload) => ({
                url: `/api/register`,
                method: "POST",
                body: payload
            }),
            invalidatesTags: tags
        }),

        updateProfile: builder.mutation({
            query: (payload) => ({
                url: `/api/editProfile`,
                method: "POST",
                body: payload
            }),
            invalidatesTags: tags
        }),

        logout: builder.mutation({
            query: ({ token, firebase_id }) => ({
                url: `/api/logout`,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: {
                    firebase_token: firebase_id
                }
            }),
            invalidatesTags: tags
        }),

        profile: builder.query({
            query: (token) => ({
                url: `/api/new-user-profile`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            providesTags: ["Auth"]
        }),
    })
})

export const {
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
    useProfileQuery,
    useUpdateProfileMutation
} = AuthSlice;