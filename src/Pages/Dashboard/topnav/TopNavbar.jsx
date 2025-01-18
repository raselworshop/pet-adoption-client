import React from 'react';

const TopNavbar = () => {
    return (
        <div>
            <div className="dark:bg-gray-900 dark:text-white flex justify-between p-4">
                <div className="flex gap-2">
                    <button>Search</button>
                    <button>Notifications</button>
                    <button>Logout</button>
                </div>
            </div>
        </div>
    );
};

export default TopNavbar;