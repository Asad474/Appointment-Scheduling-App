import React from 'react';
import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap';
import {FaSignInAlt, FaSignOutAlt} from 'react-icons/fa';
import {useNavigate} from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap';
import {useSelector, useDispatch} from 'react-redux';
import {toast} from 'react-toastify';

import {useLogoutMutation} from '../slices/usersApiSlice';
import { removeCredential } from '../slices/authSlice';

const Header = () => {
    const {userInfo} = useSelector(state => state.auth);

    const [logoutApiCall] = useLogoutMutation();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logoutHandler = async(event) => {
        event.preventDefault();

        try{
            await logoutApiCall().unwrap();
            dispatch(removeCredential());
            navigate('/');
        } catch(err){
            toast.error(err?.data?.message || err.error);
        }
    }

    return (
        <header>
            <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>
                            Appointment Scheduling App
                        </Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className="ms-auto">
                            {userInfo
                            ? (
                                <>
                                    <LinkContainer to="/myappointments">
                                        <Nav.Link>My Appointments</Nav.Link>
                                    </LinkContainer>

                                    <LinkContainer to="/availabilities">
                                        <Nav.Link>Consultant Availabilties</Nav.Link>
                                    </LinkContainer>

                                    {userInfo.isConsultant && 
                                        <LinkContainer to="/consultant">
                                            <Nav.Link>Consultant Info</Nav.Link>
                                        </LinkContainer>
                                    }

                                    <NavDropdown title={userInfo.name} id='username'>
                                        <LinkContainer to="/profile">
                                            <NavDropdown.Item>
                                                My Profile
                                            </NavDropdown.Item>
                                        </LinkContainer>

                                        <LinkContainer to="/logout">
                                            <NavDropdown.Item onClick={logoutHandler}>
                                                Logout
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                    </NavDropdown>
                                </>
                            ) : (
                                <>                      
                                    <LinkContainer to="/login">
                                        <Nav.Link>
                                            <FaSignInAlt /> Sign In
                                        </Nav.Link>
                                    </LinkContainer>

                                    <LinkContainer to="/register">
                                        <Nav.Link>
                                            <FaSignOutAlt /> Sign Up                            
                                        </Nav.Link>                                    
                                    </LinkContainer>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;