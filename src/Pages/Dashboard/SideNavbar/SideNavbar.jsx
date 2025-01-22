import { Button } from '@/components/components/ui/button';
import { BackpackIcon, CatIcon, ForwardIcon, Home, NotebookIcon, Users } from 'lucide-react';
import React from 'react';
import { IoCreateSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import useAdmin from '../../../Hooks/useAdmin';
import { Sidebar, SidebarContent, SidebarGroup } from '@/components/components/ui/sidebar';

const SideNavbar = () => {
    const [isAdmin] = useAdmin()
    return (
        <div>
            <Sidebar>
                <SidebarContent>
                    <SidebarGroup>
                <ul className="space-y-2">
                    {/* admin routes  */}
                    {isAdmin ? (
                        <>
                            <Button className="w-40 lg:w-60 mb-2"><li><Link className='flex justify-start gap-2' to={'/dashboard/adminHome'}><Home />Admin Dashboard</Link></li></Button>
                            <Button className="w-40 lg:w-60 mb-2"><li><Link className='flex justify-start gap-2' to={'/dashboard/userManagement'}><Users />User Mangement</Link></li></Button>
                            <Button className="w-40 lg:w-60 mb-2"><li><Link className='flex justify-start gap-2' to={'/dashboard/petManagement'}><CatIcon />Pets Mangement</Link></li></Button>
                            <Button className="w-40 lg:w-60 mb-2"><li><Link className='flex justify-start gap-2' to={'/dashboard/campaignMangement'}><NotebookIcon />Campaigns Mangement</Link></li></Button>
                            <Button className="w-40 lg:w-60 mb-2"><li><Link className='flex justify-start gap-2' to={'/dashboard/donationCampaignForm'}><IoCreateSharp /> Create Campaigns</Link></li></Button>
                            <Button className="w-40 lg:w-60 mb-2"><li><Link className='flex justify-start gap-2' to={'/dashboard/requestedAdoptionReport'}><ForwardIcon />Requested Adoption</Link></li></Button>
                            <Button className="w-40 lg:w-60 mb-2"><li><Link className='flex justify-start gap-2' to={'/dashboard/adoptionRequestReport'}><BackpackIcon />Adoption Request</Link></li></Button>
                            <Button className="w-40 lg:w-60 mb-2"><li><Link className='flex justify-start gap-2' to={'/dashboard/addPet'}><CatIcon />Add A Pet</Link></li></Button>
                        </>
                    ) : (<>
                        {/* users routes */}
                        <Button className="w-40 lg:w-60 mb-2"><li><Link className='flex justify-start gap-2' to={'/dashboard/userHome'}><Home />User Dashboard</Link></li></Button>
                        <Button className="w-40 lg:w-60 mb-2"><li><Link className='flex justify-start gap-2' to={'/dashboard/adoptionRequestReport'}><BackpackIcon />Adoption Request</Link></li></Button>
                        <Button className="w-40 lg:w-60 mb-2"><li><Link className='flex justify-start gap-2' to={'/dashboard/requestedAdoptionReport'}><ForwardIcon />Requested Adoption</Link></li></Button>
                        <Button className="w-40 lg:w-60 mb-2"><li><Link className='flex justify-start gap-2' to={'/dashboard/donationCampaignForm'}><IoCreateSharp /> Create Campaigns</Link></li></Button>

                    </>)}


                </ul>
                </SidebarGroup>
                </SidebarContent>
            </Sidebar>
        </div>
    );
};
export default SideNavbar;