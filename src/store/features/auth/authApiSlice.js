// this the extended slice for auth
import { apiSlice } from "@/store/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // build.mutation is used for POST, PUT, DELETE
    login: builder.mutation({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
     // Mutation for register
     register: builder.mutation({
        query: (userData) => ({
          url: "auth/register",
          method: "POST",
          body: { ...userData },
        }),
      }),
      verify: builder.mutation({
        query: (email) => ({
          url: `auth/verify?email=${email}`,
          method: "POST",
        })
      }),
      checkVerify: builder.mutation({
        query: ({ email, verifiedCode }) => ({
            url: 'auth/check-verify',
            method: 'GET',
            params: {
                email,
                verifiedCode,
            },
        }),
    }),
  }),
});
// auto generated hooks for login mutation
export const { useLoginMutation, useRegisterMutation, useVerifyMutation, useCheckVerifyMutation } = authApiSlice;
