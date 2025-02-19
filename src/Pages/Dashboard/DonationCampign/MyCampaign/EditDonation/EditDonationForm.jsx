import { Button } from "@/components/components/ui/button";
import ButtonLoading from "@/components/components/ui/ButtonLoading";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";
import useCloudinary from "../../../../../Hooks/useCloudinary";
import * as Yup from "yup";
import useAxiosPrivate from "../../../../../Hooks/useAxiosPrivate";
import useAuth from "../../../../../Hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";
import useEditDonation from "../../../../../Hooks/useEditDonation";

const EditDonationForm = () => {
  const { uploadImage, uploading, error } = useCloudinary();
  const [campaignImageUrl, setCampaignImageUrl] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateCamp, refetch, isLoading } = useEditDonation();
  // console.log('id from myCamp', id)
  // console.log('DATA from useEdit to myCamp', updateCamp)

  const initialValues = {
    petName: updateCamp.petName || "",
    petImage: updateCamp.petImage || null,
    maxDonation: updateCamp.maxDonation || "",
    lastDate: updateCamp.lastDate || "",
    shortDescription: updateCamp.shortDescription || "",
    longDescription: updateCamp.longDescription || "",
  };

  const validationSchema = Yup.object().shape({
    petImage: Yup.mixed().required("Pet picture is required!"),
    maxDonation: Yup.number()
      .required("Maximum donation amount is required!")
      .positive("Amount must be positive"),
    lastDate: Yup.date()
      .required("Last date of donation is required!")
      .min(new Date(), "Date must be in the future"),
    shortDescription: Yup.string().required("Short description is required"),
    longDescription: Yup.string().required("Long description is required"),
  });

  const handleImageUpload = async (e, setFieldValue) => {
    const file = e.target.files[0];
    if (!file) {
      toast.error("File not selected");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      //5MB limit
      toast.error("File size exceeds 5MB.");
      return;
    }
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Unsupported file formate. Please upload jpeg, png or gif");
      return;
    }
    try {
      const res = await uploadImage(file);
      // console.log(res)
      if (res.url) {
        setFieldValue("petImage", res.url);
        setCampaignImageUrl(res.url);
        toast.success("Image upload successfully");
      } else {
        toast.error("Image upload failed");
      }
    } catch (error) {
      // console.log('Error uploading image', error)
      toast.error(error.message);
    }
  };

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const campaignData = {
        ...values,
        petImage: campaignImageUrl || updateCamp.petImage,
        longDescription,
        updatedAt: new Date().toISOString(),
        ownerMail: user?.email,
        ownerName: user?.displayName,
      };
      // console.table(campaignData)
      const { data } = await axiosPrivate.put(
        `/donation-campaigns/${id}`,
        campaignData
      );
      // console.log(data)
      if (data.status === 201 || data.status === 200 || data.modifiedCount) {
        toast.success("Donation campaign updated successfully");
        navigate("/dashboard/my-donations");
        refetch();
      }
    } catch (error) {
      // console.log('check error post a camp', error)
      setErrors({
        submit: "Failed to create donation campaign. Please try again!",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className=" mx-auto p-4 bg-white dark:bg-gray-900 shadow-lg rounded-lg">
      <Helmet>
        <title>PA || Update Donation Campaign</title>
      </Helmet>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, isSubmitting }) => (
          <div>
            <h2 className="text-3xl font-semibold mb-6 text-center">
              Update Donation Campaign
            </h2>
            <Form className="space-y-4">
              <div>
                <label className="block font-medium" htmlFor="petName">
                  Pet Name
                </label>
                <Field
                  className="w-full dark:bg-gray-700 border p-2 rounded"
                  type="text"
                  name="petName"
                />
                <ErrorMessage
                  className="text-red-500 text-sm"
                  name="petName"
                  component="div"
                />
              </div>
              <div>
                <label className="block font-medium" htmlFor="petImage">
                  Pet Picture
                </label>
                <input
                  className="w-full p-2 border rounded"
                  type="file"
                  name="petImage"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, setFieldValue)}
                />
                <ErrorMessage
                  className="text-red-500 text-sm"
                  name="petImage"
                  component="div"
                />
                {uploading && <ButtonLoading />}
              </div>
              <div>
                <label className="block font-medium" htmlFor="maxDonation">
                  Maximum Donation Amount
                </label>
                <Field
                  className="w-full dark:bg-gray-700 border p-2 rounded"
                  type="text"
                  name="maxDonation"
                />
                <ErrorMessage
                  className="text-red-500 text-sm"
                  name="maxDonation"
                  component="div"
                />
              </div>
              <div>
                <label className="block font-medium" htmlFor="lastDate">
                  Last Date of Donation
                </label>
                <Field
                  className="w-full dark:bg-gray-700 border p-2 rounded"
                  type="date"
                  name="lastDate"
                />
                <ErrorMessage
                  className="text-red-500 text-sm"
                  name="lastDate"
                  component="div"
                />
              </div>
              <div>
                <label className="block font-medium" htmlFor="shortDescription">
                  Short Description
                </label>
                <Field
                  className="w-full dark:bg-gray-700 border p-2 rounded"
                  type="text"
                  name="shortDescription"
                />
                <ErrorMessage
                  className="text-red-500 text-sm"
                  name="shortDescription"
                  component="div"
                />
              </div>
              <div>
                <label className="block font-medium" htmlFor="longDescription">
                  Long Description
                </label>
                <ReactQuill
                  className="bg-white dark:bg-gray-700 border rounded"
                  value={longDescription || initialValues.longDescription}
                  onChange={(value) => {
                    setLongDescription(value);
                    setFieldValue("longDescription", value);
                  }}
                />
                <ErrorMessage
                  className="text-red-500 text-sm"
                  name="longDescription"
                  component="div"
                />
              </div>
              <button
                className="w-full bg-blue-500 hover:bg-blue-700 text-white p-2 rounded"
                type="submit"
                disabled={isSubmitting}
              >
                Submit
              </button>
              {campaignImageUrl ||
                (initialValues.petImage && (
                  <div className="flex justify-center mt-4">
                    <img
                      src={campaignImageUrl || initialValues.petImage}
                      alt="Campaign Preview"
                      className="w-64 h-48 object-cover rounded"
                    />
                  </div>
                ))}
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default EditDonationForm;
