import Navbar from '@/components/Navbar/Navbar';
import React from 'react';
import { Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <div>
            <header>
                <Navbar />
            </header>
            <main className='mt-16'>
                <Outlet />
            </main>
            <footer>
                footer
            </footer>
        </div>
    );
};

export default Main;