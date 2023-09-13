import apiSlice from "./apiSlice";

const AVAILABILITY_URL = '/api/availabilities';

const availabilitiyApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        availabilities: builder.query({
            query: () => ({
                url: AVAILABILITY_URL,
                method: 'GET',
            }),
        }),
    }),
});

export const {useAvailabilitiesQuery} = availabilitiyApiSlice;