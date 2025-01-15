import axios from 'axios';
import React, { useState } from 'react';

const useCloudinary = () => {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);

    const uploadImage = async (file) => {
        setUploading(true);
        setError(null);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'image_upload')
        const apiKey = import.meta.env.VITE_CLOUDINARY;

        try {
            const response = await axios.post(`https://api.cloudinary.com/v1_1/${apiKey}/image/upload`, formData);
            setUploading(false);
            console.log('Cloudinary Response:', response.data);
            return response.data.url;
        } catch (error) {
            setUploading(false);
            setError('Error uploading image');
            console.error('Cloudinary Error:', error);
            return null;
        }
    };

    return { uploadImage, uploading, error };

};

export default useCloudinary;