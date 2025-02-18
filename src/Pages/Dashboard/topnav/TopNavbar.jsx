import { Button } from '@/components/components/ui/button';
import { MenubarShortcut } from '@/components/components/ui/menubar';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger } from '@radix-ui/react-menubar';
import { CatIcon, Dog, HomeIcon, LogOutIcon, Users } from 'lucide-react';
import React from 'react';
import { IoCreateSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { FaHamburger } from "react-icons/fa";

const TopNavbar = () => {
    
    return (
        <div>
            <div className="dark:bg-gray-900 lg:flex dark:text-white hidden justify-between p-4">
                <ul className="flex gap-2">
                    <><li className='border-r-2  hover:text-blue-700'><Link className='flex justify-start gap-2' to={'/'}><HomeIcon />Home</Link></li></>
                    <><li className='border-r-2  hover:text-blue-700'><Link className='flex justify-start gap-2' to={'/dashboard/myCampaignsReport'}><IoCreateSharp className='text-2xl' />My Campaigns</Link></li></>
                    <><li className='border-r-2  hover:text-blue-700'><Link className='flex justify-start gap-2' to={'/dashboard/myDonationReport'}><IoCreateSharp className='text-2xl' />My Donations</Link></li></>
                    <><li className='border-r-2  hover:text-blue-700'><Link className='flex justify-start gap-2' to={'/dashboard/addPet'}><CatIcon />Add Pet</Link></li></>
                    <><li className='border-r-2  hover:text-blue-700'><Link className='flex justify-start gap-2' to={'/dashboard/myPets'}><Dog /> My Pet</Link></li></>
                </ul>
            </div>
            <div className='lg:hidden'>
                <Menubar>
                    <MenubarMenu>
                        <MenubarTrigger>
                        <FaHamburger />
                        </MenubarTrigger>
                        <MenubarContent className='dark:bg-gray-600 bg-white'>
                            <MenubarItem>
                                <MenubarShortcut>
                                    <Button className="w-full mb-2"><><Link className='flex justify-start gap-2' to={'/'}><HomeIcon />Home</Link></></Button>
                                </MenubarShortcut>
                            </MenubarItem>
                            <MenubarItem>
                                <MenubarShortcut>
                                    <Button className="w-full mb-2"><><Link className='flex justify-start gap-2' to={'/dashboard/myCampaignsReport'}><IoCreateSharp />My Campaigns</Link></></Button>
                                </MenubarShortcut>
                            </MenubarItem>
                            <MenubarItem>
                                <Button className="w-full mb-2"><><Link className='flex justify-start gap-2' to={'/dashboard/myDonationReport'}><IoCreateSharp />My Donations</Link></></Button>
                            </MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem>
                                <Button className="w-full mb-2"><><Link className='flex justify-start gap-2' to={'/dashboard/addPet'}><CatIcon />Add Pet</Link></></Button>
                            </MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem>
                                <Button className="w-full mb-2"><><Link className='flex justify-start gap-2' to={'/dashboard/myPets'}><Dog /> My Pet</Link></></Button>
                            </MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
                </Menubar>
            </div>
        </div>
    );
};

export default TopNavbar;