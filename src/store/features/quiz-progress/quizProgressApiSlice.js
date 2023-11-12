import { apiSlice } from "@/store/api/apiSlice";

export const quizProgressApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuizProgressApiSlice: builder.query({
      query: ({ userId, quizId }) => ({
        url: `quizProgresses?userId=${userId}&quizId=${quizId}`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
    getCheckIfTaken: builder.query({
      query: ({ userId, quizId }) => ({
        url: `quizProgresses/isExist?userId=${userId}&quizId=${quizId}`,
        method: "GET",
      }),
    }),
    setIsQuizTaken: builder.mutation({
      query: (body) => ({
        url: `quizProgresses`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
    useGetCheckIfTakenQuery,
    useGetQuizProgressApiSliceQuery,
    useSetIsQuizTakenMutation
} = quizProgressApiSlice;
