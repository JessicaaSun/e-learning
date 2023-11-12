import { apiSlice } from "@/store/api/apiSlice";

export const courseApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: (limit) => ({
        url: `courses?limit=${limit}`,
        method: "GET",
      }),
      keepUnusedDataFor: 5, // keep unused data in cache for 5 seconds
      providesTags: ["Course"], // provideTags are used for updating cache
    }),
  }),
});

export const { useGetCoursesQuery } = courseApiSlice;
