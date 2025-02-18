import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Select from "react-select";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button } from "@/components/components/ui/button";
import ButtonLoading from "@/components/components/ui/ButtonLoading";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import toast from "react-hot-toast";
import useAuth from "../../../Hooks/useAuth";
import { Helmet } from "react-helmet";
import * as Yup from "yup";
import useCloudinary from "../../../Hooks/useCloudinary";
import { useNavigate } from "react-router-dom";

const AddPetForm = () => {
  const { user } = useAuth();
  const [longDescription, setLongDescription] = useState("");
  const { uploadImage, uploading, error } = useCloudinary();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  // console.log('pet staste', user?.displayName,
  //    user?.email)

  const initialValues = {
    petImage: null,
    petName: "",
    petAge: "",
    petCategory: "",
    petLocation: "",
    shortDescription: "",
    longDescription: "",
    ownerName: user?.displayName,
    ownerMail: user?.email,
  };
  const validationSchema = Yup.object().shape({
    petImage: Yup.mixed().required("Pet image is required"),
    petName: Yup.string().required("Pet name is required"),
    petAge: Yup.number()
      .required("Pet age is required")
      .min(0, "Pet age cannot be negative"),
    petCategory: Yup.string().required("Pet category is required"),
    petLocation: Yup.string().required("Pet location is required"),
    shortDescription: Yup.string().required("Short description is required"),
    longDescription: Yup.string().required("Long description is required"),
  });

  const petCategories = [
    { value: "dog", label: "Dog" },
    { value: "cat", label: "Cat" },
    { value: "bird", label: "Bird" },
    { value: "rabbit", label: "Rabbit" },
    { value: "Fish", label: "Fish" },
  ];
  const handleImageUpload = async (e, setFieldValue) => {
    const file = e.target.files[0];
    if (!file) {
      toast.error("No file selected.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      toast.error("File size exceeds 5MB.");
      return;
    }
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Unsupported file format. Please upload JPEG, PNG, or GIF.");
      return;
    }
    try {
      const response = await uploadImage(file);
      if (response.url) {
        setFieldValue("petImage", response.url);
        toast.success("Image uploaded successfully!");
      } else {
        toast.error("Image upload failed.");
      }
    } catch (error) {
      toast.error("Error uploading image.");
    }
  };

  if (!user || !user.email) {
    return <div>Please log in to access this form.</div>;
  }

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    // console.log('image before upload', values.petImage)
    try {
      const petData = {
        ...values,
        longDescription: longDescription,
        dateAdded: new Date().toISOString(),
        isAdopted: false,
      };

      // console.table(petData)
      if (user && user.email) {
        const res = await axiosPrivate.post("/pets", petData);
        if (res.status === 200) {
          toast.success("Pet added successfully!");
          navigate("/dashboard/myPets");
        }
      } else {
        return toast.error("Please login first");
      }
      // alert('Pet added successfully!');
    } catch (error) {
      setErrors({ submit: "Failed to add pet. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-5 space-y-4 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-colors duration-300">
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800 dark:text-white">
        Add a Pet
      </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, isSubmitting, values }) => (
          <Form className="space-y-6">
            {/* Pet Image */}
            <div>
              <label
                htmlFor="petImage"
                className="block text-lg font-medium text-gray-700 dark:text-gray-200"
              >
                Pet Image
              </label>
              <input
                className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                type="file"
                name="petImage"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, setFieldValue)}
              />
              <ErrorMessage
                className="text-red-500 text-sm mt-1"
                name="petImage"
                component="div"
              />
              {uploading && <ButtonLoading />}
            </div>

            {/* Pet Name */}
            <div>
              <label
                htmlFor="petName"
                className="block text-lg font-medium text-gray-700 dark:text-gray-200"
              >
                Pet Name
              </label>
              <Field
                className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                type="text"
                name="petName"
              />
              <ErrorMessage
                className="text-red-500 text-sm mt-1"
                name="petName"
                component="div"
              />
            </div>

            {/* Pet Age */}
            <div>
              <label
                htmlFor="petAge"
                className="block text-lg font-medium text-gray-700 dark:text-gray-200"
              >
                Pet Age
              </label>
              <Field
                className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                type="text"
                name="petAge"
              />
              <ErrorMessage
                className="text-red-500 text-sm mt-1"
                name="petAge"
                component="div"
              />
            </div>

            {/* Pet Category */}
            <div>
              <label
                htmlFor="petCategory"
                className="block text-lg font-medium text-gray-700 dark:text-gray-200"
              >
                Pet Category
              </label>
              <Select
                className="w-full bg-gray-100 dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                name="petCategory"
                options={petCategories}
                onChange={(option) =>
                  setFieldValue("petCategory", option.value)
                }
                styles={{
                  control: (provided) => ({
                    ...provided,
                    backgroundColor: "transparent",
                    border: "none",
                    boxShadow: "none",
                  }),
                  menu: (provided) => ({
                    ...provided,
                    backgroundColor: "#f3f4f6", // Light mode background
                    color: "#1f2937", // Light mode text
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isSelected ? "#3b82f6" : "#f3f4f6", // Light mode selected option
                    color: state.isSelected ? "#e5e7eb" : "#1f2937", // Light mode text
                  }),
                }}
              />
              <ErrorMessage
                className="text-red-500 text-sm mt-1"
                name="petCategory"
                component="div"
              />
            </div>

            {/* Pet Location */}
            <div>
              <label
                htmlFor="petLocation"
                className="block text-lg font-medium text-gray-700 dark:text-gray-200"
              >
                Pet Location
              </label>
              <Field
                className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                type="text"
                name="petLocation"
              />
              <ErrorMessage
                className="text-red-500 text-sm mt-1"
                name="petLocation"
                component="div"
              />
            </div>

            {/* Short Description */}
            <div>
              <label
                htmlFor="shortDescription"
                className="block text-lg font-medium text-gray-700 dark:text-gray-200"
              >
                Short Description
              </label>
              <Field
                className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                type="text"
                name="shortDescription"
              />
              <ErrorMessage
                className="text-red-500 text-sm mt-1"
                name="shortDescription"
                component="div"
              />
            </div>

            {/* Long Description */}
            <div>
              <label
                htmlFor="longDescription"
                className="block text-lg font-medium text-gray-700 dark:text-gray-200"
              >
                Long Description
              </label>
              <ReactQuill
                className="w-full bg-transparent focus:outline-none  dark:bg-transparent rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                value={longDescription}
                onChange={(value) => {
                  setLongDescription(value);
                  setFieldValue("longDescription", value);
                }}
                theme="snow"
              />
              <ErrorMessage
                className="text-red-500 text-sm mt-1"
                name="longDescription"
                component="div"
              />
            </div>

            {/* Submit Button */}
            <Button
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>

            {/* Image Preview */}
            {values.petImage && (
              <div className="flex justify-center">
                <img
                  src={values.petImage}
                  alt="Pet Preview"
                  className="rounded-lg shadow-md"
                  style={{ width: "250px", height: "200px", marginTop: "10px" }}
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
