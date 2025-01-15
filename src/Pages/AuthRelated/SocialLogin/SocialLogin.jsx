import React from 'react';
import { GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider, TwitterAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../../Firebase/firebase.config';
import { Button } from '@/components/components/ui/button';
import { Facebook, GithubIcon, Twitter } from 'lucide-react';
import { IoLogoGoogle } from "react-icons/io5";
import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import useAuth from '../../../Hooks/useAuth';

const SocialLogin = () => {
    const { setUser } = useAuth()
    const handleLogin = async (provider) => {
        try {
            const result = await signInWithPopup(auth, provider);
            console.log('User Info:', result.user);
            setUser(result.user)
            // Handle successful login (e.g., store user info, redirect, etc.)
        } catch (error) {
            console.error('Login Error:', error);
            // Handle login error (e.g., show error message)
        }
    };

    return (
        <div className='flex flex-col gap-2 my-5'>
            <Button>
            <IoLogoGoogle />
                <span onClick={() => handleLogin(new GoogleAuthProvider())}>Login with Google</span>
            </Button>
            <DropdownMenuSeparator/>
            <Button>
                <Facebook/>
                <span onClick={() => handleLogin(new FacebookAuthProvider())}>Login with Facebook</span>
            </Button>
            <DropdownMenuSeparator/>
            <Button>
                <GithubIcon/>
                <span onClick={() => handleLogin(new GithubAuthProvider())}>Login with GitHub</span>
            </Button>
            <DropdownMenuSeparator/>
            <Button>
                <Twitter/>
                <span onClick={() => handleLogin(new TwitterAuthProvider())}>Login with Twitter</span>
            </Button>
        </div>
    );
};

export default SocialLogin;
