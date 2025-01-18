import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import {auth, analytics} from "../../Firebase/firebase.config";
import { logEvent } from "firebase/analytics";

function logLoginEvents(user){
    logEvent(analytics, 'sign-up', {
        method: 'email',
        user_id: user?.uid
    })
}

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [ user, setUser ] = useState(null)

    const createUser = async(email, password) =>{
        setLoading(true)
        return await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential)=>{
            const user = userCredential.user;
            setUser(user)
            logLoginEvents(user)
            return user;
        })
    }
    const userSignIn = (email, password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const updateUserProfile=async (fullname, photo)=>{
        setLoading(true)
        return await updateProfile(auth.currentUser, {
            displayName: fullname, photoURL: photo
        })
    }
    const sendResetEmail=async(email)=>{
        setLoading(true)
        return await sendPasswordResetEmail(auth, email)
    }
    const signOutUser=()=>{
        setLoading(true)
        return signOut(auth)
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, currentUser=>{
            setUser(currentUser)
            logLoginEvents(currentUser)
            setLoading(false)
            console.log("Current user captured",currentUser)
        })
        return ()=>{
            return unsubscribe();
        }
    }, [])

    const authInfo = {
        loading,
        user,
        setUser,
        createUser,
        userSignIn,
        updateUserProfile,
        sendResetEmail,
        signOutUser,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;