import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BaseURL = fetchBaseQuery({
    baseUrl: 'http://localhost:8080',
    credentials: 'include',
});

const apiSlice = createApi({
    baseQuery: BaseURL,    
    endpoints: builder => ({}),
});

export default apiSlice;