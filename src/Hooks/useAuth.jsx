import { useContext } from "react";
import { AuthContext } from "src/Providers/AuthProvider/AuthProvider";

const useAuth = () => {
    const authInfo = useContext(AuthContext)
    return authInfo;
};

export default useAuth;