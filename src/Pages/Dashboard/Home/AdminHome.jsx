import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import { Helmet } from 'react-helmet';
import { useQuery } from '@tanstack/react-query';
import useAxiosPrivate from '../../../Hooks/useAxiosPrivate';
import { CatIcon, DogIcon, DollarSignIcon, Users } from 'lucide-react';

const AdminHome = () => {
    const { user } = useAuth()
    const axiosPrivate = useAxiosPrivate()

    const { data: stats } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosPrivate.get('/admin-analytics')
            console.log(res.data)
            return res.data;
        }
    })

    return (
        <div>
            <Helmet><title>PA || DASHBOARD</title></Helmet>
            <h2 className='text-3xl font-semibold mb-3'>
                <span>Hi, Welcome</span>
                {user ? user.displayName : 'Back'}
            </h2>
            <div className="w-full flex items-center justify-evenly gap-3 shadow p-3">
                <div className="bg-gray-200 dark:bg-gray-900 flex items-center gap-5 p-5">
                    <div className="stat-figure text-secondary">
                        <Users className='dark:text-white bg-black' size={40}></Users>
                    </div>
                    <div className='border-l-2 pl-2'>
                        <div className="text-xl">Users</div>
                        <div className="stat-value">{stats.users}K</div>
                        <div className="stat-desc">Jan - Feb</div>
                    </div>
                </div>
                <div className="bg-gray-200 dark:bg-gray-900 flex items-center gap-5 p-5">
                    <div className="stat-figure text-secondary">
                        <DollarSignIcon className='dark:text-white bg-black' size={40}></DollarSignIcon>
                    </div>
                    <div className='border-l-2 pl-2'>
                        <div className="text-xl">Donations</div>
                        <div className="stat-value">{stats.donations}</div>
                        <div className="stat-desc">Jan - Feb</div>
                    </div>
                </div>
                <div className="bg-gray-200 dark:bg-gray-900 flex items-center gap-5 p-5">
                    <div className="stat-figure text-secondary">
                        <CatIcon className='dark:text-white bg-black' size={40}></CatIcon>
                    </div>
                    <div className='border-l-2 pl-2'>
                        <div className="text-xl">Pets Collectoins</div>
                        <div className="stat-value">{stats.pets}K</div>
                        <div className="stat-desc">Jan - Feb</div>
                    </div>
                </div>
                <div className="bg-gray-200 dark:bg-gray-900 flex items-center gap-5 p-5">
                    <div className="stat-figure text-secondary">
                        <DogIcon className='dark:text-white bg-black' size={40}></DogIcon>
                    </div>
                    <div className='border-l-2 pl-2'>
                        <div className="text-xl">Adopts</div>
                        <div className="stat-value">{stats.adopts}K</div>
                        <div className="stat-desc">Jan - Feb</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;