import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import {
    MDBBtn,
    MDBContainer,
    MDBCardBody,
    MDBCol,
    MDBRow,
    MDBInput,
} from 'mdb-react-ui-kit';
import { showErrorToast } from "../ToastNotifications/ToastNotifications";
import { BASE_API_URL } from "../../api/config";
import axios from "axios";
import withAuthRedirect from "../AuthRedirect/withAuthRedirect";
import RegistrationConfirmation from "./RegistrationConfirmation";

function CompanyRegister() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const [showConfirmation, setShowConfirmation] = useState(false);

    const onSubmit = async (data) => {
        const payload = {
            account_details: {
                username: data.username,
                password: data.password,
                email: data.email,
            },
            billing_details: {
                company_name: data.companyName,
                tax_id: data.regon,
                address: data.street,
                postal_code: data.zip,
                city: data.city,
                state: data.state,
                country: data.country,
                phone_number: data.phone,
                bank_account: data.bankAccount
            }
        };

        try {
            const response = await axios.post(
                `${BASE_API_URL}/auth/register/company`,
                payload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );
            setShowConfirmation(true);
        } catch (error) {
            const message = error.response?.data?.detail || 'Registration failed. Please try again.';
            showErrorToast(message);
        }
    };

    return (
        <MDBContainer className='overflow-hidden my-5'>
            <MDBCol className='mb-5 p-5'>
                <MDBCardBody className='d-flex flex-column text-center'>
                    <h2 className="fw-bold mb-5">Company Registration</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <MDBRow className='mb-4'>
                            <MDBCol md='6'>
                                <h4 className="text-start mb-4">Account Information</h4>
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Username'
                                    id='username'
                                    type='text'
                                    {...register('username', {
                                        required: 'Username is required',
                                        minLength: {
                                            value: 3,
                                            message: 'Username must be at least 3 characters'
                                        },
                                        maxLength: {
                                            value: 20,
                                            message: 'Username cannot exceed 20 characters'
                                        }
                                    })}
                                />
                                {errors.username && <p className="text-danger">{errors.username.message}</p>}

                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Email'
                                    id='email'
                                    type='email'
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: 'Invalid email address'
                                        },
                                        maxLength: {
                                            value: 255,
                                            message: 'Email cannot exceed 255 characters'
                                        }
                                    })}
                                />
                                {errors.email && <p className="text-danger">{errors.email.message}</p>}

                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Password'
                                    id='password'
                                    type='password'
                                    {...register('password', {
                                        required: 'Password is required',
                                        minLength: {
                                            value: 8,
                                            message: 'Password must be at least 8 characters'
                                        },
                                        maxLength: {
                                            value: 20,
                                            message: 'Password cannot exceed 20 characters'
                                        }
                                    })}
                                />
                                {errors.password && <p className="text-danger">{errors.password.message}</p>}
                            </MDBCol>

                            <MDBCol md='6'>
                                <h4 className="text-start mb-4">Company Information</h4>
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Company Name'
                                    id='companyName'
                                    type='text'
                                    {...register('companyName', {
                                        required: 'Company name is required',
                                        maxLength: {
                                            value: 255,
                                            message: 'Company name cannot exceed 255 characters'
                                        }
                                    })}
                                />
                                {errors.companyName && <p className="text-danger">{errors.companyName.message}</p>}

                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Tax ID (REGON)'
                                    id='regon'
                                    type='text'
                                    {...register('regon', {
                                        required: 'Tax ID is required',
                                        maxLength: {
                                            value: 255,
                                            message: 'Tax ID cannot exceed 255 characters'
                                        }
                                    })}
                                />
                                {errors.regon && <p className="text-danger">{errors.regon.message}</p>}

                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Bank Account'
                                    id='bankAccount'
                                    type='text'
                                    {...register('bankAccount', {
                                        required: 'Bank account is required',
                                        maxLength: {
                                            value: 255,
                                            message: 'Bank account cannot exceed 255 characters'
                                        }
                                    })}
                                />
                                {errors.bankAccount && <p className="text-danger">{errors.bankAccount.message}</p>}
                            </MDBCol>
                        </MDBRow>

                        <MDBRow className='mb-4'>
                            <MDBCol md='12'>
                                <h4 className="text-start mb-4">Address Information</h4>
                            </MDBCol>
                            <MDBCol md='6'>
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Street Address'
                                    id='street'
                                    type='text'
                                    {...register('street', {
                                        required: 'Street address is required',
                                        maxLength: {
                                            value: 255,
                                            message: 'Address cannot exceed 255 characters'
                                        }
                                    })}
                                />
                                {errors.street && <p className="text-danger">{errors.street.message}</p>}

                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='City'
                                    id='city'
                                    type='text'
                                    {...register('city', {
                                        required: 'City is required',
                                        maxLength: {
                                            value: 255,
                                            message: 'City cannot exceed 255 characters'
                                        }
                                    })}
                                />
                                {errors.city && <p className="text-danger">{errors.city.message}</p>}

                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='State/Province'
                                    id='state'
                                    type='text'
                                    {...register('state', {
                                        required: 'State is required',
                                        maxLength: {
                                            value: 255,
                                            message: 'State cannot exceed 255 characters'
                                        }
                                    })}
                                />
                                {errors.state && <p className="text-danger">{errors.state.message}</p>}
                            </MDBCol>

                            <MDBCol md='6'>
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Postal Code'
                                    id='zip'
                                    type='text'
                                    {...register('zip', {
                                        required: 'Postal code is required',
                                        maxLength: {
                                            value: 255,
                                            message: 'Postal code cannot exceed 255 characters'
                                        }
                                    })}
                                />
                                {errors.zip && <p className="text-danger">{errors.zip.message}</p>}

                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Country'
                                    id='country'
                                    type='text'
                                    defaultValue="Poland"
                                    {...register('country', {
                                        required: 'Country is required',
                                        maxLength: {
                                            value: 255,
                                            message: 'Country cannot exceed 255 characters'
                                        }
                                    })}
                                />
                                {errors.country && <p className="text-danger">{errors.country.message}</p>}

                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Phone Number'
                                    id='phone'
                                    type='text'
                                    {...register('phone', {
                                        required: 'Phone number is required',
                                        maxLength: {
                                            value: 255,
                                            message: 'Phone number cannot exceed 255 characters'
                                        }
                                    })}
                                />
                                {errors.phone && <p className="text-danger">{errors.phone.message}</p>}
                            </MDBCol>
                        </MDBRow>

                        <div className="d-flex justify-content-center">
                            <MDBBtn className='w-50 mt-3 btn-danger' size='md' type="submit">
                                Register Company
                            </MDBBtn>
                        </div>
                    </form>
                </MDBCardBody>
            </MDBCol>
            {showConfirmation && (
                <RegistrationConfirmation
                    onClose={() => setShowConfirmation(false)}
                />
            )}
        </MDBContainer>
    );
}

export default withAuthRedirect(CompanyRegister);