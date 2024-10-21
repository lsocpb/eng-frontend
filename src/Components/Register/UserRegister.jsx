import React from 'react';
import { useForm } from 'react-hook-form';
import {
    MDBBtn,
    MDBContainer,
    MDBCardBody,
    MDBCol,
    MDBRow,
    MDBInput,
    MDBIcon
} from 'mdb-react-ui-kit';
import { ToastContainer } from "react-toastify";
import { showSuccessToast, showErrorToast } from "../ToastNotifications/ToastNotifications";
import { BASE_API_URL } from "../../api/config";
import axios from "axios";
import withAuthRedirect from "../AuthRedirect/withAuthRedirect";

/**
 * Functional component for user registration
 * @returns {JSX.Element} User registration form
 */
function UserRegister() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    /**
     * Function to handle form submission
     * @param {Object} data - Form data
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

            showSuccessToast('Registration successful');
            setTimeout(() => {
                window.location.href = "/login";
            }, 1000);
        } catch (error) {
            showErrorToast('An unexpected error occurred. Please try again later.');
        }
    };

    return (
        <MDBContainer className='overflow-hidden my-5'>
            <MDBCol className='mb-5 p-5'>
                <MDBCardBody className='d-flex flex-column text-center'>
                    <h2 className="fw-bold mb-5">Personal Account Registration</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <MDBRow className='mb-4'>
                            <MDBCol md='6'>
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='First Name'
                                    id='firstName'
                                    type='text'
                                    {...register('firstName', { required: 'First name is required' })}
                                />
                                {errors.firstName && <p className="text-danger">{errors.firstName.message}</p>}

                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Last Name'
                                    id='lastName'
                                    type='text'
                                    {...register('lastName', { required: 'Last name is required' })}
                                />
                                {errors.lastName && <p className="text-danger">{errors.lastName.message}</p>}

                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Email'
                                    id='email'
                                    type='email'
                                    {...register('email', { required: 'Email is required' })}
                                />
                                {errors.email && <p className="text-danger">{errors.email.message}</p>}
                            </MDBCol>
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
                                    label='Password'
                                    id='password'
                                    type='password'
                                    {...register('password', { required: 'Password is required' })}
                                />
                                {errors.password && <p className="text-danger">{errors.password.message}</p>}

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

                        {/* Address fields */}
                        <MDBRow className='mb-4'>
                            <MDBCol md='4'>
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Street'
                                    id='street'
                                    type='text'
                                    {...register('street', { required: 'Street is required' })}
                                />
                                {errors.street && <p className="text-danger">{errors.street.message}</p>}
                            </MDBCol>
                            <MDBCol md='4'>
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='City'
                                    id='city'
                                    type='text'
                                    {...register('city', { required: 'City is required' })}
                                />
                                {errors.city && <p className="text-danger">{errors.city.message}</p>}
                            </MDBCol>
                            <MDBCol md='4'>
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='ZIP Code'
                                    id='zip'
                                    type='text'
                                    {...register('zip', { required: 'ZIP Code is required' })}
                                />
                                {errors.zip && <p className="text-danger">{errors.zip.message}</p>}
                            </MDBCol>
                        </MDBRow>

                        <div className="d-flex justify-content-center">
                            <MDBBtn className='w-50 mt-3 btn-danger' size='md' type="submit">
                                Register Account
                            </MDBBtn>
                        </div>
                    </form>
                    <div className="text-center mt-3">
                        <p>or sign up with:</p>
                        <MDBBtn tag='a' color='none' className='mx-3'>
                            <MDBIcon fab icon='facebook-f' size="sm"/>
                        </MDBBtn>
                        <MDBBtn tag='a' color='none' className='mx-3'>
                            <MDBIcon fab icon='google' size="sm"/>
                        </MDBBtn>
                    </div>
                </MDBCardBody>
            </MDBCol>
            <ToastContainer/>
        </MDBContainer>
    );
}

export default withAuthRedirect(UserRegister);
