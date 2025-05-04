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
import useAuth from "../../../Hooks/useAuth";
import ToggleMode from "../../../Providers/Toggle/ToggleMode";

const SideNavbar = () => {
  const { user } = useAuth();
  const [isAdmin] = useAdmin();
  const { signOutUser } = useAuth();
  return (
    <div className=" min-h-full bg-sky-800">
      {/* <div className="fixed md:left-56 top-5 z-50">
        <SidebarTrigger />
      </div> */}
      <Sidebar>
        <SidebarContent className="bg-sky-900">
          <SidebarGroup>
            <div className="absolute top-5 left-0 w-full h-full flex flex-col justify-between items-center p-4">
            <h2 className="my-8 text-neutral-50">
              <span>Welcome to </span>
              <span>PET ADOPTION</span>
            </h2>
            <ul className="h-full flex flex-col justify-between">
              {/* admin routes  */}
              <div className="space-y-2">
              {isAdmin ? (
                <>
                  <li>
                    <button className="text-white hover:text-blue-500  lg:w-60 mb-2">
                      <Link
                        className="flex justify-start gap-2"
                        to={"/dashboard/adminHome"}
                      >
                        <Home />
                        Admin Dashboard
                      </Link>
                    </button>
                  </li>
                  <li>
                    <button className="text-white hover:text-blue-500  lg:w-60 mb-2">
                      <Link
                        className="flex justify-start gap-2"
                        to={"/dashboard/userManagement"}
                      >
                        <Users />
                        User Mangement
                      </Link>
                    </button>
                  </li>
                  <li>
                    <button className="text-white hover:text-blue-500  lg:w-60 mb-2">
                      <Link
                        className="flex justify-start gap-2"
                        to={"/dashboard/petManagement"}
                      >
                        <CatIcon />
                        Pets Mangement
                      </Link>
                    </button>
                  </li>
                  <li>
                    <button className="text-white hover:text-blue-500  lg:w-60 mb-2">
                      <Link
                        className="flex justify-start gap-2"
                        to={"/dashboard/campaignMangement"}
                      >
                        <NotebookIcon />
                        Campaigns Mangement
                      </Link>
                    </button>
                  </li>
                  <li>
                    <button className="text-white hover:text-blue-500  lg:w-60 mb-2">
                      <Link
                        className="flex justify-start gap-2"
                        to={"/dashboard/donationCampaignForm"}
                      >
                        <IoCreateSharp className="text-2xl" /> Create Campaigns
                      </Link>
                    </button>
                  </li>
                  <li>
                    <button className="text-white hover:text-blue-500  lg:w-60 mb-2">
                      <Link
                        className="flex justify-start gap-2"
                        to={"/dashboard/requestedAdoptionReport"}
                      >
                        <ForwardIcon />
                        Requested Adoption
                      </Link>
                    </button>
                  </li>
                  <li>
                    <button className="text-white hover:text-blue-500  lg:w-60 mb-2">
                      <Link
                        className="flex justify-start gap-2"
                        to={"/dashboard/adoptionRequestReport"}
                      >
                        <BackpackIcon />
                        Adoption Request
                      </Link>
                    </button>
                  </li>
                  <li>
                    <button className="text-white hover:text-blue-500  lg:w-60 mb-2">
                      <Link
                        className="flex justify-start gap-2"
                        to={"/dashboard/addPet"}
                      >
                        <CatIcon />
                        Add A Pet
                      </Link>
                    </button>
                  </li>
                </>
              ) : (
                <>
                  {/* users routes */}
                  <li>
                    <button className="text-white hover:text-blue-500 w-40 lg:w-60 mb-2">
                      <Link
                        className="flex justify-start gap-2"
                        to={"/dashboard/userHome"}
                      >
                        <Home />
                        User Dashboard
                      </Link>
                    </button>
                  </li>
                  <li>
                    <button className="text-white hover:text-blue-500 w-40 lg:w-60 mb-2">
                      <Link
                        className="flex justify-start gap-2"
                        to={"/dashboard/adoptionRequestReport"}
                      >
                        <BackpackIcon />
                        Adoption Request
                      </Link>
                    </button>
                  </li>
                  <li>
                    <button className="text-white hover:text-blue-500 w-40 lg:w-60 mb-2">
                      <Link
                        className="flex justify-start gap-2"
                        to={"/dashboard/requestedAdoptionReport"}
                      >
                        <ForwardIcon />
                        Requested Adoption
                      </Link>
                    </button>
                  </li>
                  <li>
                    <button className="text-white hover:text-blue-500 w-40 lg:w-60 mb-2">
                      <Link
                        className="flex justify-start gap-2"
                        to={"/dashboard/donationCampaignForm"}
                      >
                        <IoCreateSharp className="text-2xl" /> Create Campaigns
                      </Link>
                    </button>
                  </li>
                </>
              )}
              </div>

              <div className="mt-auto mb-4">
              <li className="w-full flex justify-between items-center">
                <button
                  className=" hover:text-blue-500 text-neutral-50 flex gap-2"
                  onClick={signOutUser}
                >
                  <LogOutIcon /> Logout
                </button>
                <span>
                <div className="w-10 h-10">
              <img src={user?.photoURL} alt="user" className="w-full h-full rounded-full" />
            </div>
                </span>
              </li>
              </div>
            </ul>
            </div>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      {/* <SidebarTrigger className="text-red-800" /> */}
    </div>
  );
};
export default SideNavbar;
