import { Button } from '@/components/components/ui/button';
import { CatIcon, Home } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const SideNavbar = () => {
    return (
        <div>
            <ul className="w-56">
                <Button className="w-40 lg:w-64 mb-2"><li className='flex justify-center gap-2'><Home/><Link to={'/'}>Home</Link></li></Button>
                <Button className="w-40 lg:w-64 mb-2"><li className='flex justify-center gap-2'><CatIcon/><Link to={'/dashboard/addPet'}>Add Pet</Link></li></Button>
                <Button className="w-40 lg:w-64 mb-2"><li className='flex justify-center gap-2'><Link to={'/dashboard/addPet'}>Add Pet</Link></li></Button>
                <Button className="w-40 lg:w-64 mb-2"><li className='flex justify-center gap-2'><Link to={'/dashboard/addPet'}>Add Pet</Link></li></Button>
            </ul>
        </div>
    );
};

export default SideNavbar;