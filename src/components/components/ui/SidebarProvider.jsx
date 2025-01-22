import React, { createContext, useContext, useState } from 'react';
import { GoSidebarExpand } from "react-icons/go";

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => setIsOpen((prev) => !prev);

    return (
        <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => useContext(SidebarContext);

export const SidebarTrigger = () => {
    const { toggleSidebar } = useSidebar();

    return (
        <button
            onClick={toggleSidebar}
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
            <GoSidebarExpand />
        </button>
    );
};
