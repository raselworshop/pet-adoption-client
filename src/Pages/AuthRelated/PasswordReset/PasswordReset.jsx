import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import useAuth from '../../../Hooks/useAuth';

const ResetPassword = () => {
    const { sendResetEmail } = useAuth()
    // Initial Values
    const initialValues = {
        email: '',
    };

    // Validation Schema
    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
    });

    // Form Submission Handler
    const onSubmit = async (values, { setSubmitting }) => {
        try {
            await sendResetEmail(auth, values.email);
            toast.success('Password reset link sent to your email!');
        } catch (error) {
            toast.error('Error sending password reset email');
            console.error('Error:', error);
        }
        setSubmitting(false); 
    };

    return (
        <div className="container mx-auto flex flex-col items-center justify-center min-h-screen dark:bg-gray-800">
            <div className="p-6 rounded-lg shadow-lg w-full dark:bg-gray-700">
                <h2 className="text-xl font-bold mb-4">Reset Password</h2>
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
                                    autoComplete="email"
                                    name="email"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:text-white dark:bg-gray-600"
                                />
                                <ErrorMessage
                                    name="email"
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
                                {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default ResetPassword;
