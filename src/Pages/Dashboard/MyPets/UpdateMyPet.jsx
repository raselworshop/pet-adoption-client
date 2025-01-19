import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Select from 'react-select';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button } from '@/components/components/ui/button';
import ButtonLoading from '@/components/components/ui/ButtonLoading';
import useAxiosPrivate from '../../../Hooks/useAxiosPrivate';
import toast from 'react-hot-toast';
import useAuth from '../../../Hooks/useAuth';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import useCloudinary from '../../../Hooks/useCloudinary';
import usePetUpdate from '../../../Hooks/usePetUpdate';
import { useParams } from 'react-router-dom';

const stripHtmlTags = (str) => {
  if (!str) return '';
  return str.replace(/<\/?[^>]+(>|$)/g, "");
};


const UpdateMyPet = () => {
  const { user } = useAuth()
  const [longDescription, setLongDescription] = useState('');
  const { uploadImage, uploading, error } = useCloudinary();
  const axiosPrivate = useAxiosPrivate()
  const { id } = useParams()
  const { updatePet, refetch, isLoading, isFetching } = usePetUpdate()
  console.log(
    'pet staste',
    user?.displayName,
    user?.email,
    updatePet
  )
  if(isFetching) return <div>Data Fetching..</div>
 if(isLoading) return <ButtonLoading/>
  const initialValues = {
    petImage: updatePet?.petImage || null,
    petName: updatePet?.petName || '',
    petAge: updatePet?.petAge || '',
    petCategory: updatePet?.petCategory || '',
    petLocation: updatePet?.petLocation || '',
    shortDescription: updatePet?.shortDescription || '',
    longDescription: stripHtmlTags(updatePet.longDescription) || '',
    ownerName: user?.displayName,
    ownerMail: user?.email
  };
  const validationSchema = Yup.object().shape({
    petImage: Yup.mixed().required('Pet image is required'),
    petName: Yup.string().required('Pet name is required'),
    petAge: Yup.number()
      .required('Pet age is required')
      .min(0, 'Pet age cannot be negative'),
    petCategory: Yup.string().required('Pet category is required'),
    petLocation: Yup.string().required('Pet location is required'),
    shortDescription: Yup.string().required('Short description is required'),
    longDescription: Yup.string().required('Long description is required'),
  });

  const petCategories = [
    { value: 'dog', label: 'Dog' },
    { value: 'cat', label: 'Cat' },
    { value: 'bird', label: 'Bird' },
    { value: 'rabbit', label: 'Rabbit' },
    { value: 'Fish', label: 'Fish' }
  ];
  const handleImageUpload = async (e, setFieldValue) => {
    const file = e.target.files[0];
    if (!file) {
      toast.error('No file selected.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast.error('File size exceeds 5MB.');
      return;
    }
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Unsupported file format. Please upload JPEG, PNG, or GIF.');
      return;
    }
    try {
      const response = await uploadImage(file);
      if (response.url) {
        setFieldValue('petImage', response.url);
        toast.success('Image uploaded successfully!');
      } else {
        toast.error('Image upload failed.');
      }
    } catch (error) {
      toast.error('Error uploading image.');
    }
  };

  if (!user || !user.email || !user.displayName) {
    return <div>Please log in to access this form.</div>;
  }

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    console.log('image before upload', values.petImage)
    try {

      const petData = {
        ...values,
        longDescription: longDescription,
        dateAdded: new Date().toISOString(),
        isAdopted: false,
      };

      console.table(petData)
      if (!petData) {
        toast.error('Pet data is missing or invalid.');
        return;
      }
      if (user && user.email) {
        const res = await axiosPrivate.put(`/my-pets/${id}`, petData);
        console.log(res.data)
        if (res.result.modifiedCount===0) {
          refetch()
          toast.success("Pet upadted successfully!")
        }
      } else {
        return toast.error('Please login first')
      }
    } catch (error) {
      console.log(error)
      setErrors({ submit: 'Failed to update pet. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div>
      <Helmet><title>PA || PET UPDATE</title></Helmet>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ setFieldValue, isSubmitting, values }) => (
          <div>
            <h2 className='text-3xl font-semibold mb-6'>Upadte a Pet</h2>
            <Form>
              <div>
                <label htmlFor="petImage">Pet Image</label>
                <input
                  className="m-2"
                  type="file"
                  name="petImage"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, setFieldValue)}
                />
                <ErrorMessage className='text-red-500 text-sm' name="petImage" component="div" />
                {uploading && <ButtonLoading />}
              </div>

              <div>
                <label htmlFor="petName">Pet Name</label>
                <Field className="dark:bg-gray-700 border m-2" type="text" name="petName" />
                <ErrorMessage className='text-red-500 text-sm' name="petName" component="div" />
              </div>

              <div>
                <label htmlFor="petAge">Pet Age</label>
                <Field className="dark:bg-gray-700 border m-2" type="text" name="petAge" />
                <ErrorMessage className='text-red-500 text-sm' name="petAge" component="div" />
              </div>

              <div>
                <label htmlFor="petCategory">Pet Category</label>
                <Select
                  className=" bg-gray-300 dark:bg-gray-700 border m-2"
                  name="petCategory"
                  options={petCategories}
                  onChange={(option) => setFieldValue('petCategory', option.value)}
                />
                <ErrorMessage className='text-red-500 text-sm' name="petCategory" component="div" />
              </div>

              <div>
                <label htmlFor="petLocation">Pet Location</label>
                <Field className="dark:bg-gray-700 border m-2" type="text" name="petLocation" />
                <ErrorMessage className='text-red-500 text-sm' name="petLocation" component="div" />
              </div>

              <div className='my-2 flex flex-col'>
                <div>
                  <label htmlFor="shortDescription">Short Description: </label>
                  <Field className="dark:bg-gray-700 border m-2" type="text" name="shortDescription" />
                </div>
                <ErrorMessage className='text-red-500 text-sm' name="shortDescription" component="div" />
              </div>

              <div className='my-2'>
                <label htmlFor="longDescription">Long Description</label>
                <ReactQuill
                  className="m-2"
                  value={longDescription || initialValues.longDescription}
                  onChange={(value) => {
                    setLongDescription(value);
                    setFieldValue('longDescription', value);
                  }}
                />
                <ErrorMessage className='text-red-500 text-sm' name="longDescription" component="div" />
              </div>

              <Button className="my-2" type="submit" disabled={isSubmitting}>
                Submit
              </Button>
              <ErrorMessage className='text-red-500 text-sm' name="submit" component="div" />
              {values.petImage && (
                <div className="flex">
                  <img
                    src={values.petImage}
                    alt="Pet Preview"
                    style={{ width: '250px', height: '200px', marginTop: '10px' }}
                  />
                </div>
              )}

            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default UpdateMyPet;
