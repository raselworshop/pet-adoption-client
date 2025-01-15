import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useImageUpload from '../../../Hooks/useImageUpload';
import Lottie from 'lottie-react';
import signupLottie from '../../../assets/lottie/signup.json'
import { Button } from '@/components/components/ui/button';

const Register = () => {
    const [profileImage, setProfileImage] = useState(null)
    const [profileImageUrl, setProfileImageUrl] = useState('')
    const { uploadImage, uploading, error } = useImageUpload()

    const initialValues = {
        fullname: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    };

    const validateUsername = async (username) => {
        try {
            const response = await axios.get('/api/check-username', {
                params: rasel//{ username }
            });
            if (!response.data.available) {
                throw new Error('Username already taken');
            }
        } catch (error) {
            return error.message;
        }
    };


    const validationSchema = Yup.object({
        fullname: Yup.string()
            .min(3, 'Fullname too short!')
            .max(15, 'Fullname too long!')
            .required('Fullname is required'),
        username: Yup.string()
            .min(2, 'Username too short!')
            .max(15, 'Username too long!')
            .required('Username is required')
            .test('checkUsername', 'Username already taken', async (value) => {
                if (value) {
                    return await validateUsername(value);
                }
                return true;
            }),
        email: Yup.string()
            .email('Invalid email format')
            .required('Email is required'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                "Password must contain at least one uppercase letter, one lowercase letter, and one number"
            )
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required')
    });


    const onSubmit = async (values, { setSubmitting }) => {
        console.log('Form data', values);
        if (profileImage) {
            const imageUrl = await uploadImage(profileImage)
            if (imageUrl) {
                setProfileImageUrl(imageUrl)
                const formData = { ...values, photoURL: imageUrl }
                console.log(formData)
            }
        }
        setSubmitting(false);
    };

    const handleImageUpload = e => {
        const file = e.currentTarget.files[0];
        setProfileImage(file)
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImageUrl(reader.result)
            }
            reader.readAsDataURL(file)
        } else {
            setProfileImageUrl('')
        }
    }

    return (
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-center min-h-screen">
            <div className='flex-1 p-5 dark:bg-gray-800 bg-gray-300'>
                <h2 className='text-3xl font-semibold my-3 mb-5'>You're Most Welcome to Pet Adoption</h2>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {formik => (
                        <div className='flex flex-col lg:flex-row items-center'>
                            <Form>
                                <div className='flex flex-col md:flex-row'>
                                    <label htmlFor="fullname">Full Name</label>
                                    <Field className="mb-2 ml-3 dark:bg-gray-700 dark:text-white" type="text" id="fullname" name="fullname" />
                                    <ErrorMessage className='text-sm text-red-500' name="fullname" component="div" />
                                </div>
                                <div className='flex flex-col md:flex-row'>
                                    <label htmlFor="username">Username</label>
                                    <Field className="mb-2 ml-3 dark:bg-gray-700 dark:text-white" type="text" id="username" name="username" />
                                    <ErrorMessage className='text-sm text-red-500' name="username" component="div" />
                                </div>

                                <div className='flex flex-col md:flex-row'>
                                    <label htmlFor="email">Email</label>
                                    <Field className="mb-2 ml-3 dark:bg-gray-700 dark:text-white" type="email" id="email" name="email" />
                                    <ErrorMessage className='text-sm text-red-500' name="email" component="div" />
                                </div>

                                <div className='flex flex-col md:flex-row'>
                                    <label htmlFor="password">Password</label>
                                    <Field className="mb-2 ml-3 dark:bg-gray-700 dark:text-white" type="password" id="password" name="password" />
                                    <ErrorMessage className='text-sm text-red-500' name="password" component="div" />
                                </div>

                                <div className='flex flex-col md:flex-row'>
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <Field className="mb-2 ml-3 dark:bg-gray-700 dark:text-white" type="password" id="confirmPassword" name="confirmPassword" />
                                    <ErrorMessage className='text-sm text-red-500' name="confirmPassword" component="div" />
                                </div>
                                <div>
                                    <div className='flex flex-col md:flex-row'>
                                        <label htmlFor="profileImage">Profile Image</label>
                                        {uploading ? (
                                            <input type="file" id="profileImage"
                                            name="profileImage"
                                            className='ml-2'
                                            onChange={handleImageUpload} />
                                        ): <div>Uploadnig...</div>}
                                    </div>

                                    {error && <div>{error}</div>}

                                </div>

                                <Button className="py-1 my-1">
                                    <button type="submit" disabled={formik.isSubmitting}>Sign Up</button>
                                </Button>
                            </Form>
                            {profileImageUrl && (
                                <div className='flex'>
                                    <img src={profileImageUrl} alt="Profile Preview"
                                        style={{ width: '250px', height: '200px', marginTop: '10px' }} />
                                </div>)}
                        </div>
                    )}
                </Formik>
            </div>
            <div className='flex-1 p-5 '>
                <Lottie className='w-fit mx-auto' animationData={signupLottie}></Lottie>
            </div>
        </div>
    );
};

export default Register;


// Express.js example
// app.get('/api/check-username', async (req, res) => {
//     const { username } = req.query;
//     const user = await User.findOne({ username });
//     if (user) {
//         res.status(200).json({ available: false });
//     } else {
//         res.status(200).json({ available: true });
//     }
// });
