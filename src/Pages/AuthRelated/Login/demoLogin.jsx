import React from "react";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";

const DemoLogin = ({ userSignIn }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleQuickLogin = (role) => {
        const demoCredentials = {
            admin: {
                email: "admin@example.com",
                password: "Admin@123",
            },
            user: {
                email: "user@example.com",
                password: "User@123",
            },
        };

        const { email, password } = demoCredentials[role];

        userSignIn(email, password)
            .then(result => {
                if (result.user.email) {
                    toast.success(`${role === "admin" ? "Admin" : "User"} logged in successfully`);
                    navigate(from, { replace: true });
                }
            })
            .catch(error => toast.error(error.message));
    };

    return (
        <div className="mt-4">
            <button
                type="button"
                onClick={() => handleQuickLogin("admin")}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg w-full hover:bg-blue-600 transition-all"
            >
                Quick Login (Admin)
            </button>
            <button
                type="button"
                onClick={() => handleQuickLogin("user")}
                className="px-4 py-2 bg-green-500 text-white rounded-lg w-full hover:bg-green-600 transition-all mt-2"
            >
                Quick Login (User)
            </button>
        </div>
    );
};

export default DemoLogin;
