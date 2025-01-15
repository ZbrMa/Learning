import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store/reduxStore';

const PRODUCTION_SERVER_URL = 'https://api.buskup.com';
const DEV_SERVER_URL = 'http://localhost:5000';

const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: PRODUCTION_SERVER_URL, prepareHeaders:(headers, { getState }) => {
        const lang = (getState() as RootState).lang.lang;
        headers.set("Language", lang);
        return headers; }}),
    endpoints: builder => ({}),
    tagTypes:['events', 'userEvents','notificationOut','notificationIn','places'],
    keepUnusedDataFor: 120,
});

export default apiSlice;