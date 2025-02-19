import {
    Cloud,
    CreditCard,
    Github,
    LayoutDashboard,
    LifeBuoy,
    LogOut,
    Settings,
    User,
} from "lucide-react"

import {
    DropdownMenuContent,
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

export function ProfileDropdownMenu() {
    const { user, signOutUser } = useAuth()
    const handleSignOut=()=>{
        signOutUser()
        .then(()=>{
            toast.success("You're logged out succesfull")
        })
    }
    const enactiveButtonClik=()=>{
        toast.success("This feature is on the way")
    }
    return (
        <>
        {user && <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem onClick={enactiveButtonClik}>
                    <User />
                    <span>Profile</span>
                    <DropdownMenuShortcut>{user?.email}</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem  onClick={enactiveButtonClik}>
                    <CreditCard />
                    <span>My Donation</span>
                    <DropdownMenuShortcut>⌘MD</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <LayoutDashboard />
                    <Link to={user?.isAdmin ? '/dashboard/adminHome' : '/dashboard/userHome' }>
                        Dashboard (<Badge />)
                    </Link>
                    <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
                <Github />
                <Link to={"https://github.com/raselworshop"}>
                    <span>GitHub</span>
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={enactiveButtonClik}>
                <LifeBuoy />
                <span>Support</span>
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
                <Cloud />
                <span>API</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
                <LogOut />
                <button onClick={handleSignOut}>Log out</button>
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
        </DropdownMenuContent>}
        </>
    )
}

export default ProfileDropdownMenu;
