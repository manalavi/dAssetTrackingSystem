import React from 'react';
import { Navigate } from 'react-router-dom';

const Logout = () => {
    localStorage.removeItem("token");    
    return (
        <>
        console.log("logout");
        <Navigate to="/login"/>
        </>
    );
}

export default Logout;