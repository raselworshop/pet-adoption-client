import { Button } from '@/components/components/ui/button';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { BackpackIcon, CatIcon, Dog, ForwardIcon, Home, NotebookIcon, Users } from 'lucide-react';
import React from 'react';
import { IoCreateSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import useAdmin from '../../../Hooks/useAdmin';

const SideNavbar = () => {
    const [isAdmin] = useAdmin()
    return (
        <div>
            <ul className="w-full">
                {/* admin routes  */}
                {isAdmin && (
                    <>
                        <Button className="w-40 lg:w-64 mb-2"><li><Link className='flex justify-start gap-2' to={'/dashboard/adminHome'}><Home />Admin Dashboard</Link></li></Button>
                        <Button className="w-40 lg:w-64 mb-2"><li><Link className='flex justify-start gap-2' to={'/dashboard/userManagement'}><Users />User Mangement</Link></li></Button>
                        <Button className="w-40 lg:w-64 mb-2"><li><Link className='flex justify-start gap-2' to={'/dashboard/petManagement'}><CatIcon />Pets Mangement</Link></li></Button>
                        <Button className="w-40 lg:w-64 mb-2"><li><Link className='flex justify-start gap-2' to={'/dashboard/campaignMangement'}><NotebookIcon />Campaigns Mangement</Link></li></Button>
                        <Button className="w-40 lg:w-64 mb-2"><li><Link className='flex justify-start gap-2' to={'/dashboard/donationCampaignForm'}><IoCreateSharp /> Create Campaigns</Link></li></Button>
                        <Button className="w-40 lg:w-64 mb-2"><li><Link className='flex justify-start gap-2' to={'/dashboard/requestedAdoptionReport'}><ForwardIcon />Requested Adoption</Link></li></Button>
                        <Button className="w-40 lg:w-64 mb-2"><li><Link className='flex justify-start gap-2' to={'/dashboard/adoptionRequestReport'}><BackpackIcon />Adoption Request</Link></li></Button>
                        <Button className="w-40 lg:w-64 mb-2"><li><Link className='flex justify-start gap-2' to={'/dashboard/addPet'}><CatIcon />Add A Pet</Link></li></Button>
                    </>
                )}

                <Separator className='my-2'></Separator>
                {/* users routes */}
                <Button className="w-40 lg:w-64 mb-2"><li><Link className='flex justify-start gap-2' to={'/dashboard/userHome'}><Home />User Dashboard</Link></li></Button>
                <Button className="w-40 lg:w-64 mb-2"><li><Link className='flex justify-start gap-2' to={'/dashboard/addPet'}><CatIcon />Add Pet</Link></li></Button>
                <Button className="w-40 lg:w-64 mb-2"><li><Link className='flex justify-start gap-2' to={'/dashboard/myPets'}><Dog /> My Pet</Link></li></Button>
                <Button className="w-40 lg:w-64 mb-2"><li><Link className='flex justify-start gap-2' to={'/dashboard/adoptionRequestReport'}><BackpackIcon />Adoption Request</Link></li></Button>
                <Button className="w-40 lg:w-64 mb-2"><li><Link className='flex justify-start gap-2' to={'/dashboard/requestedAdoptionReport'}><ForwardIcon />Requested Adoption</Link></li></Button>
                <Button className="w-40 lg:w-64 mb-2"><li><Link className='flex justify-start gap-2' to={'/dashboard/donationCampaignForm'}><IoCreateSharp /> Create Campaigns</Link></li></Button>
                <Button className="w-40 lg:w-64 mb-2"><li><Link className='flex justify-start gap-2' to={'/dashboard/myCampaignsReport'}><IoCreateSharp />My Campaigns</Link></li></Button>
                <Button className="w-40 lg:w-64 mb-2"><li><Link className='flex justify-start gap-2' to={'/dashboard/myDonationReport'}><IoCreateSharp />My Donations</Link></li></Button>
            </ul>
        </div>
    );
};

export default SideNavbar;