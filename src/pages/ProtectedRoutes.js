import React, {useState} from 'react';
import { Outlet } from 'react-router-dom';
import Login from './Login';

const ProtectedRoutes = (auth) => {            
    return (auth ? <Outlet/>: <Login/>);
}

export default ProtectedRoutes;