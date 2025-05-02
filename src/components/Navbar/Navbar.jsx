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
import logo from '../../assets/pet-adoption.webp';
import Badge from '../Shared/Badge';

const Navbar = () => {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.dropdown')) {
                document.body.style.pointerEvents = 'auto';
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleAvatarClick = () => {
        document.body.style.pointerEvents = 'auto';
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="fixed top-0 left-0 w-full bg-sky-200 dark:bg-gray-900 bg-opacity-90 shadow-md dark:shadow-lg backdrop-blur-lg z-50">
            <nav className="max-w-7xl mx-auto flex justify-between items-center py-4">
                {/* Logo & Title */}
                <div className="flex items-center space-x-3">
                    <img src={logo} alt="Pet Adoption" className="w-10 h-10 rounded-full shadow-md" />
                    <NavLink to="/" className="text-xl font-bold text-gray-800 dark:text-white hover:text-blue-500 transition">
                        Pet Adoption
                    </NavLink>
                </div>

                {/* Mobile Menu Button */}
                <div className="lg:hidden flex items-center space-x-4">
                    <ToggleMode />
                    <button onClick={toggleMenu} className="text-gray-700 dark:text-gray-300 text-xl">
                        {isOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
                    </button>
                </div>

                {/* Desktop Navigation */}
                <div className={`lg:flex items-center space-x-6 hidden`}>
                    <NavigationMenu>
                        <NavigationMenuList className="flex space-x-6">
                            <NavigationMenuItem>
                                <NavLink to="/" className="hover:text-blue-500 transition">
                                    Home
                                </NavLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavLink to="/petListing" className="hover:text-blue-500 transition">
                                    Pet Listing
                                </NavLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavLink to="/donationCampaign" className="hover:text-blue-500 transition">
                                    Donation Campaigns
                                </NavLink>
                            </NavigationMenuItem>
                            {!user && (
                                <>
                                    <NavigationMenuItem>
                                        <NavLink to="/login" className="hover:text-blue-500 transition">
                                            Login
                                        </NavLink>
                                    </NavigationMenuItem>
                                    <NavigationMenuItem>
                                        <NavLink to="/register" className="hover:text-blue-500 transition">
                                            Register
                                        </NavLink>
                                    </NavigationMenuItem>
                                </>
                            )}
                            {user && (
                                <DropdownMenu className="relative">
                                    <DropdownMenuTrigger asChild>
                                        <div onClick={handleAvatarClick} className="dropdown relative cursor-pointer">
                                            <div className="absolute md:-top-1 lg:right-[90px]">
                                                <Badge />
                                            </div>
                                            <Avatar className="shadow-md border border-gray-300 dark:border-gray-700">
                                                <AvatarImage src={user?.photoURL} />
                                                <AvatarFallback>CN</AvatarFallback>
                                            </Avatar>
                                        </div>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <ProfileDropdownMenu />
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )}
                            <NavigationMenuItem>
                                <ToggleMode />
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            </nav>

            {/* Mobile Navigation Menu */}
            {isOpen && (
                <div className="lg:hidden flex flex-col bg-gray-800 dark:bg-gray-900 text-white absolute top-16 left-0 w-full py-5 space-y-4 text-center shadow-lg rounded-b-lg">
                    <MobileMenu />
                </div>
            )}
        </header>
    );
};

export default Navbar;
