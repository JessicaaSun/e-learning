import { apiSlice } from "@/store/api/apiSlice";

export const certificateApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCertificate: builder.query({
            query: () => ({
                url: "certificates",
            method: "GET"
            }),
            keepUnusedDataFor: 5, // keep unused data in cache for 5 seconds
            providesTags: ["Certificate"], // provideTags are used for updating cache 
        }),
        getCertificateByUuid: builder.query({
            query: (uuid) => ({
                url: "certificates/by/${uuid}",
                method: "GET"
            }),
            keepUnusedDataFor: 5, // keep unused data in cache for 5 seconds
            providesTags: ["Certificate"], // provideTags are used for updating cache 
        }),
        getCertificateByUserId: builder.query({
            query: (id) => ({
                url: `certificates/${id}`,
                method: "GET"
        }),
        keepUnusedDataFor: 5, // keep unused data in cache for 5 seconds
            providesTags: ["Certificate"], // provideTags are used for updating cache  
    }),
    }),
});
export const {useGetCertificateQuery, useGetCertificateByUuidQuery, useGetCertificateByUserIdQuery} = certificateApiSlice;
