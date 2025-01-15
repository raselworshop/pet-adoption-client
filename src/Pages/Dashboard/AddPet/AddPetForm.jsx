import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Select from 'react-select';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import useCloudinary from '../../../Hooks/useCloudinary';
import axios from 'axios';

const AddPetForm = () => {
  const [longDescription, setLongDescription] = useState('');
  const [petImage, setPetImage] = useState(null);
  const [petImageUrl, setPetImageUrl] = useState('');
  const { uploadImage, uploading, error } = useCloudinary();
  console.log('pet staste', petImageUrl)
  const initialValues = {
    petImage: null,
    petName: '',
    petAge: '',
    petCategory: '',
    petLocation: '',
    shortDescription: '',
    longDescription: '',
  };

  const petCategories = [
    { value: 'dog', label: 'Dog' },
    { value: 'cat', label: 'Cat' },
    { value: 'bird', label: 'Bird' },
    { value: 'other', label: 'Other' }
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
      // await axios.post('/api/pets', petData);
      alert('Pet added successfully!');
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
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ setFieldValue, isSubmitting, values }) => (
        <Form>
          <div>
            <label htmlFor="petImage">Pet Image</label>
            <input
              type="file"
              name="petImage"
              accept="image/*"
              onChange={handleImageUpload}
            />
            <ErrorMessage name="petImage" component="div" />
            {uploading && <div>Uploading...</div>} {/* Display loading indicator */}
          </div>

          <div>
            <label htmlFor="petName">Pet Name</label>
            <Field type="text" name="petName" />
            <ErrorMessage name="petName" component="div" />
          </div>

          <div>
            <label htmlFor="petAge">Pet Age</label>
            <Field type="text" name="petAge" />
            <ErrorMessage name="petAge" component="div" />
          </div>

          <div>
            <label htmlFor="petCategory">Pet Category</label>
            <Select
              name="petCategory"
              options={petCategories}
              onChange={(option) => setFieldValue('petCategory', option.value)}
            />
            <ErrorMessage name="petCategory" component="div" />
          </div>

          <div>
            <label htmlFor="petLocation">Pet Location</label>
            <Field type="text" name="petLocation" />
            <ErrorMessage name="petLocation" component="div" />
          </div>

          <div>
            <label htmlFor="shortDescription">Short Description</label>
            <Field type="text" name="shortDescription" />
            <ErrorMessage name="shortDescription" component="div" />
          </div>

          <div>
            <label htmlFor="longDescription">Long Description</label>
            <ReactQuill
              value={longDescription}
              onChange={(value) => {
                setLongDescription(value);
                setFieldValue('longDescription', value);
              }}
            />
            <ErrorMessage name="longDescription" component="div" />
          </div>

          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
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
  );
};

export default AddPetForm;
