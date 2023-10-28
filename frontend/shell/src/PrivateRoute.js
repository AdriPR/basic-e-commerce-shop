import React from 'react';

import {Navigate, Outlet} from 'react-router-dom';

export const PrivateRoute = () => {
    const auth = localStorage.getItem('access_token') !== null && localStorage.getItem('access_token') !== undefined
        && localStorage.getItem('refresh_token') !== null && localStorage.getItem('refresh_token') !== undefined
        && localStorage.getItem('user_email') !== null && localStorage.getItem('user_email') !== undefined
        && localStorage.getItem('user_name') !== null && localStorage.getItem('user_name') !== undefined;

    return auth ? <Outlet/> : <Navigate to="/login"/>;
}