import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.BAKCNED_URL }),
    endpoints: builder => ({}),
    tagTypes:['events', 'userEvents','notificationOut','notificationIn','places'],
    keepUnusedDataFor: 5,
});

export default apiSlice;