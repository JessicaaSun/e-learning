import {apiSlice} from "@/store/api/apiSlice";

export const sectionApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSection: builder.query({
            query: (courseId) => ({
                url: `sections?courseId=${courseId}`,
                method: 'GET'
            }),
            keepUnusedDataFor: 5, // keep unused data in cache for 5 seconds
            providesTags: ["Section"], // provideTags are used for updating cache
        }),
    }),
});

export const { useGetSectionQuery } = sectionApiSlice;