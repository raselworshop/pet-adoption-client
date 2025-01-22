import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useImageUpload from '../../../Hooks/useImageUpload';
import Lottie from 'lottie-react';
import signupLottie from '../../../assets/lottie/signup.json';
import { Button } from '@/components/components/ui/button';
import SocialLogin from '../SocialLogin/SocialLogin';
import { DropdownMenuSeparator } from '@/components/components/ui/dropdown-menu';
import { Link, useNavigate } from 'react-router-dom';
import ButtonLoading from '@/components/components/ui/ButtonLoading';
import useAuth from '../../../Hooks/useAuth';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';

const Register = () => {
    const { createUser, updateUserProfile } = useAuth();
    const [profileImage, setProfileImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [profileImageUrl, setProfileImageUrl] = useState('');
    const { uploadUserImage, error } = useImageUpload();
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()

    const initialValues = {
        fullname: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    };

    const validationSchema = Yup.object({
        fullname: Yup.string()
            .min(3, 'Fullname too short!')
            .max(15, 'Fullname too long!')
            .required('Fullname is required'),
        username: Yup.string()
            .min(2, 'Username too short!')
            .max(15, 'Username too long!')
            .required('Username is required'),
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
        // console.log('Form data', values);
        // console.log('Form data', values.email);

        if (profileImage) {
            setUploading(true)
            try {
                const imageUrl = await uploadUserImage(profileImage);
                if (imageUrl) {
                    setProfileImageUrl(imageUrl);
                    values.photoURL = imageUrl;
                    // console.log('Form data with image URL:', values);
                }
            } catch (error) {
                // console.error('Image upload error:', error);
            } finally {
                setUploading(false);
            }
        }

        try {
            const response = await createUser(values.email, values.password);
            // console.log('User creation response:', response); //why only from here consoled above not under
            updateUserProfile(values.fullname, values.photoURL)
                .then(async (result) => {
                    // console.log('send to data base: ', result)
                    const userinfo = {
                        name: values.fullname,
                        email: values.email,
                        photo: values.photoURL,
                        userName: values.username,
                        role: 'user'
                    }
                    // console.table(userinfo)
                    try {
                        const res = await axiosPublic.post('/users', userinfo);
                        if (res.data.insertedId) {
                            toast.success(`successfully created user is ${values.fullname}`)
                            navigate('/')
                        }
                        // console.log('Response:', res.data);
                        // console.log('Axios Base URL:', axiosPublic.defaults.baseURL);

                    } catch (error) {
                        if (error.response) {
                            // console.error('Server Error:', error.response.data);
                            toast.error(error.response.data)
                        } else if (error.request) {
                            toast.error(error.request)
                            // console.error('No Response Received:', error.request);
                        } else {
                            toast.error(error.message)
                            // console.error('Axios Error:', error.message);
                        }
                    }
                })

        } catch (error) {
            // console.error('User creation error:', error);
            toast.error(error.message)
        } finally {
            setSubmitting(false);
        }
    };

    const handleImageUpload = (e) => {
        const file = e.currentTarget.files[0];
        setProfileImage(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImageUrl(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setProfileImageUrl('');
            setUploading(false)
        }
    };

    return (
        <div>
            <Helmet><title>PA || REGISTER</title></Helmet>
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-center min-h-screen">
            <div className='flex-1 p-5 dark:bg-gray-800 bg-gray-300'>
                <h2 className='text-3xl font-semibold my-3 mb-5'>You're Most Welcome to Pet Adoption</h2>
                <DropdownMenuSeparator />
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {formik => (
                        <div className='flex flex-col lg:flex-row items-center justify-between gap-5'>
                            <Form>
                                <div className='flex flex-col'>
                                    <label htmlFor="fullname">Full Name</label>
                                    <Field className="mb-2 dark:bg-gray-700 dark:text-white" type="text" id="fullname" name="fullname" />
                                    <ErrorMessage className='text-sm text-red-500' name="fullname" component="div" />
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor="username">Username</label>
                                    <Field className="mb-2 dark:bg-gray-700 dark:text-white" type="text" id="username" name="username" />
                                    <ErrorMessage className='text-sm text-red-500' name="username" component="div" />
                                </div>

                                <div className='flex flex-col'>
                                    <label htmlFor="email">Email</label>
                                    <Field className="mb-2 dark:bg-gray-700 dark:text-white" type="email" id="email" name="email" />
                                    <ErrorMessage className='text-sm text-red-500' name="email" component="div" />
                                </div>

                                <div className='flex flex-col'>
                                    <label htmlFor="password">Password</label>
                                    <Field className="mb-2 dark:bg-gray-700 dark:text-white" type="password" id="password" name="password" />
                                    <ErrorMessage className='text-sm text-red-500' name="password" component="div" />
                                </div>

                                <div className='flex flex-col '>
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <Field className="mb-2 dark:bg-gray-700 dark:text-white" type="password" id="confirmPassword" name="confirmPassword" />
                                    <ErrorMessage className='text-sm text-red-500' name="confirmPassword" component="div" />
                                </div>
                                <div>
                                    <div className='flex flex-col'>
                                        <label htmlFor="profileImage">Profile Image</label>
                                        {!uploading ? (
                                            <input type="file" id="profileImage"
                                                name="profileImage"
                                                className='ml-2'
                                                onChange={handleImageUpload} />
                                        ) : <ButtonLoading />}
                                    </div>

                                    {error && <div>{error}</div>}

                                </div>

                                <Button className="py-1 my-2" type="submit" disabled={formik.isSubmitting}>
                                    {formik.isSubmitting ? <ButtonLoading /> : 'Sign Up'}
                                </Button>
                                <DropdownMenuSeparator />
                                <div className='flex items-center justify-center'>
                                    <Link to={'/login'} className='hover:text-blue-700 hover:underline'>Login Here</Link>
                                </div>
                                <DropdownMenuSeparator />
                            </Form>
                            <div className='flex flex-col w-full'>
                                <div className='flex-1'>
                                    <SocialLogin></SocialLogin>
                                </div>
                                <DropdownMenuSeparator />
                                <div className='md:hidden lg:block flex-1'>
                                    {profileImageUrl && (
                                        <div className='flex'>
                                            <img src={profileImageUrl} alt="Profile Preview"
                                                style={{ width: '280px', height: '200px', marginTop: '10px' }} />
                                        </div>)}
                                </div>
                            </div>
                        </div>
                    )}
                </Formik>
            </div>
            <div className='flex-1 p-5 '>
                <div>
                    <Lottie className='w-fit mx-auto' animationData={signupLottie}></Lottie>
                </div>
                <div className='md:block lg:hidden hidden flex-1'>
                    {profileImageUrl && (
                        <div className='flex'>
                            <img src={profileImageUrl} alt="Profile Preview"
                                style={{ width: '280px', height: '200px', marginTop: '10px' }} />
                        </div>)}
                </div>
            </div>
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
