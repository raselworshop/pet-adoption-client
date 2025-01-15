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

export function ProfileDropdownMenu() {
    return (

        <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem>
                    <User />
                    <span>Profile</span>
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <CreditCard />
                    <span>My Donation</span>
                    <DropdownMenuShortcut>⌘MD</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <LayoutDashboard />
                    <Link to={'/dashboard'}>
                        Dashboard
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
            <DropdownMenuItem>
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
                <span>Log out</span>
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
        </DropdownMenuContent>

    )
}

export default ProfileDropdownMenu;
