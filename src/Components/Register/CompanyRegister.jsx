import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {
    MDBBtn,
    MDBContainer,
    MDBCardBody,
    MDBCol,
    MDBRow,
    MDBInput,
} from 'mdb-react-ui-kit';
import {showErrorToast} from "../ToastNotifications/ToastNotifications";
import {BASE_API_URL} from "../../api/config";
import axios from "axios";
import withAuthRedirect from "../AuthRedirect/withAuthRedirect";
import RegistrationConfirmation from "./RegistrationConfirmation";

function CompanyRegister() {
    const {
        register,
        handleSubmit,
        formState: {errors, isValid}
    } = useForm({
        mode: 'onChange',
        criteriaMode: 'all'
    });

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
                    <MDBRow className="justify-content-center mb-5">
                        <MDBCol md="10" lg="8" className="text-center">
                            <h2 className="display-4 text-danger font-weight-bold mb-4">
                                Company Registration
                            </h2>
                            <p className="lead text-muted">
                                Register your company account to start donating items and supporting charitable causes.
                            </p>
                        </MDBCol>
                    </MDBRow>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <MDBRow className='mb-4'>
                            <MDBCol md='6'>
                                <h4 className="text-start mb-4">Account Information</h4>
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Username *'
                                    id='username'
                                    type='text'
                                    {...register('username', {
                                        required: 'Username is required',
                                        minLength: {
                                            value: 3,
                                            message: 'Username must be at least 3 characters long'
                                        },
                                        maxLength: {
                                            value: 20,
                                            message: 'Username must be at most 20 characters long'
                                        },
                                        pattern: {
                                            value: /^[a-zA-Z0-9_]{3,20}$/,
                                            message: 'Invalid username format. Use only letters, numbers, and underscores'
                                        }
                                    })}
                                    labelClass={errors.username ? 'text-danger' : ''}
                                />
                                {errors.username && <p className="text-danger">{errors.username.message}</p>}

                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Email *'
                                    id='email'
                                    type='email'
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                            message: 'Invalid email format'
                                        }
                                    })}
                                    labelClass={errors.email ? 'text-danger' : ''}
                                />
                                {errors.email && <p className="text-danger">{errors.email.message}</p>}

                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Hasło *'
                                    id='password'
                                    type='password'
                                    {...register('password', {
                                        required: 'Password is required',
                                        minLength: {
                                            value: 8,
                                            message: 'Password must be at least 8 characters long'
                                        },
                                    })}
                                    labelClass={errors.password ? 'text-danger' : ''}
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
                                        pattern: {
                                            value: /^[a-zA-Z0-9\s&.,'-]{2,255}$/,
                                            message: 'Invalid company name format'
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
                                        pattern: {
                                            value: /^[0-9]{9,14}$/,
                                            message: 'Tax ID must be 9-14 digits'
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
                                        pattern: {
                                            value: /^[0-9]{26}$/,
                                            message: 'Bank account must be 26 digits'
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
                                        pattern: {
                                            value: /^[a-zA-Z0-9\s.,/-]{3,255}$/,
                                            message: 'Invalid street address format'
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
                                        pattern: {
                                            value: /^[a-zA-Z\s-]{2,255}$/,
                                            message: 'Invalid city name'
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
                                        pattern: {
                                            value: /^[a-zA-Z\s-]{2,255}$/,
                                            message: 'Invalid state/province name'
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
                                        pattern: {
                                            value: /^\d{2}-\d{3}$/,
                                            message: 'Postal code must be in format XX-XXX'
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
                                        pattern: {
                                            value: /^[a-zA-Z\s]{2,255}$/,
                                            message: 'Invalid country name'
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
                                    })}
                                />
                                {errors.phone && <p className="text-danger">{errors.phone.message}</p>}
                            </MDBCol>
                        </MDBRow>

                        <div className="d-flex justify-content-center">
                            <MDBBtn className='w-50 mt-3 btn-danger' size='md' type="submit" disabled={!isValid}>
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