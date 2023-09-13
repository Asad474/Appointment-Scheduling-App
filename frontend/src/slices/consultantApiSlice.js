import apiSlice from "./apiSlice";

const CONSULTANT_URL='/api/consultant';

const consultantApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        consultant: builder.query({
            query: id => ({
                url: `${CONSULTANT_URL}/${id}`,
                method: 'GET',
            }),
        }),

        createConsultant: builder.mutation({
            query: data => ({
                url: `${CONSULTANT_URL}/availability`,
                method: 'POST',
                body: data,
            }),
        }),

        updateConsultant: builder.mutation({
            query: data => ({
                url: `${CONSULTANT_URL}/availability`,
                method: 'PUT',
                body: data,
            }),
        }),
    }),
});

export const {
    useConsultantQuery,
    useCreateConsultantMutation,
    useUpdateConsultantMutation,
} = consultantApiSlice;