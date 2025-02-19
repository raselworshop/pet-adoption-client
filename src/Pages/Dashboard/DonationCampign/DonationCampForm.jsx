import { Button } from '@/components/components/ui/button';
import ButtonLoading from '@/components/components/ui/ButtonLoading';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast';
import ReactQuill from 'react-quill';
import useCloudinary from '../../../Hooks/useCloudinary';
import * as Yup from 'yup';
import useAxiosPrivate from '../../../Hooks/useAxiosPrivate';
import useAuth from '../../../Hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const DonationCampForm = () => {
    const { uploadImage, uploading, error } = useCloudinary()
    const [campaignImageUrl, setCampaignImageUrl] = useState('')
    const [longDescription, setLongDescription] = useState('')
    const axiosPrivate = useAxiosPrivate()
    const { user } = useAuth()
    const navigate = useNavigate()

    const initialValues = {
        petName: '',
        petImage: null,
        maxDonation: '',
        lastDate: '',
        shortDescription: '',
        longDescription: '',
    }

    const validationSchema = Yup.object().shape({
        petImage: Yup.mixed().required("Pet picture is required!"),
        maxDonation: Yup.number().required("Maximum donation amount is required!").positive("Amount must be positive"),
        lastDate: Yup.date().required('Last date of donation is required!').min(new Date(), 'Date must be in the future'),
        shortDescription: Yup.string().required('Short description is required'),
        longDescription: Yup.string().required('Long description is required')
    })

    const handleImageUpload = async (e, setFieldValue) => {
        const file = e.target.files[0];
        if (!file) {
            toast.error('File not selected');
            return;
        }
        if (file.size > 5 * 1024 * 1024) {//5MB limit
            toast.error("File size exceeds 5MB.")
            return;
        }
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']
        if (!allowedTypes.includes(file.type)) {
            toast.error('Unsupported file formate. Please upload jpeg, png or gif');
            return;
        }
        try {
            const res = await uploadImage(file)
            // console.log(res)
            if (res.url) {
                setFieldValue('petImage', res.url)
                setCampaignImageUrl(res.url)
                toast.success("Image upload successfully")
            } else {
                toast.error('Image upload failed')
            }
        } catch (error) {
            // console.log('Error uploading image', error)
            toast.error(error.message)
        }
    }

    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            const campaignData = {
                ...values,
                petImage: campaignImageUrl,
                longDescription,
                createdAt: new Date().toISOString(),
                ownerMail: user?.email,
                ownerName: user?.displayName
            }
            // console.table(campaignData)
            const { data } = await axiosPrivate.post('/donation-campaigns', campaignData)
            // console.log(data)
            if (data.status === 201 || data.status === 200 || data.insertedId) {
                toast.success("Donation campaign created successfully")
                navigate("/dashboard/myCampaignsReport")
            }
        } catch (error) {
            // console.log('check error post a camp', error)
            setErrors({ submit: 'Failed to create donation campaign. Please try again!' })
        } finally {
            setSubmitting(false)
        }
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
            <Helmet><title>PA || Create Donation Campaign</title></Helmet>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ setFieldValue, isSubmitting }) => (
                    <Form className="space-y-6">
                        <h2 className='text-3xl font-semibold text-gray-900 dark:text-white mb-4 text-center'>Create Donation Campaign</h2>
                        
                        <div className="space-y-2">
                            <label htmlFor="petName" className="block font-medium text-gray-700 dark:text-gray-300">Pet Name</label>
                            <Field className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white" type="text" name="petName" />
                            <ErrorMessage className='text-red-500 text-sm' name="petName" component="div" />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="petImage" className="block font-medium text-gray-700 dark:text-gray-300">Pet Picture</label>
                            <input className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white" type="file" name="petImage" accept="image/*" onChange={(e) => handleImageUpload(e, setFieldValue)} />
                            <ErrorMessage className='text-red-500 text-sm' name="petImage" component="div" />
                            {uploading && <ButtonLoading />}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="maxDonation" className="block font-medium text-gray-700 dark:text-gray-300">Maximum Donation Amount</label>
                            <Field className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white" type="number" name="maxDonation" />
                            <ErrorMessage className='text-red-500 text-sm' name="maxDonation" component="div" />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="lastDate" className="block font-medium text-gray-700 dark:text-gray-300">Last Date of Donation</label>
                            <Field className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white" type="date" name="lastDate" />
                            <ErrorMessage className='text-red-500 text-sm' name="lastDate" component="div" />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="shortDescription" className="block font-medium text-gray-700 dark:text-gray-300">Short Description</label>
                            <Field className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white" type="text" name="shortDescription" />
                            <ErrorMessage className='text-red-500 text-sm' name="shortDescription" component="div" />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="longDescription" className="block font-medium text-gray-700 dark:text-gray-300">Long Description</label>
                            <ReactQuill className="bg-white dark:bg-gray-700 rounded-lg p-2" value={longDescription} onChange={(value) => {
                                setLongDescription(value);
                                setFieldValue('longDescription', value);
                            }} />
                            <ErrorMessage className='text-red-500 text-sm' name="longDescription" component="div" />
                        </div>

                        <div className="flex justify-center">
                            <Button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700" type="submit" disabled={isSubmitting}>Submit</Button>
                        </div>

                        {campaignImageUrl && (
                            <div className="flex justify-center mt-4">
                                <img src={campaignImageUrl} alt="Campaign Preview" className="w-64 h-48 rounded-lg shadow-md" />
                            </div>
                        )}
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default DonationCampForm;