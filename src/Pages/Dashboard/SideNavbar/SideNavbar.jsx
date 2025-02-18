import { Button } from "@/components/components/ui/button";
import {
  BackpackIcon,
  CatIcon,
  ForwardIcon,
  Home,
  LogOutIcon,
  NotebookIcon,
  Users,
} from "lucide-react";
import React from "react";
import { IoCreateSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import useAdmin from "../../../Hooks/useAdmin";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarTrigger,
} from "@/components/components/ui/sidebar";
import useAuth from '../../../Hooks/useAuth';

const SideNavbar = () => {
  const [isAdmin] = useAdmin();
  const { signOutUser } = useAuth()
  return (
    <div className=" min-h-full bg-sky-800">
      <Sidebar>
        <SidebarContent className="bg-sky-900">
          <SidebarGroup>
            <h2 className="my-8 text-neutral-50">
              <span>Welcome to </span>
              <span>PET ADOPTION</span>
            </h2>
            <ul className="space-y-2">
              {/* admin routes  */}
              {isAdmin ? (
                <>
                  <button className="text-white hover:text-blue-500  lg:w-60 mb-2">
                    <li>
                      <Link
                        className="flex justify-start gap-2"
                        to={"/dashboard/adminHome"}
                      >
                        <Home />
                        Admin Dashboard
                      </Link>
                    </li>
                  </button>
                  <button className="text-white hover:text-blue-500  lg:w-60 mb-2">
                    <li>
                      <Link
                        className="flex justify-start gap-2"
                        to={"/dashboard/userManagement"}
                      >
                        <Users />
                        User Mangement
                      </Link>
                    </li>
                  </button>
                  <button className="text-white hover:text-blue-500  lg:w-60 mb-2">
                    <li>
                      <Link
                        className="flex justify-start gap-2"
                        to={"/dashboard/petManagement"}
                      >
                        <CatIcon />
                        Pets Mangement
                      </Link>
                    </li>
                  </button>
                  <button className="text-white hover:text-blue-500  lg:w-60 mb-2">
                    <li>
                      <Link
                        className="flex justify-start gap-2"
                        to={"/dashboard/campaignMangement"}
                      >
                        <NotebookIcon />
                        Campaigns Mangement
                      </Link>
                    </li>
                  </button>
                  <button className="text-white hover:text-blue-500  lg:w-60 mb-2">
                    <li>
                      <Link
                        className="flex justify-start gap-2"
                        to={"/dashboard/donationCampaignForm"}
                      >
                        <IoCreateSharp className="text-2xl" /> Create Campaigns
                      </Link>
                    </li>
                  </button>
                  <button className="text-white hover:text-blue-500  lg:w-60 mb-2">
                    <li>
                      <Link
                        className="flex justify-start gap-2"
                        to={"/dashboard/requestedAdoptionReport"}
                      >
                        <ForwardIcon />
                        Requested Adoption
                      </Link>
                    </li>
                  </button>
                  <button className="text-white hover:text-blue-500  lg:w-60 mb-2">
                    <li>
                      <Link
                        className="flex justify-start gap-2"
                        to={"/dashboard/adoptionRequestReport"}
                      >
                        <BackpackIcon />
                        Adoption Request
                      </Link>
                    </li>
                  </button>
                  <button className="text-white hover:text-blue-500  lg:w-60 mb-2">
                    <li>
                      <Link
                        className="flex justify-start gap-2"
                        to={"/dashboard/addPet"}
                      >
                        <CatIcon />
                        Add A Pet
                      </Link>
                    </li>
                  </button>
                </>
              ) : (
                <>
                  {/* users routes */}
                  <button className="text-white hover:text-blue-500 w-40 lg:w-60 mb-2">
                    <li>
                      <Link
                        className="flex justify-start gap-2"
                        to={"/dashboard/userHome"}
                      >
                        <Home />
                        User Dashboard
                      </Link>
                    </li>
                  </button>
                  <button className="text-white hover:text-blue-500 w-40 lg:w-60 mb-2">
                    <li>
                      <Link
                        className="flex justify-start gap-2"
                        to={"/dashboard/adoptionRequestReport"}
                      >
                        <BackpackIcon />
                        Adoption Request
                      </Link>
                    </li>
                  </button>
                  <button className="text-white hover:text-blue-500 w-40 lg:w-60 mb-2">
                    <li>
                      <Link
                        className="flex justify-start gap-2"
                        to={"/dashboard/requestedAdoptionReport"}
                      >
                        <ForwardIcon />
                        Requested Adoption
                      </Link>
                    </li>
                  </button>
                  <button className="text-white hover:text-blue-500 w-40 lg:w-60 mb-2">
                    <li>
                      <Link
                        className="flex justify-start gap-2"
                        to={"/dashboard/donationCampaignForm"}
                      >
                        <IoCreateSharp className="text-2xl" /> Create Campaigns
                      </Link>
                    </li>
                  </button>
                </>
              )}
              
              <button
                className=" hover:text-blue-500 text-neutral-50 flex gap-2"
                onClick={signOutUser}
              >
                <LogOutIcon /> Logout
              </button>
            </ul>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      {/* <SidebarTrigger className="text-red-800" /> */}
    </div>
  );
};
export default SideNavbar;
