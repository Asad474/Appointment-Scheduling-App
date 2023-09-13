import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Calendar from '../components/Calendar';
import { useAvailabilitiesQuery } from '../slices/availabiltyApiSlice';

const HomePage = () => {
  const {data} = useAvailabilitiesQuery();

  return (
    <Container className="my-4">
      <div className='link-container'>
        <Link to="/availabilities" className='link_availability'>Check Consultant availabilities</Link>
      </div>

      <Calendar data={data}/>
    </Container>
  );
};

export default HomePage;