import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'; // For validation schema
import signinLottie from '../../../assets/lottie/signin.json'
import ButtonLoading from '../../../components/components/ui/ButtonLoading';
import Lottie from 'lottie-react';

const Login = () => {
    // Initial Values
    const initialValues = {
        email: '',
        password: '',
    };

    // Validation Schema
    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
    });

    // Form Submission Handler
    const onSubmit = (values, { setSubmitting }) => {
        console.log('Form Data:', values);
        alert('Login Successful!');
        setSubmitting(false); // Stop the loading state
    };

    return (
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-center min-h-screen dark:bg-gray-800">
            <div className='flex-1 p-5 flex items-center justify-center'>
                <div className="p-6 rounded-lg shadow-lg w-80 dark:bg-gray-700">
                    <h2 className="text-xl font-bold mb-4">Welcome back to Login</h2>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                {/* Email Field */}
                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                                        Email
                                    </label>
                                    <Field
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:text-white dark:bg-gray-600"
                                    />
                                    <ErrorMessage
                                        name="email"
                                        component="div"
                                        className="text-red-500 text-sm mt-1"
                                    />
                                </div>

                                {/* Password Field */}
                                <div className="mb-4">
                                    <label htmlFor="password" className="block text-sm font-medium mb-2">
                                        Password
                                    </label>
                                    <Field
                                        type="password"
                                        id="password"
                                        name="password"
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:text-white dark:bg-gray-600"
                                    />
                                    <ErrorMessage
                                        name="password"
                                        component="div"
                                        className="text-red-500 text-sm mt-1"
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`px-4 py-2 bg-secondary rounded-lg w-full hover:bg-blue-600 transition-all ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                >
                                    {isSubmitting ? <ButtonLoading /> : 'Login'}
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
            <div className='flex-1 p-5'>
                <Lottie className='w-full' animationData={signinLottie}></Lottie>
            </div>
        </div>
    );
};

export default Login;
