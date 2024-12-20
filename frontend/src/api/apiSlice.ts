import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const PRODUCTION_SERVER_URL = 'https://api.buskup.com';
const DEV_SERVER_URL = 'http://localhost:5000';

const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: PRODUCTION_SERVER_URL }),
    endpoints: builder => ({}),
    tagTypes:['events', 'userEvents','notificationOut','notificationIn','places'],
    keepUnusedDataFor: 120,
});

export default apiSlice;