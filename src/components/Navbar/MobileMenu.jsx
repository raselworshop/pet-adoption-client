import {
    Cat,
    Cloud,
    Github,
    HelpingHand,
    Home,
    LayoutDashboard,
    LifeBuoy,
    LogInIcon,
    LogOut,
    RegexIcon,
    User,
} from "lucide-react"
import {
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
} from "../components/ui/dropdown-menu"
import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import Badge from "../Shared/Badge";

export function MobileMenu() {
    const { user, signOutUser } = useAuth()
    const handleSignOut = () => {
        signOutUser()
            .then(() => {
                toast.success("You're logged out succesfull")
            })
    }
    return (

        <>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem>
                    <Home />
                    <Link
                        to="/"
                        className="hover:text-blue-500 cursor-pointer"
                    >
                        Home
                    </Link>
                    <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <User />
                    <span>Profile</span>
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <LayoutDashboard />
                    <Link to={'/dashboard/addPet'}>
                        Dashboard (<Badge />)
                    </Link>
                    <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem>
                    <Cat />
                    <Link
                        to="/petListing"
                        className="hover:text-blue-500 cursor-pointer"
                    >
                        Pet Listing
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <HelpingHand />
                    <Link
                        to="/donationCampaign"
                        className="hover:text-blue-500 cursor-pointer"
                    >
                        Donation Campaigns
                    </Link>
                </DropdownMenuItem>
                {!user && (<>
                    <DropdownMenuItem>
                        <LogInIcon />
                        <Link
                            to="/login"
                            className="hover:text-blue-500 cursor-pointer"
                        >
                            Login
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <RegexIcon />
                        <Link
                            to="/register"
                            className="hover:text-blue-500 cursor-pointer"
                        >
                            Register
                        </Link>
                    </DropdownMenuItem>
                </>)}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
                <Github />
                <span>GitHub</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
                <LifeBuoy />
                <span>Support</span>
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
                <Cloud />
                <span>API</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {user && <DropdownMenuItem>
                <LogOut />
                <span onClick={handleSignOut}>Log out</span>
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>}
        </>
    )
}

export default MobileMenu;
