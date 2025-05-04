import {createBrowserRouter} from "react-router-dom";
import Main  from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/AuthRelated/Login/Login";
import Register from "../Pages/AuthRelated/Register/Register";
import PetListing from "../Pages/PetListing/PetListing";
import DonationCampaign from "../Pages/DonationCampaign/DonationCampaign";
import DashboardLayout from "../Layout/DashboardLayout";
import AddPetForm from "../Pages/Dashboard/AddPet/AddPetForm";
import ResetPassword from "../Pages/AuthRelated/PasswordReset/PasswordReset";
import PetDetails from "../Pages/PetDetails/PetDetails";
import DonationDetailsPage from "../Pages/DonationCampaign/Details/DonationDetailsPage";
import MyPets from "../Pages/Dashboard/MyPets/MyPets";
import UpdateMyPet from "../Pages/Dashboard/MyPets/UpdateMyPet";
import DonationCampForm from "../Pages/Dashboard/DonationCampign/DonationCampForm";
import MyDonationCamp from "../Pages/Dashboard/DonationCampign/MyCampaign/MyDonationCamp";
import EditDonationForm from "../Pages/Dashboard/DonationCampign/MyCampaign/EditDonation/EditDonationForm";
import MyDonationTable from "../Pages/Dashboard/MyDonation/MyDonationTable";
import AdoptionRequTable from "../Pages/Dashboard/MyPets/AdoptionRequTable";
import RequestedAdoptionTable from "../Pages/Dashboard/MyPets/RequestedAdoptionTable";
import UserManagementTable from "../Pages/Dashboard/DB_Mange/UserManegementTable";
import PetManagementTable from "../Pages/Dashboard/DB_Mange/PetManagementTable";
import CampaignManagement from "../Pages/Dashboard/DB_Mange/CampaignMangement";
import UserHome from "../Pages/Dashboard/Home/UserHome";
import AdminHome from "../Pages/Dashboard/Home/AdminHome";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";
import Profile from "../Pages/Home/Profile/Profile";

const router = createBrowserRouter([
    {
      path: "/",
      element:<Main />,
      errorElement: <ErrorPage/>,
      children:[
        {
            index: true,
            element: <Home />
        },
        {
            path: 'petListing',
            element: <PetListing/>
        },
        {
            path: 'petDetails/:id',
            element: <PetDetails/>
        },
        {
            path: 'donationCampaign',
            element: <DonationCampaign/>
        },
        {
            path: 'campDetails/:id',
            element: <DonationDetailsPage/>
        },
        {
            path: 'reset-password',
            element: <ResetPassword/>
        },
        {
            path: 'profile/:userName',
            element: <PrivateRoute><Profile/></PrivateRoute>
        }
      ]
    },
    {
        path: '/dashboard',
        element: <DashboardLayout></DashboardLayout>,
        children:[
            // admin routes 
            {
                path: 'adminHome',
                element: <AdminRoute><AdminHome/></AdminRoute>
            },
            {
                path:'userManagement',
                element: <AdminRoute>
                    <UserManagementTable/>
                </AdminRoute>
            },{
                path: 'petManagement',
                element: <AdminRoute>
                    <PetManagementTable/>
                </AdminRoute>
            },
            {
                path: 'campaignMangement',
                element: <AdminRoute>
                    <CampaignManagement/>
                </AdminRoute>
            },

            // users routes 
            {
                path: 'userHome',
                element: <PrivateRoute>
                    <UserHome/>
                </PrivateRoute>
            },
            {
                path: 'addPet',
                element: <PrivateRoute>
                    <AddPetForm/>
                </PrivateRoute>
            },
            {
                path: 'myPets',
                element: <PrivateRoute>
                    <MyPets/>
                </PrivateRoute>
            },
            {
                path: 'update-pet/:id',
                element: <PrivateRoute>
                    <UpdateMyPet/>
                </PrivateRoute>
            },
            {
                path: 'adoptionRequestReport',
                element: <PrivateRoute>
                    <AdoptionRequTable/>
                </PrivateRoute>
            },
            {
                path: 'requestedAdoptionReport',
                element: <PrivateRoute>
                    <RequestedAdoptionTable/>
                </PrivateRoute>
            },
            {
                path: "donationCampaignForm",
                element: <PrivateRoute>
                    <DonationCampForm/>
                </PrivateRoute>
            },
            {
                path: 'myCampaignsReport',
                element: <PrivateRoute>
                    <MyDonationCamp />
                </PrivateRoute>
            },
            {
                path: 'editDonation/:id',
                element: <PrivateRoute>
                    <EditDonationForm/>
                </PrivateRoute>
            },
            {
                path: 'myDonationReport',
                element: <PrivateRoute>
                    <MyDonationTable/>
                </PrivateRoute>
            }
        ]
    },
    {
        path: '/login',
        element: <Login />
    }
    ,
    {
        path: '/register',
        element: <Register/>
    }
  ]);
  

  export default router;




// https://www.aspca.org/adopt-pet
// https://bestfriends.org/
// https://www.humanesociety.org/adopt
// https://www.petfinder.com/
// https://petsmartcharities.org/adopt-a-pet ok