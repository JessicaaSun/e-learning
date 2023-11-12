import { apiSlice } from "@/store/api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => `auth/me`,
      keepUnusedDataFor: 5, // keep unused data in cache for 5 seconds
      providesTags: ["User"], // provideTags are used for updating cache
    }),
    getAllUsers: builder.query({
      query: (email) => `user?email=${email}`,
      keepUnusedDataFor: 5, // keep unused data in cache for 5 seconds
      providesTags: ["User"], // provideTags are used for updating cache
    }),
    getUserByEmail: builder.query({
      query: ({userEmail}) => `user/email?email=${userEmail}`,
    }), 
    getUserById: builder.query({
      query: (id) => `user/${id}`,
      keepUnusedDataFor: 5, // keep unused data in cache for 5 seconds
      providesTags: ["User"], // provideTags are used for updating cache
    }),
    createUser: builder.mutation({
      query: (body) => ({
        url: `user`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"], // invalidatesTags are used for updating cache
    }),
    updateUser: builder.mutation({
      query: ({ uuid, data }) => ({
        url: `user/${uuid}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (uuid) => ({
        url: `user/${uuid}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    updatePasswordById: builder.mutation({
      query: ({id,data}) => ({
      url: `user/${id}/change-password`,
      method: "PUT",
      body:data
    }),
    }),
    updateProfile: builder.mutation({
      query: ({uuid,data}) => ({
        url: `user/${uuid}/update-profile-client`,
        method: "PUT",
        body: data
      }),
      invalidatesTags: ["User"],
    }),
    // createRequestWithGoogle: builder.mutation({
    //   query: (google) => ({
    //     url: "auth/register-google",
    //     method: "POST",
    //     body: google,
    //   }),
    //   invalidatesTags: ["requestGoogle"],
    // }),
    // getRequestUserGoogle: builder.query({
    //   query: (email) => `auth/me-google/${email}`,
    //   providesTags: ["requestUserGoogle"],
    // }),
    // createRequestWithGithub: builder.mutation({
    //   query: (github) => ({
    //     url: "auth/register-github",
    //     method: "POST",
    //     body: github,
    //   }),
    //   invalidatesTags: ["requestGoogle"],
    // }),
    // getRequestUserGithub: builder.query({
    //   query: (email) => `auth/me-github/${email}`,
    //   providesTags: ["requestUserGithub"],
    // }),
    createRequestSendMail: builder.mutation({
      query: (mail) => ({
        url: "auth/send-mail",
        method: "POST",
        body: mail,
      }),
      invalidatesTags: ["requestMail"],
    }),
    updateRequestForgotPassword: builder.mutation({
      query: ({ uuid, ...password}) => ({
        url: `auth/forgot-password/${uuid}`,
        method: "PUT",
        body: password,
      }),
      invalidatesTags: ["requestPassword"],
    }),
    }),
  });

// auto generated hooks for getUser query (GET)
export const {
  useGetUserQuery,
  useGetAllUsersQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useGetUserByEmailQuery,
  useUpdatePasswordByIdMutation,
  // useCreateRequestWithGithubMutation, 
  // useCreateRequestWithGoogleMutation,
  // useGetRequestUserGoogleQuery,
  // useGetRequestUserGithubQuery,
  useUpdateRequestForgotPasswordMutation,
  useCreateRequestSendMailMutation

} = userApiSlice;