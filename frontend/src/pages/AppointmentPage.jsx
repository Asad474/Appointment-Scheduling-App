import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import FormContainer from '../components/FormContainer';
import FormButton from '../components/FormButton';
import { useConsultantQuery } from '../slices/consultantApiSlice';
import { useAppointmentDetailsQuery } from '../slices/appointmentApiSlice';
import { useCreateAppointmentMutation } from '../slices/appointmentApiSlice';
import { useUpdateAppointmentMutation } from '../slices/appointmentApiSlice';
import getDate from '../utils/getDate';

const AppointmentPage = () => {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const consultantId = searchParams.get('consultantId');
    const appointmentId = searchParams.get('appointmentId') || 0;

    const { data } = useConsultantQuery(consultantId);
    const { data: appointmentData } = useAppointmentDetailsQuery(appointmentId);
    const [createAppointmentApi] = useCreateAppointmentMutation();
    const [updateAppointmentApi] = useUpdateAppointmentMutation();
    const { current_date } = getDate(new Date());

    useEffect(() => {
        if (appointmentData){
            setDate(appointmentData.date);
            setTime(appointmentData.time);
        }        
    }, [appointmentData]);

    const submitHandler = async(event) => {
        event.preventDefault();

        const { current_day: appointment_day } = getDate(new Date(date));

        if (date.length === 0 || time.length === 0){
            toast.error('All input details are required.')
        } else{
            if (date < current_date){
                toast.error("Date should be greater than or equal to today's date");
                setDate('');
                return;
            } 
            
            if (JSON.parse(data.DaysOff).DaysOff.includes(appointment_day)){
                navigate('/availabilities');
                toast.error(`You cannot make an appointment on ${appointment_day} as Consultant is taking his/her day off.`);
                return;
            };

            for (const obj of JSON.parse(data.breaks).breaks) {
                if (time >= obj.start_time && time <= obj.end_time) {
                    toast.error(`You cannot make an appointment between ${obj.start_time} and ${obj.end_time}`);
                    setDate('');
                    setTime('');
                    return;
                };
            };

            try{
                if (appointmentData){
                    await updateAppointmentApi({
                        id: appointmentData.id,
                        data: {
                            date, 
                            time,
                        }
                    }).unwrap();

                    toast.success('Your appointment has been updated successfully.');
                } else{
                    await createAppointmentApi({
                        date, 
                        time,
                        ConsultantId: data.id,
                    }).unwrap();

                    toast.success('Your appointment has been created successfully.');
                }

                navigate('/myappointments');

            } catch(err){
                toast.error(err?.data?.message || err.error);                
            };
        };
    };

    return (
        <FormContainer>
            <h1>Appointment</h1>
            { data &&
                <Form onSubmit={submitHandler}>
                    <Form.Group className='my-4' id='consultantName'>
                        <Form.Label>Consultant</Form.Label>
                        <Form.Select>
                            <option value={data.userId}>{data.user.name}</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className='my-4' id='dateForm'>
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                            type='date'
                            value={date}
                            onChange={event => setDate(event.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group className='my-2' id='timeForm'>
                        <Form.Label>Time</Form.Label>
                        <Form.Control
                            type='time'
                            value={time}
                            onChange={event => setTime(event.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <FormButton 
                        color={appointmentData ? 'success' : 'primary'} 
                        value={appointmentData ? 'Update' : 'Submit'} 
                    />
                </Form>
            }
        </FormContainer>
    );
};

export default AppointmentPage;