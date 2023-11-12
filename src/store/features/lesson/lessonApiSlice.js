import {apiSlice} from "@/store/api/apiSlice";

export const lessonApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getLesson: builder.query({
            query: (sectionId) => ({
                url: `lessons?sectionId=${sectionId}`,
                method: 'GET'
            }),
            keepUnusedDataFor: 5, // keep unused data in cache for 5 seconds
            providesTags: ["Lesson"], // provideTags are used for updating cache
        }),
        getLessonByUuid: builder.query({
            query: (uuid) => ({
                url: `lessons/by/${uuid}`,
                method: 'GET'
            }),
            keepUnusedDataFor: 5, // keep unused data in cache for 5 seconds
            providesTags: ["Lesson"], // provideTags are used for updating cache
        }),
    }),
});

export const { useGetLessonQuery, useGetLessonByUuidQuery } = lessonApiSlice;