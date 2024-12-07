import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://142.93.173.254:5000' }),
    endpoints: builder => ({}),
    tagTypes:['events', 'userEvents','notificationOut','notificationIn','places'],
    keepUnusedDataFor: 5,
});

export default apiSlice;