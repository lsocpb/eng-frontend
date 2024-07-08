import React, { useState } from 'react';
import axios from 'axios';
import {MDBBtn, MDBInput} from "mdb-react-ui-kit";

const ImageUpload = ({ onUploadSuccess }) => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!file) return;

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
            setError('Error uploading image');
            console.error('Error uploading image:', error);
        }
    };

    return (
        <div className="mt-2">
            <form onSubmit={handleSubmit}>
                <MDBInput type="file" onChange={handleFileChange} />
                <MDBBtn className="btn-danger mt-2" type="submit" disabled={loading}>
                    {loading ? 'Uploading...' : 'Upload Image'}
                </MDBBtn>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default ImageUpload;
