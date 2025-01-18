import React from 'react';
import useAuth from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import ButtonLoading from '@/components/components/ui/ButtonLoading';

const PrivateRoute = ({children}) => {
    const { loading, user } = useAuth()
    const loaction = useLocation()

    if(loading) return <ButtonLoading/>
    if(user){
        return children;
    }
    return <Navigate to={'/login'} state={{from:loaction}} replace  ></Navigate>
};

export default PrivateRoute;