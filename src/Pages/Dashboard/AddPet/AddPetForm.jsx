import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Select from 'react-select';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import useCloudinary from '../../../Hooks/useCloudinary';
import { Button } from '@/components/components/ui/button';
import ButtonLoading from '@/components/components/ui/ButtonLoading';
import useAxiosPrivate from '../../../Hooks/useAxiosPrivate';
import toast from 'react-hot-toast';
import useAuth from '../../../Hooks/useAuth';
import { Helmet } from 'react-helmet';

const AddPetForm = () => {
  const { user } = useAuth()
  const [longDescription, setLongDescription] = useState('');
  const [petImage, setPetImage] = useState(null);
  const [petImageUrl, setPetImageUrl] = useState('');
  const { uploadImage, uploading, error } = useCloudinary();
  const axiosPrivate = useAxiosPrivate()
  console.log('pet staste', petImageUrl)

  const initialValues = {
    petImage: null,
    petName: '',
    petAge: '',
    petCategory: '',
    petLocation: '',
    shortDescription: '',
    longDescription: '',
    ownerName: user?.displayName,
    ownerMail: user?.email
  };

  const petCategories = [
    { value: 'dog', label: 'Dog' },
    { value: 'cat', label: 'Cat' },
    { value: 'bird', label: 'Bird' },
    { value: 'rabbit', label: 'Rabbit' },
    { value: 'Fish', label: 'Fish' }
  ];

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      let imageUrl = '';
      if (petImage) {
        imageUrl = await uploadImage(petImage);
        console.log(imageUrl)
        setPetImageUrl(imageUrl);
      }

      const petData = {
        ...values,
        petImage: imageUrl,
        longDescription: longDescription,
        dateAdded: new Date().toISOString(),
        isAdopted: false,
      };

      console.table(petData)
      if (user && user.email) {
        const res = await axiosPrivate.post('/pets', petData);
        if (res.status === 200) {
          toast.success("Pet added successfully!")
        }
      } else {
        return toast.error('Please login first')
      }
      // alert('Pet added successfully!');
    } catch (error) {
      setErrors({ submit: 'Failed to add pet. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.currentTarget.files[0];
    setPetImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPetImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPetImageUrl('');
    }
  };

  return (
    <div>
      <Helmet><title>PA || PET ADD</title></Helmet>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ setFieldValue, isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="petImage">Pet Image</label>
              <input
                className="m-2"
                type="file"
                name="petImage"
                accept="image/*"
                onChange={handleImageUpload}
              />
              <ErrorMessage name="petImage" component="div" />
              {uploading && <ButtonLoading />}
            </div>

            <div>
              <label htmlFor="petName">Pet Name</label>
              <Field className="dark:bg-gray-700 border m-2" type="text" name="petName" />
              <ErrorMessage name="petName" component="div" />
            </div>

            <div>
              <label htmlFor="petAge">Pet Age</label>
              <Field className="dark:bg-gray-700 border m-2" type="text" name="petAge" />
              <ErrorMessage name="petAge" component="div" />
            </div>

            <div>
              <label htmlFor="petCategory">Pet Category</label>
              <Select
                className=" bg-gray-300 dark:bg-gray-700 border m-2"
                name="petCategory"
                options={petCategories}
                onChange={(option) => setFieldValue('petCategory', option.value)}
              />
              <ErrorMessage name="petCategory" component="div" />
            </div>

            <div>
              <label htmlFor="petLocation">Pet Location</label>
              <Field className="dark:bg-gray-700 border m-2" type="text" name="petLocation" />
              <ErrorMessage name="petLocation" component="div" />
            </div>

            <div className='my-2 flex flex-col lg:flex-row items-center'>
              <label htmlFor="shortDescription">Short Description: </label>
              <Field className="dark:bg-gray-700 border m-2" type="text" name="shortDescription" />
              <ErrorMessage name="shortDescription" component="div" />
            </div>

            <div className='my-2'>
              <label htmlFor="longDescription">Long Description</label>
              <ReactQuill
                className="m-2"
                value={longDescription}
                onChange={(value) => {
                  setLongDescription(value);
                  setFieldValue('longDescription', value);
                }}
              />
              <ErrorMessage name="longDescription" component="div" />
            </div>

            <Button className="my-2" type="submit" disabled={isSubmitting}>
              Submit
            </Button>
            <ErrorMessage name="submit" component="div" />
            {petImageUrl && (
              <div className="flex">
                <img
                  src={petImageUrl}
                  alt="Pet Preview"
                  style={{ width: '250px', height: '200px', marginTop: '10px' }}
                />
              </div>
            )}

          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddPetForm;
