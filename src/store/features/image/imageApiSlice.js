import { apiSlice } from "@/store/api/apiSlice";
export const ImageApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllImages: builder.query({
          query: (page,limit) => `image?page=${page}&limit=${limit}`,
          invalidatesTags: ['Images'],
        }),
        getImageById: builder.query({
          query: (id) => `image/${id}`,
        }),
        removeImageById: builder.mutation({
          query: (id) => ({
            url: `image/${id}`,
            method: "DELETE",
        }),
        }),
        updateImageById: builder.mutation({
            query: (id,credentials) => ({
            url: `image/${id}`,
            method: "PUT",
            body:{...credentials}
         }),
        }),
        addImageByName: builder.mutation({
            query: (credentials) => ({
            url: `image`,
            method: "POST",
            body:{...credentials}
         }),
        }),
    }),
  });
export const { 
  useGetAllImagesQuery ,
  useGetImageByIdQuery,
  useRemoveImageByIdMutation,
  useUpdateImageByIdMutation,
  useAddImageByNameMutation ,
} = ImageApiSlice;