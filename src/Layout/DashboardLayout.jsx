import React from 'react';
import { Outlet } from 'react-router-dom';
import SideNavbar from '../Pages/Dashboard/SideNavbar/SideNavbar';
import ToggleMode from '../Providers/Toggle/ToggleMode';

const DashboardLayout = () => {
    return (
        <div>
            <div className='flex justify-between py-5 lg:-mx-10 lg:px-10 dark:bg-gray-700 bg-gray-300'>
            <h2 className='text-3xl font-semibold'>Dashobard</h2>
            <ToggleMode/>
            </div>
            <div className='grid grid-cols-12'>
                <aside className='col-span-3 p-5 dark:bg-gray-700 bg-gray-300 min-h-screen'>
                    side navbar
                    <SideNavbar />
                </aside>
                <main className='col-span-9 p-5'>
                    content will be here
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;