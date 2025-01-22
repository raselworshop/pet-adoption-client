import { Button } from '@/components/components/ui/button';
import { CatIcon, HomeIcon, Users } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const TopNavbar = () => {
    return (
        <div>
            <div className="dark:bg-gray-900 dark:text-white flex justify-between p-4">
                <ul className="flex gap-2">
                    <Button><li><Link className='flex justify-start gap-2' to={'/'}><HomeIcon/>Home</Link></li></Button>
                    <Button><li><Link className='flex justify-start gap-2' to={'/dashboard/userManagement'}><Users/>User Mangement</Link></li></Button>
                    <Button><li><Link className='flex justify-start gap-2' to={'/dashboard/petManagement'}><CatIcon/>Pets Mangement</Link></li></Button>

                    <button>Notifications</button>
                    <button>Logout</button>
                </ul>
            </div>
        </div>
    );
};

export default TopNavbar;