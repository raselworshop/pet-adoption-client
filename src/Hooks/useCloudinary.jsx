import { useState } from 'react';
import axios from 'axios';

const useCloudinary = () => {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);

    const uploadImage = async (file) => {
        setUploading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', import.meta.env.VITE_CLOUD_PRESET);

            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`,
                formData
            );

            if (response.data.secure_url) {
                return { success: true, url: response.data.secure_url };
            } else {
                throw new Error('Failed to get image URL from Cloudinary');
            }
        } catch (err) {
            setError({
                message: err.message,
                details: err.response?.data || 'No additional details',
            });
            console.error('Image upload error:', err);
            return { success: false, url: null };
        } finally {
            setUploading(false);
        }
    };

    return { uploadImage, uploading, error };
};

export default useCloudinary;
