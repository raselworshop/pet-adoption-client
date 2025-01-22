import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // Go back to the previous page
    };

    const handleGoHome = () => {
        navigate('/'); // Navigate to the home page
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-lg text-center">
                <h1 className="text-4xl font-bold text-red-500 mb-4">Oops!</h1>
                <p className="text-gray-700 mb-8">Something went wrong. Please try again later.</p>
                <div className="flex justify-center space-x-4">
                    <button
                        onClick={handleGoBack}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Go Back
                    </button>
                    <button
                        onClick={handleGoHome}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                        Go Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
