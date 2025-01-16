import Navbar from '@/components/Navbar/Navbar';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Pages/Home/Footer/Footer';

const Main = () => {
    return (
        <div>
            <header>
                <Navbar />
            </header>
            <main className='mt-16'>
                <Outlet />
            </main>
            <footer className='mb-5'>
                <Footer/>
            </footer>
        </div>
    );
};

export default Main;