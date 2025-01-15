import { useState } from 'react';
import axios from 'axios';

const useImageUpload = () => {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);

    const uploadImage = async (file) => {
        setUploading(true);
        setError(null);

        const formData = new FormData();
        formData.append('image', file);
        const apiKey = import.meta.env.VITE_IMGBB; 

        try {
            const response = await axios.post(`https://api.imgbb.com/1/upload?key=${apiKey}`, formData);
            setUploading(false);
            return response.data.data.url;
        } catch (error) {
            setUploading(false);
            setError('Error uploading image');
            return null;
        }
    };

    return { uploadImage, uploading, error };
};

export default useImageUpload;
