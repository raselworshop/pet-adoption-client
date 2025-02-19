import Navbar from '@/components/Navbar/Navbar';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Pages/Home/Footer/Footer';

const Main = () => {
    return (
        <div>
            <header className='max-w-screen-xl mx-auto'>
                <Navbar />
            </header>
            <main className='mt-16 max-w-screen-xl mx-auto'>
                <Outlet />
            </main>
            <footer className='w-full'>
                <Footer/>
            </footer>
        </div>
    );
};

export default Main;