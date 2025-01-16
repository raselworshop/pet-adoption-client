import React, { useEffect } from 'react';
import { auth } from '../../../Firebase/firebase.config';
import useAuth from '../../../Hooks/useAuth';

const FacebookLogin = () => {
    const { setUser } = useAuth();

    useEffect(() => {
        window.fbAsyncInit = function() {
            FB.init({
                appId      : import.meta.env.VITE_FB_APPID,
                cookie     : true,
                xfbml      : true,
                version    : 'v16.0'
            });

            FB.getLoginStatus(function(response) {
                if (response.status === 'connected') {
                    handleAuthResponse(response.authResponse);
                }
            });
        };

        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }, []);

    const handleAuthResponse = (authResponse) => {
        const { accessToken, userID } = authResponse;

        console.log('Access Token:', accessToken);
        console.log('User ID:', userID);

        FB.api('/me', { fields: 'name,email,picture' }, function(response) {
            console.log('User Profile:', response);
            setUser({
                uid: userID,
                displayName: response.name,
                email: response.email,
                accessToken: accessToken,
                photoURL: response.picture.data.url 
            });
        });
    };

    return <div id="fb-root"></div>;
};

export default FacebookLogin;
