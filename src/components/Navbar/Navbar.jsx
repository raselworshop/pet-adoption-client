import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '../components/ui/navigation-menu';
import ToggleMode from '../../Providers/Toggle/ToggleMode';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from '../components/ui/dropdown-menu';
import ProfileDropdownMenu from '../ProfileDropDown/ProfileDropdownMenu';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { MenuIcon, XIcon } from 'lucide-react';
import MobileMenu from '../Navbar/MobileMenu';
import useAuth from '../../Hooks/useAuth';
import logo from '../../assets/pet-adoption.webp'
import Badge from '../Shared/Badge';

const Navbar = () => {
    const { user } = useAuth()
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            // Check if the click is outside the dropdown
            if (!event.target.closest('.dropdown')) {
                // Remove pointer-events: none from the body
                document.body.style.pointerEvents = 'auto';
            }
        };

        // Add event listener
        document.addEventListener('click', handleClickOutside);

        // Cleanup event listener
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleAvatarClick = () => {
        // Ensure pointer events are not disabled on the body
        document.body.style.pointerEvents = 'auto';
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className='md:-mx-4 lg:-mx-10 dark:bg-gray-950 bg-gray-300 fixed top-0 z-50 w-full bg-opacity-80 dark:bg-opacity-80 backdrop-blur-md'>
            <nav className="py-4 md:px-5 lg:px-10 flex justify-between items-center">
                <div className="flex items-center">
                    <div className='w-10 h-10'>
                        <img src={logo} alt="" />
                    </div>
                    <NavLink to="/" className="text-xl font-bold">
                        Pet Adoption
                    </NavLink>
                </div>
                <div className="lg:hidden flex">
                    <div>
                        <ToggleMode />
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button onClick={toggleMenu} className="text-gray-500 dark:text-gray-300 focus:outline-none">
                                {isOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <MobileMenu />
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className={`lg:flex items-center space-x-6 hidden`}>
                    <NavigationMenu>
                        <NavigationMenuList className="flex flex-col lg:flex-row lg:space-x-4">
                            <NavigationMenuItem>
                                <NavLink
                                    to="/"
                                    className="hover:text-blue-500 cursor-pointer"
                                >
                                    Home
                                </NavLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavLink
                                    to="/petListing"
                                    className="hover:text-blue-500 cursor-pointer"
                                >
                                    Pet Listing
                                </NavLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavLink
                                    to="/donationCampaign"
                                    className="hover:text-blue-500 cursor-pointer"
                                >
                                    Donation Campaigns
                                </NavLink>
                            </NavigationMenuItem>
                            {!user && <>
                                <NavigationMenuItem>
                                    <NavLink
                                        to="/login"
                                        className="hover:text-blue-500 cursor-pointer"
                                    >
                                        Login
                                    </NavLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavLink
                                        to="/register"
                                        className="hover:text-blue-500 cursor-pointer"
                                    >
                                        Register
                                    </NavLink>
                                </NavigationMenuItem>
                            </>}
                            <DropdownMenu className=" relative">
                                <DropdownMenuTrigger asChild>
                                    <div onClick={handleAvatarClick} className="dropdown">
                                        <div className=" absolute md:-top-1 lg:right-[90px]"> <Badge /></div>
                                        <Avatar>
                                            <AvatarImage src={user?.photoURL} />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <ProfileDropdownMenu />
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <NavigationMenuItem>
                                <ToggleMode />
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            </nav>

        </header>
    );
};

export default Navbar;
