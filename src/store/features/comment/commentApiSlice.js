import { apiSlice } from "@/store/api/apiSlice";

export const commentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getComment: builder.query({
      query: (lessonId) => ({
        url: `comments?lessonId=${lessonId}`,
        method: "GET",
      }),
      keepUnusedDataFor: 5, // keep unused data in cache for 5 seconds
      providesTags: ["Comment"], // provideTags are used for updating cache
    }),
    getCommentByLessonId: builder.query({
        query: (lessonId) => ({
          url: `comments/lesson/${lessonId}`,
          method: "GET",
        }),
        keepUnusedDataFor: 5, // keep unused data in cache for 5 seconds
        providesTags: ["Comment"], // provideTags are used for updating cache
      }),
    getCommentLike: builder.query({
      query: (cmtId) => ({
        url: `commentLike?cmtId=${cmtId}`,
        method: "GET",
      }),
      keepUnusedDataFor: 5, // keep unused data in cache for 5 seconds
      providesTags: ["Comment"], // provideTags are used for updating cache
    }),
    getCheckIfLiked: builder.query({
      query: ({ userId, cmtId }) => ({
        url: `commentLike/checkIfLiked?userId=${userId}&cmtId=${cmtId}`,
        method: "GET",
      }),
      keepUnusedDataFor: 5, // keep unused data in cache for 5 seconds
      providesTags: ["Comment"], // provideTags are used for updating cache
    }),
    addComment: builder.mutation({
      query: (body) => ({
      url: `comments`,
      method: "POST",
      body,
      invalidatesTags: ["Comment"],
   }),
  }),
  }),
});

export const {
  useGetCommentQuery,
  useGetCommentLikeQuery,
  useGetCheckIfLikedQuery,
  useGetCommentByLessonIdQuery,
  useAddCommentMutation
} = commentApiSlice;
