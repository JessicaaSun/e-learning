import { apiSlice } from "@/store/api/apiSlice";

export const userProgressApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInProgressCourses: builder.query({
      query: (userId) => ({
        url: `userProgress/inProgress/${userId}`,
        method: "GET",
      }),
      keepUnusedDataFor: 5, // keep unused data in cache for 5 seconds
      providesTags: ["UserProgress"], // provideTags are used for updating cache
    }),
    getCompletedCourses: builder.query({
      query: (userId) => ({
        url: `userProgress/completed/${userId}`,
        method: "GET",
      }),
      keepUnusedDataFor: 5, // keep unused data in cache for 5 seconds
      providesTags: ["UserProgress"], // provideTags are used for updating cache
    }),
    checkIfComplete: builder.query({
      query: (userId, courseId) => ({
        url: `userProgress/isCourseComplete/${userId}/${courseId}`,
        method: "GET",
      }),
      keepUnusedDataFor: 5, // keep unused data in cache for 5 seconds
      providesTags: ["UserProgress"], // provideTags are used for updating cache
    }),
  }),
});

export const {
  useGetInProgressCoursesQuery,
  useGetCompletedCoursesQuery,
  useCheckIfCompleteQuery,
} = userProgressApiSlice;
