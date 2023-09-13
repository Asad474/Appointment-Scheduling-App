import React from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { useAvailabilitiesQuery } from '../slices/availabiltyApiSlice';

const AvailabilityPage = () => {
  const {data} = useAvailabilitiesQuery();
  const navigate = useNavigate();

  const appointmentHandler = (event, consultant) => {
    event.preventDefault();
    navigate(`/appointment?consultantId=${consultant.UserId}`);
  };

  return (
    <Container className='my-4'>
      <h1 className='pt-3 text-center'>Consultant Availabilties</h1>

      {data &&
        <Table bordered responsive className='mt-4'>
          <thead>
            <tr>
              <th>SNo</th>
              <th>Consultant</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>DaysOff</th>
              <th>Breaks</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {data.map((consultant, index) => (
              <tr key={index}>
                <td>{ index + 1 }</td>
                <td>{ consultant.User.name }</td>
                <td>{ consultant.start_time }</td>
                <td>{ consultant.end_time }</td>
                <td>{ consultant.DaysOff }</td>
                <td>{ consultant.breaks }</td>
                <td>
                  <Button onClick={event => appointmentHandler(event, consultant)}>
                    Appointment
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

export default AvailabilityPage;