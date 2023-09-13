import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ConsultantPrivateRoute = () => {
    const {userInfo} = useSelector(state => state.auth);

    return userInfo.isConsultant ? <Outlet /> : <Navigate to="/login" />
};

export default ConsultantPrivateRoute;