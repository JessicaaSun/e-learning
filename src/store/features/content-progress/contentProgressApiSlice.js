import { apiSlice } from "@/store/api/apiSlice";

export const contentProgressApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getContentProgressApiSlice: builder.query({
      query: ({ userId, contentId }) => ({
        url: `contentProgresses?userId=${userId}&contentId=${contentId}`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
    getCheckIfRead: builder.query({
      query: ({ userId, contentId }) => ({
        url: `contentProgresses/isExist?userId=${userId}&contentId=${cmtId}`,
        method: "GET",
      }),
    }),
    setIsContentRead: builder.mutation({
      query: (body) => ({
        url: `contentProgresses`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetCheckIfReadQuery,
  useGetContentProgressApiSliceQuery,
  useSetIsContentReadMutation,
} = contentProgressApiSlice;
