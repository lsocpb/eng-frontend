import React, { useState } from 'react';
import axios from 'axios';
import { MDBInput, MDBSpinner } from "mdb-react-ui-kit";
import { AllowedImageExtensions, MaxImageSize } from '../../constans/fileValidationConstans'
/**
 * Component for handling image uploads with validation and feedback.
 *
 * @component
 * @example
 * const handleUploadSuccess = (imageUrl) => {
 *   console.log("Uploaded image URL:", imageUrl);
 * };
 * return <ImageUpload onUploadSuccess={handleUploadSuccess} />;
 *
 * @param {Object} props - The component props.
 * @param {function} props.onUploadSuccess - Callback function to handle successful image upload. Receives the URL of the uploaded image as an argument.
 *
 * @returns {JSX.Element} A file input for uploading images with validation, loading state, and error handling.
 */
const ImageUpload = ({ onUploadSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Validates the selected file based on its extension and size.
     *
     * @param {File} file - The file to be validated.
     * @returns {string|null} An error message if validation fails, otherwise null.
     */
    const validateFile = (file) => {
        const fileExtension = file.name.split('.').pop().toLowerCase();
        if (!Object.values(AllowedImageExtensions).includes(fileExtension)) {
            return `Invalid file type. Allowed types are: ${Object.values(AllowedImageExtensions).join(', ')}`;
        }

        if (file.size > MaxImageSize.FIVE_MB) {
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
                accept={Object.values(AllowedImageExtensions).map(ext => `.${ext}`).join(',')}
            />
            {loading && <MDBSpinner className="mt-2" />}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default ImageUpload;
