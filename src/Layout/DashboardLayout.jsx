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
    <div className="w-full flex dark:bg-gray-900 bg-gray-200">
      <div className="flex">
        <SideNavbar className="bg-sky-800" />
        <SidebarTrigger className="" />
      </div>
      <div className="w-full">
        <div className="flex items-center justify-evenly dark:bg-gray-900 bg-gray-300">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">
            Dashboard
          </h2>
          <div className="flex items-center">
            <TopNavbar />
            <ToggleMode />
          </div>
          <div className="w-10 h-10">
            <img src={user?.photoURL} alt="user" />
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
