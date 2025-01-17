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

const router = createBrowserRouter([
    {
      path: "/",
      element:<Main />,
      errorElement: <h2>This is error page</h2>,
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
        }
      ]
    },
    {
        path: '/dashboard',
        element: <DashboardLayout></DashboardLayout>,
        children:[
            {
                path: 'addPet',
                element: <AddPetForm/>
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