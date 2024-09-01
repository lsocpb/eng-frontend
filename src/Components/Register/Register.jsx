import React, {useState} from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBCardBody,
    MDBCol,
    MDBRow,
    MDBInput,
    MDBIcon
}
    from 'mdb-react-ui-kit';
import './Register.css'
import withAuthRedirect from "../AuthRedirect/withAuthRedirect";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {showSuccessToast, showErrorToast} from "../ToastNotifications/ToastNotifications";
import {BASE_API_URL} from "../../api/config";
import axios from "axios";

/**
 * The `Register` component renders a user registration form.
 * On successful registration, the user is redirected to the login page.
 */
function Register() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');

    /**
     * Validates the form fields to ensure that all required fields are filled.
     *
     * @returns {boolean} - Returns `true` if all required fields are filled; otherwise, returns `false`.
     *                      If any required field is missing, an error toast is shown and the function returns `false`.
     */
    const validateForm = () => {
        if (!username || !password || !email || !street || !city || !zip || !phone) {
            showErrorToast('Username and password are required');
            return false;
        }
        setError('');
        return true;
    };

    /**
     * Handles form submission by sending a POST request to the registration endpoint.
     *
     * @param {React.FormEvent} e - The form submit event.
     * @returns {void}
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        const payload = {
            username,
            password,
            email,
            phone,
            address: {
                street,
                city,
                zip
            }
        };

        try {
            const response = await axios.post(
                `${BASE_API_URL}/auth/register`,
                payload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                showErrorToast(errorData.detail || 'Register failed');
            }

            const data = await response.json();
            showSuccessToast(data.message || 'Register successful');
            setTimeout(() => {
                window.location.href = "/login";
            }, 1000);
        } catch (error) {
            console.error('Error:', error);
            setError('An unexpected error occurred. Please try again later.');
        }
    };

    return (
        <MDBContainer className='overflow-hidden my-5'>
            <MDBCol className='mb-5 p-5 justify-content-center align-items-center'>
                <MDBCardBody className='d-flex flex-column text-center justify-content-center align-items-center'>

                    <h2 className="fw-bold mb-5">Sign up now!</h2>
                    <MDBRow className='mb-4'>
                        <MDBCol md='6'>
                            <MDBInput wrapperClass='mb-4' label='Username' id='form1' type='text' value={username}
                                      onChange={(e) => setUsername(e.target.value)}/>
                            <MDBInput wrapperClass='mb-4' label='Email' id='form2' type='email' value={email}
                                      onChange={(e) => setEmail(e.target.value)}/>
                            <MDBInput wrapperClass='mb-4' label='Password' id='form3' type='password' value={password}
                                      onChange={(e) => setPassword(e.target.value)}/>
                        </MDBCol>
                        <MDBCol md='6'>
                            <MDBInput wrapperClass='mb-4' label='Street' id='form4' type='text' value={street}
                                      onChange={(e) => setStreet(e.target.value)}/>
                            <MDBInput wrapperClass='mb-4' label='City' id='form5' type='text' value={city}
                                      onChange={(e) => setCity(e.target.value)}/>
                            <MDBInput wrapperClass='mb-4' label='Zip' id='form6' type='text' value={zip}
                                      onChange={(e) => setZip(e.target.value)}/>
                            <MDBInput wrapperClass='mb-4' label='Phone' id='form6' type='text' value={phone}
                                      onChange={(e) => setPhone(e.target.value)}/>
                        </MDBCol>
                        <div className="d-flex justify-content-center">
                            <MDBBtn className='w-50 mt-3 btn-danger' size='md' onClick={handleSubmit}>Sign up</MDBBtn>
                        </div>
                    </MDBRow>
                    <div className="text-center">

                        <p>or sign up with:</p>

                        <MDBBtn tag='a' color='none' className='mx-3'>
                            <MDBIcon fab icon='facebook-f' size="sm"/>
                        </MDBBtn>

                        <MDBBtn tag='a' color='none' className='mx-3'>
                            <MDBIcon fab icon='twitter' size="sm"/>
                        </MDBBtn>

                        <MDBBtn tag='a' color='none' className='mx-3'>
                            <MDBIcon fab icon='google' size="sm"/>
                        </MDBBtn>

                        <MDBBtn tag='a' color='none' className='mx-3'>
                            <MDBIcon fab icon='github' size="sm"/>
                        </MDBBtn>

                    </div>

                </MDBCardBody>
            </MDBCol>
            <ToastContainer/>
        </MDBContainer>
    );
}

export default withAuthRedirect(Register);