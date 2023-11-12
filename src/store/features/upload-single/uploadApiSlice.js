import { apiSlice } from "@/store/api/apiSlice";

export const uploadSingleApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadSingle: builder.mutation({
      query: (data) => ({
        URL: "files",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["UploadSingle"],
    }),
  }),
});
// auto generated hooks for uploadSingle mutation (POST)
export const { useUploadSingleMutation } = uploadSingleApiSlice;
