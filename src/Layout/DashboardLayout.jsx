import React from 'react';
import { Outlet } from 'react-router-dom';
import SideNavbar from '../Pages/Dashboard/SideNavbar/SideNavbar';
import ToggleMode from '../Providers/Toggle/ToggleMode';
import TopNavbar from '../Pages/Dashboard/topnav/TopNavbar';
import { SidebarProvider, SidebarTrigger, useSidebar } from '@/components/components/ui/sidebar';

const DashboardLayout = () => {
    const { isOpen } = useSidebar(); 

    return (
       
            <div className="min-h-screen flex flex-col dark:bg-gray-800 bg-gray-200">
                {/* Top Navbar */}
                <header className="flex justify-between py-5 px-5 lg:px-10 dark:bg-gray-900 bg-gray-300 shadow-md">
                    <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">
                        Dashboard
                    </h2>
                    <div className="flex items-center gap-5">
                        <TopNavbar />
                        <ToggleMode />
                    </div>
                </header>

                {/* Main Layout */}
                <div className="flex relative">
                    {/* Sidebar */}
                    <aside
                        className={`flex h-full bg-gray-800 text-white shadow-lg transform transition-transform duration-300 ${
                            isOpen ? 'translate-x-full' : ''
                        }`}
                         // Fixed width for the sidebar
                    >
                        <SideNavbar />
                    </aside>

                    {/* Sidebar Trigger */}

                    {/* Main Content */}
                    <div className="absolute right-0">
                        <SidebarTrigger />
                    </div>
                    <main className="flex-1 p-5 dark:text-gray-200 text-gray-800">
                        <Outlet />
                    </main>
                </div>
            </div>
    
    );
};

export default DashboardLayout;
