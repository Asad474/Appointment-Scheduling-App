import React, { useState, useEffect } from 'react';
import { Form, Col, Button, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import FormContainer from '../components/FormContainer';
import FormButton from '../components/FormButton';
import { useCreateConsultantMutation } from '../slices/consultantApiSlice';
import { useConsultantQuery } from '../slices/consultantApiSlice';
import { useUpdateConsultantMutation } from '../slices/consultantApiSlice';

const ConsultantPage = () => {
    const { userInfo } = useSelector(state => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!userInfo.isConsultant){
            navigate('/');
            toast.error('This form is only available for Consultant');
        };
    });

    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [daysOff, setDaysOff] = useState('');
    const [breaks, setBreaks] = useState([{ start_time: '', end_time: '' }]);

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const [createConsultantApi] = useCreateConsultantMutation();
    const [updateConsultantApi] = useUpdateConsultantMutation();

    const {data} = useConsultantQuery(userInfo.id);

    useEffect(() => {
        if (data){
            setStartTime(data.start_time);
            setEndTime(data.end_time);
            setDaysOff(JSON.parse(data.DaysOff).DaysOff);
            setBreaks(JSON.parse(data.breaks).breaks);
        }    
    }, [data]);
    
    const addBreak = () => {
        setBreaks([...breaks, { start_time: '', end_time: '' }]);
    };

    const removeBreak = (index) => {
        const newBreaks = breaks.filter((_, i) => i !== index);
        setBreaks(newBreaks);
    };

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const newBreaks = [...breaks];
        newBreaks[index][name] = value;
        setBreaks(newBreaks);
    };

    const submitHandler = async(event) => {
        event.preventDefault();

        if (startTime > endTime){
            toast.error('End Time should be greater than Start Time');
        } else if (breaks.some(breakItem => breakItem.start_time > breakItem.end_time)) {
            toast.error('End Time should be greater than Start Time');
        } else{
            try{
                if (data){
                    await updateConsultantApi({
                        start_time: startTime,
                        end_time: endTime,
                        breaks: JSON.stringify({breaks}),
                        DaysOff: JSON.stringify({DaysOff: daysOff}),
                    }).unwrap();

                    toast.success('Consulant details have been updated successfully.');
                } else{
                    await createConsultantApi({
                        start_time: startTime,
                        end_time: endTime,
                        breaks: JSON.stringify({breaks}),
                        DaysOff: JSON.stringify({DaysOff: daysOff}),
                    }).unwrap();

                    toast.success('Consulant details have been created successfully.');
                }    
                navigate('/');
            } catch(err){
                toast.error(err?.data?.message || err.error);
            };
        };
    };

    return (
        <FormContainer>
            <h1>Consultant Availability</h1>

            <Form onSubmit={submitHandler}>
                <Form.Group className='my-4' controlId='startTimeForm'>
                    <Form.Label className='fs-5'>Start Time</Form.Label>
                    <Form.Control
                        type='time'
                        value={startTime}
                        onChange={event => setStartTime(event.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group className='my-4' controlId='endTimeForm'>
                    <Form.Label className='fs-5'>End Time</Form.Label>
                    <Form.Control
                        type='time'
                        value={endTime}
                        onChange={event => setEndTime(event.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group className="my-4" controlId="daysOffForm">
                    <Form.Label className='fs-5'>Days Off</Form.Label>
                    <div style={{display: 'flex', flexWrap: 'wrap', gap: '10px', marginLeft: '15px'}}>
                        {days.map((day, index) => (
                            <Form.Check
                                key={index}
                                type="checkbox"
                                label={day}
                                checked={daysOff.includes(day)}
                                onChange={(event) => {
                                    if (event.target.checked) {
                                        setDaysOff([...daysOff, day]);
                                    } else {
                                        setDaysOff(daysOff.filter((d) => d !== day));
                                    };
                                }}
                            />
                        ))}
                    </div>
                </Form.Group>

                <Form.Group className="my-4" controlId="breaksForm">
                    <Form.Label className='fs-5'>Breaks</Form.Label>

                    {breaks.map((breakingHour, index) => (
                        <div key={index} style={{marginLeft: '15px'}}>
                            <Row>
                                <Col>
                                    <Form.Group className='my-2'>
                                        <Form.Label>Start Time:</Form.Label>
                                        <Form.Control
                                            type="time"
                                            name="start_time"
                                            value={breakingHour.start_time}
                                            onChange={(e) => handleInputChange(index, e)}
                                            required
                                        />
                                    </Form.Group>
                                </Col>

                                <Col>
                                    <Form.Group className='my-2'>
                                        <Form.Label>End Time:</Form.Label>
                                        <Form.Control
                                            type="time"
                                            name="end_time"
                                            value={breakingHour.end_time}
                                            onChange={(e) => handleInputChange(index, e)}
                                            required
                                        />
                                    </Form.Group>
                                </Col>

                                <Col>
                                    <Button variant="danger" onClick={() => removeBreak(index)} className='my-4'>
                                        Remove
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    ))}

                    <Button variant="success" onClick={addBreak} className='m-4'>
                        Add Breaking Hour
                    </Button>
                </Form.Group>

                <FormButton 
                    color={data ? 'success' : 'primary'} 
                    value={data ? 'Update' : 'Submit'}
                />

            </Form>
        </FormContainer>
    );
};

export default ConsultantPage;