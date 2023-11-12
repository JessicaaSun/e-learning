import { apiSlice } from "@/store/api/apiSlice";

export const quizApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createQuizAnswer: builder.mutation({
      query: (body) => ({
        url: `quizOption`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Quiz"], // invalidatesTags are used for updating cache
    }),
  }),
});

// auto generated hooks for getUser query (GET)
export const { useCreateQuizAnswerMutation } = quizApiSlice;
