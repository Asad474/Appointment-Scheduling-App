import React from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useMyAppointmentsQuery } from '../slices/appointmentApiSlice';
import { useDeleteAppointmentMutation } from '../slices/appointmentApiSlice';

const MyAppointmentsPage = () => {
    const { data, refetch } = useMyAppointmentsQuery();
    const [deleteAppointmentApi] = useDeleteAppointmentMutation();
    const navigate = useNavigate();

    const updateHandler = (event, appointment) => {
        event.preventDefault();
        navigate(`/appointment?consultantId=${appointment.Consultant.UserId}&appointmentId=${appointment.id}`);
    };

    const deleteHandler = async(event, appointment) => {
        event.preventDefault();
        const {date, time, Consultant} = appointment;
        await deleteAppointmentApi(appointment.id).unwrap();
        toast.success(`Your appointment with ${Consultant.User.name} at ${time} on ${date} has been deleted successfully.`);

        //Refresh the page after deleting data.
        refetch();
    };

    return (
        <Container className='my-4'>
            <div className='link-container'>
                <Link to="/availabilities" className='link_availability'>+ Create Appointments</Link>
            </div>
            <h1 className='pt-3 text-center'>My Appointments</h1>

            {data &&
                <Table bordered responsive className='mt-4'>
                    <thead>
                        <tr>
                            <th>SNo</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Consultant</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((appointment, index) => (
                            <tr key={index}>
                                <td>{ index + 1 }</td>
                                <td>{ appointment.date }</td>
                                <td>{ appointment.time }</td>
                                <td>{ appointment.Consultant.User.name }</td>
                                <td>
                                    <Button onClick={event => updateHandler(event, appointment)} variant='success'>
                                        Update
                                    </Button>
                                </td>
                                <td>
                                    <Button onClick={event => deleteHandler(event, appointment)} variant='danger'>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            }
        </Container>  
    );
};

export default MyAppointmentsPage;