import { createUserWithEmailAndPassword } from "firebase/auth";
import { createContext, useState } from "react";
import {auth, analytics} from "../../Firebase/firebase.config";
import { logEvent } from "firebase/analytics";

function logLoginEvents(user){
    logEvent(analytics, 'sign-up', {
        method: 'email',
        user_id: user.uid
    })
}

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [ user, setUser ] = useState('')
    const createUser = (email, password) =>{
        return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential)=>{
            const user = userCredential.user;
            setUser(user)
            logLoginEvents(user)
            return user;
        })
    }

    const authInfo = {
        user,
        setUser,
        createUser,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;