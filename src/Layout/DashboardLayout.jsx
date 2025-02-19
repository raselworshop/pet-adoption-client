import React from "react";
import { Outlet } from "react-router-dom";
import SideNavbar from "../Pages/Dashboard/SideNavbar/SideNavbar";
import ToggleMode from "../Providers/Toggle/ToggleMode";
import TopNavbar from "../Pages/Dashboard/topnav/TopNavbar";
import { SidebarTrigger, useSidebar } from "@/components/components/ui/sidebar";
import useAuth from "../Hooks/useAuth";

const DashboardLayout = () => {
  const { isOpen } = useSidebar();
  const { user } = useAuth();

  return (
    <div className="flex dark:bg-gray-900 bg-gray-200">
      <div className="relative">
        <SideNavbar className="bg-sky-800" />

        <div className="absolute md:left-56 top-4 z-50">
          <SidebarTrigger />
        </div>
      </div>
      <div className="w-full">
        {/* this sect is navbar need to position fixed */}
        <div className="fixed top-0 z-40 w-full">
          <div className="flex items-center justify-between py-4 lg:py-0 dark:bg-sky-900 bg-gray-300">
            <h2 className="ml-8 text-3xl font-semibold text-gray-800 dark:text-gray-200">
              Dashboard
            </h2>
            <div className="flex items-center">
              <TopNavbar />
              <ToggleMode />
            </div>
            <div className="w-10 h-10">
              <img src={user?.photoURL} alt="user" className="rounded-full" />
            </div>
          </div>
        </div>
        {/* other pages to show from navbar */}
        <div className="mt-16">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
