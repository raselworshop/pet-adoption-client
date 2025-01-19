import axios from 'axios';
import { useState } from 'react';

const useCloudinary = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const uploadImage = async (file) => {
    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', "image_me");
    formData.append('cloud_name', import.meta.env.VITE_CLOUD_NAME);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`,
        formData
      );

      if (response.status === 200) {
        return { success: true, url: response.data.secure_url };
      } else {
        return { success: false, url: null };
      }
    } catch (error) {
      setError('Image upload failed');
      return { success: false, url: null };
    } finally {
      setUploading(false);
    }
  };

  return { uploadImage, uploading, error };
};

export default useCloudinary;
