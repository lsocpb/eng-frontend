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
import {useForm} from "react-hook-form";

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
    const {
        register,
        handleSubmit, formState: {errors}
    } = useForm();

    /**
     * Validates the form fields to ensure that all required fields are filled.
     *
     * @returns {boolean} - Returns `true` if all required fields are filled; otherwise, returns `false`.
     *                      If any required field is missing, an error toast is shown and the function returns `false`.
     */

    /**
     * Handles form submission by sending a POST request to the registration endpoint.
     *
     * @param {React.FormEvent} e - The form submit event.
     * @returns {void}
     */
    const onSubmit = async (data) => {
        const payload = {
            username: data.username,
            password: data.password,
            email: data.email,
            phone: data.phone,
            address: {
                street: data.street,
                city: data.city,
                zip: data.zip
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

            if (response.status !== 200) {
                showErrorToast('An unexpected error occurred. Please try again later.');
                return;
            }

            showSuccessToast('Register successful');
            setTimeout(() => {
                window.location.href = "/login";
            }, 1000);
        } catch (error) {
            toast.error('An unexpected error occurred. Please try again later.');
        }
    };

return (
        <MDBContainer className='overflow-hidden my-5'>
            <MDBCol className='mb-5 p-5 justify-content-center align-items-center'>
                <MDBCardBody className='d-flex flex-column text-center justify-content-center align-items-center'>
                    <h2 className="fw-bold mb-5">Sign up now!</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <MDBRow className='mb-4'>
                            <MDBCol md='6'>
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Username'
                                    id='username'
                                    type='text'
                                    {...register('username', { required: 'Username is required' })}
                                />
                                {errors.username && <p className="text-danger">{errors.username.message}</p>}

                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Email'
                                    id='email'
                                    type='email'
                                    {...register('email', { required: 'Email is required' })}
                                />
                                {errors.email && <p className="text-danger">{errors.email.message}</p>}

                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Password'
                                    id='password'
                                    type='password'
                                    {...register('password', { required: 'Password is required' })}
                                />
                                {errors.password && <p className="text-danger">{errors.password.message}</p>}
                            </MDBCol>
                            <MDBCol md='6'>
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Street'
                                    id='street'
                                    type='text'
                                    {...register('street', { required: 'Street is required' })}
                                />
                                {errors.street && <p className="text-danger">{errors.street.message}</p>}

                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='City'
                                    id='city'
                                    type='text'
                                    {...register('city', { required: 'City is required' })}
                                />
                                {errors.city && <p className="text-danger">{errors.city.message}</p>}

                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Zip'
                                    id='zip'
                                    type='text'
                                    {...register('zip', { required: 'Zip is required' })}
                                />
                                {errors.zip && <p className="text-danger">{errors.zip.message}</p>}

                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Phone'
                                    id='phone'
                                    type='text'
                                    {...register('phone', { required: 'Phone is required' })}
                                />
                                {errors.phone && <p className="text-danger">{errors.phone.message}</p>}
                            </MDBCol>
                        </MDBRow>
                        <div className="d-flex justify-content-center">
                            <MDBBtn className='w-50 mt-3 btn-danger' size='md' type="submit">Sign up</MDBBtn>
                        </div>
                    </form>
                    <div className="text-center mt-3">
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