import React from 'react';
import { Helmet } from 'react-helmet';
import useAuth from '../../../Hooks/useAuth';

const UserHome = () => {
    const { user } = useAuth()
    return (
        <div>
            <Helmet><title>PA || DASHBOARD</title></Helmet>
            <h2 className='text-3xl font-semibold'>
                <span>Hi, Welcome</span> 
                {user? user.displayName : "Back"}
            </h2>
            <p className='text-center'>User Details coming soon</p>
        </div>
    );
};

export default UserHome;