import React from 'react';
import { GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider, TwitterAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../../Firebase/firebase.config';
import { Button } from '@/components/components/ui/button';
import { Facebook, GithubIcon, Twitter } from 'lucide-react';
import { IoLogoGoogle } from "react-icons/io5";
import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import useAuth from '../../../Hooks/useAuth';

const SocialLogin = () => {
    const { setUser } = useAuth();

    const handleLogin = async (provider) => {
        try {
            const result = await signInWithPopup(auth, provider);
            console.log('User Info:', result.user);
            setUser(result.user);
        } catch (error) {
            console.error('Login Error:', error);
        }
    };

    const handleFacebookLogin = () => {
        FB.login(function(response) {
            if (response.authResponse) {
                const { accessToken, userID } = response.authResponse;
                FB.api('/me', { fields: 'name,email' }, function(userInfo) {
                    setUser({
                        uid: userID,
                        displayName: userInfo.name,
                        email: userInfo.email,
                        accessToken: accessToken,
                        photoURL: userInfo.picture.data?.url
                    });
                    console.log('User Info:', userInfo);
                    console.log('User Info:', userInfo.displayName);
                });
            } else {
                console.error('User cancelled login or did not fully authorize.');
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
