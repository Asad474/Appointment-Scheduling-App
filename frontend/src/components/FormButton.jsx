import React from 'react';
import { Button } from 'react-bootstrap';

const FormButton = props => {
  return (
    <Button type='submit' className='mt-4 form-button' variant={props.color}>
        {props.value}
    </Button>
  );
};

export default FormButton;