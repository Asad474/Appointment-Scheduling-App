import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Form, Row, Col} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';

import FormContainer from '../components/FormContainer';
import FormButton from '../components/FormButton';
import {useLoginMutation} from '../slices/usersApiSlice';
import { setCredential } from '../slices/authSlice';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loginApiCall] = useLoginMutation();

    const {userInfo} = useSelector(state => state.auth);

    useEffect(() => {
        if (userInfo){
            navigate('/');
        }
    }, [userInfo, navigate]);

    const submitHandler = async(event) => {
        event.preventDefault();
        
        try {
            const res = await loginApiCall({email, password}).unwrap();
            dispatch(setCredential(res));
        } catch(err) {            
            toast.error(err?.data?.message || err.error);
        };
    }

    return (
        <FormContainer>
            <h1>Sign In</h1>

            <Form onSubmit={submitHandler}>
                <Form.Group className='my-3' controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group className='my-3' controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <FormButton color='primary' value='Sign In' />

                <Row className='py-3'>
                    <Col>
                        New User ? <Link to='/register'>Register</Link>   
                    </Col>
                </Row>
            </Form>
        </FormContainer>
    );
};

export default LoginPage;