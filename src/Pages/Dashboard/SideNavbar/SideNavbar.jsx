import { Button } from '@/components/components/ui/button';
import React from 'react';
import { Link } from 'react-router-dom';

const SideNavbar = () => {
    return (
        <div>
            <ul className="w-56">
                <Button className="w-40 lg:w-64 mb-2"><li><Link to={'/dashboard/addPet'}>Add Pet</Link></li></Button>
                <Button className="w-40 lg:w-64 mb-2"><li><Link to={'/dashboard/addPet'}>Add Pet</Link></li></Button>
                <Button className="w-40 lg:w-64 mb-2"><li><Link to={'/dashboard/addPet'}>Add Pet</Link></li></Button>
                <Button className="w-40 lg:w-64 mb-2"><li><Link to={'/dashboard/addPet'}>Add Pet</Link></li></Button>
            </ul>
        </div>
    );
};

export default SideNavbar;