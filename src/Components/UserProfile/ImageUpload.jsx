import React, { useState } from 'react';
import axios from 'axios';
import { MDBInput, MDBSpinner } from "mdb-react-ui-kit";

const ImageUpload = ({ onUploadSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const ALLOWED_IMAGE_EXTENSIONS = ['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp'];
    const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

    const validateFile = (file) => {
        const fileExtension = file.name.split('.').pop().toLowerCase();
        if (!ALLOWED_IMAGE_EXTENSIONS.includes(fileExtension)) {
            return "Invalid file type. Allowed types are: " + ALLOWED_IMAGE_EXTENSIONS.join(', ');
        }

        if (file.size > MAX_IMAGE_SIZE) {
            return "File size too large. Maximum size is 5MB.";
        }

        return null;
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const validationError = validateFile(file);
        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:8000/upload_profile_image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${sessionStorage.getItem('active-user')}`
                }
            });
            setLoading(false);
            onUploadSuccess(response.data.url);
        } catch (error) {
            setLoading(false);
            if (error.response && error.response.status === 400) {
                setError(error.response.data.detail);
            } else {
                setError('Error uploading image');
            }
            console.error('Error uploading image:', error);
        }
    };

    return (
        <div className="mt-2">
            <MDBInput
                type="file"
                onChange={handleFileChange}
                disabled={loading}
                accept={ALLOWED_IMAGE_EXTENSIONS.map(ext => `.${ext}`).join(',')}
            />
            {loading && <MDBSpinner className="mt-2" />}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default ImageUpload;