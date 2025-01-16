import React from 'react';
import icon from '../../../assets/pet-adoption.webp'

const Footer = () => {
    return (
        <footer className="dark:bg-gray-800 dark:text-white p-3">
            <div className="container mx-auto flex flex-col md:flex-row justify-evenly items-center">
                <div>
                    <img className='w-32' src={icon} alt="" />
                </div>
                <div className="mb-4 md:mb-0">
                    <h2 className="text-2xl font-bold">Pet Adoption</h2>
                    <p className="mt-1">Connecting pets with loving homes</p>
                </div>
                <div className="flex flex-col items-center">
                    <ul className="flex mb-4 md:mb-0 md:mr-6">
                        <li className="mr-4"><a href="/about" className="hover:underline">About Us</a></li>
                        <li className="mr-4"><a href="/contact" className="hover:underline">Contact</a></li>
                        <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
                    </ul>
                    <div className="text-sm">&copy; {new Date().getFullYear()} Pet Adoption. All rights reserved.</div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
