import apiSlice from "./apiSlice";

const APPOINTMENT_URL='/api/appointment';

const appointmentApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        myAppointments: builder.query({
            query: () => ({
                url: APPOINTMENT_URL,
                method: 'GET',
            }),
        }),

        AppointmentDetails: builder.query({
            query: id => ({
                url: `${APPOINTMENT_URL}/${id}`,
                method: 'GET',
            }),
        }),

        createAppointment: builder.mutation({
            query: data => ({
                url: `${APPOINTMENT_URL}/create`,
                method: 'POST',
                body: data,
            }),
        }),

        updateAppointment: builder.mutation({
            query: ({id, data}) => ({
                url: `${APPOINTMENT_URL}/update/${id}`,
                method: 'PUT',
                body: data,
            }),
        }),

        deleteAppointment: builder.mutation({
            query: id => ({
                url: `${APPOINTMENT_URL}/delete/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useMyAppointmentsQuery,
    useAppointmentDetailsQuery,
    useCreateAppointmentMutation,
    useUpdateAppointmentMutation,
    useDeleteAppointmentMutation,
} = appointmentApiSlice;