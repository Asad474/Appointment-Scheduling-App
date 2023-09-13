import React, {useState, useEffect} from 'react';
import {Form} from 'react-bootstrap';
import {toast} from 'react-toastify';
import {useSelector, useDispatch} from 'react-redux';

import FormContainer from '../components/FormContainer';
import FormButton from '../components/FormButton';
import { useUpdateProfileMutation } from '../slices/usersApiSlice';
import { setCredential } from '../slices/authSlice';

const ProfilePage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const {userInfo} = useSelector(state => state.auth);

    const [updateProfileApiCall] = useUpdateProfileMutation();

    useEffect(() => {
        setName(userInfo.name);
        setEmail(userInfo.email);
    }, [userInfo.name, userInfo.email]);

    const dispatch = useDispatch();

    const submitHandler = async(event) => {
        event.preventDefault();

        if (password !== confirmPassword){
            toast.error('Password and Confirm Password are not matching with each other.');
        } else{
            try {
                const res = await updateProfileApiCall({name, email, password}).unwrap();
                dispatch(setCredential(res));
                toast.success('Your Profile has been updated successfully.');
            } catch (err) {
                toast.error(err?.data?.message || err.error);                
            }
        };
    }

    return (
        <FormContainer>
            <h1>Update Profile</h1>

            <Form onSubmit={submitHandler}>
                <Form.Group className='my-3' controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Name'
                        value={name}
                        onChange={event => setName(event.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

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

                <Form.Group className='my-3' controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter Confirm Password'
                        value={confirmPassword}
                        onChange={event => setConfirmPassword(event.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <FormButton color='success' value='Update Profile' />
            </Form>
        </FormContainer>
    );
};

export default ProfilePage;