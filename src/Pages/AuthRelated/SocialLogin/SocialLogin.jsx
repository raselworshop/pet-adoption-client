import React from 'react';
import { GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider, TwitterAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../../Firebase/firebase.config';
import { Button } from '@/components/components/ui/button';
import { Facebook, GithubIcon, Twitter } from 'lucide-react';
import { IoLogoGoogle } from "react-icons/io5";
import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import useAuth from '../../../Hooks/useAuth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

const SocialLogin = () => {
    const { setUser } = useAuth();
    const navigate = useNavigate()
    const axiosPublic = useAxiosPublic()

    const handleLogin = async (provider) => {
        try {
            const result = await signInWithPopup(auth, provider);
            console.log('User Info:', result.user);

            const userinfo = {
                name: result.user.displayName,
                email: result.user.email,
                photo: result.user.photoURL,
                role: 'user'
            }
            const res = await axiosPublic.post('/users', userinfo);
            if (res.data.insertedId) {
                toast.success(`successfully created user is ${result.user.displayName}`)
                navigate('/')
            } else {
                toast.info(`Welcome back, ${result.user.displayName}`);
            }
            console.log('Response:', res.data);

            setUser(result.user);
        } catch (error) {
            console.error('Login Error:', error);
        }
    };

    const handleFacebookLogin = () => {
        FB.login(function (response) {
            if (response.authResponse) {
                const { accessToken:access_token, userID } = response.authResponse;

                // Fetch user data from Facebook
                FB.api('/me', { fields: 'name,email,picture' }, async function (userInfo) {
                    const userData = {
                        facebookId: userID,
                        displayName: userInfo.name,
                        email: userInfo.email,
                        photoURL: userInfo.picture.data.url,
                        role: "user"
                    };

                    try {
                        // User does not exist, create a new user
                        const createRes = await axiosPublic.post('/users', userData);

                        if (createRes.data.insertedId) {
                            toast.success(`Successfully created user: ${userInfo.name}`);
                            navigate('/')
                        } else {
                            toast.error(`Welcome back, ${userInfo.name}`)
                        }

                        // Set user data in state
                        setUser(userData);
                        console.log('User Info:', userInfo);

                    } catch (error) {
                        console.error('Error during user check or creation:', error);
                        toast.error('An error occurred during the login process.');
                    }
                });
            } else {
                console.error('User cancelled login or did not fully authorize.');
                toast.error('Login failed or cancelled.');
            }
        }, { scope: 'public_profile,email' });
    };

    return (
        <div className='flex flex-col gap-2 my-5'>
            <Button onClick={() => handleLogin(new GoogleAuthProvider())}>
                <IoLogoGoogle />
                <span>Login with Google</span>
            </Button>
            <DropdownMenuSeparator />
            <Button onClick={handleFacebookLogin}>
                <Facebook />
                <span>Login with Facebook</span>
            </Button>
            <DropdownMenuSeparator />
            <Button onClick={() => handleLogin(new GithubAuthProvider())}>
                <GithubIcon />
                <span>Login with GitHub</span>
            </Button>
            <DropdownMenuSeparator />
            <Button onClick={() => handleLogin(new TwitterAuthProvider())}>
                <Twitter />
                <span>Login with Twitter</span>
            </Button>
        </div>
    );
};

export default SocialLogin;
