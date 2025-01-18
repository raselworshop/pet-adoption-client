import { Button } from '@/components/components/ui/button';
import { CatIcon, Dog, Home } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const SideNavbar = () => {
    return (
        <div>
            <ul className="w-full">
                <Button className="w-40 lg:w-64 mb-2"><li><Link className='flex justify-center gap-2' to={'/'}><Home/>Home</Link></li></Button>
                <Button className="w-40 lg:w-64 mb-2"><li><Link className='flex justify-center gap-2' to={'/dashboard/addPet'}><CatIcon/>Add Pet</Link></li></Button>
                <Button className="w-40 lg:w-64 mb-2"><li><Link className='flex justify-center gap-2' to={'/dashboard/myPets'}><Dog/> My Pet</Link></li></Button>
                <Button className="w-40 lg:w-64 mb-2"><li><Link className='flex justify-center gap-2' to={'/dashboard/addPet'}>Add Pet</Link></li></Button>
            </ul>
        </div>
    );
};

export default SideNavbar;