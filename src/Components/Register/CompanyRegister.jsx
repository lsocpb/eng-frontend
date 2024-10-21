import React from 'react';
import { useForm } from 'react-hook-form';
import {
    MDBBtn,
    MDBContainer,
    MDBCardBody,
    MDBCol,
    MDBRow,
    MDBInput,
} from 'mdb-react-ui-kit';
import { ToastContainer } from "react-toastify";
import { showSuccessToast, showErrorToast } from "../ToastNotifications/ToastNotifications";
import { BASE_API_URL } from "../../api/config";
import axios from "axios";
import withAuthRedirect from "../AuthRedirect/withAuthRedirect";
/**
 * Functional component for company registration
 * @returns {JSX.Element} Company registration form
 */
function CompanyRegister() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = async (data) => {
        const payload = {
            companyName: data.companyName,
            nip: data.nip,
            regon: data.regon,
            email: data.email,
            password: data.password,
            phone: data.phone,
            address: {
                street: data.street,
                city: data.city,
                zip: data.zip
            },
            contactPerson: {
                firstName: data.contactFirstName,
                lastName: data.contactLastName,
                position: data.contactPosition
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

            if (response.status !== 200) {
                showErrorToast('An unexpected error occurred. Please try again later.');
                return;
            }

            showSuccessToast('Company registration successful');
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
                    <h2 className="fw-bold mb-5">Company Registration</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <MDBRow className='mb-4'>
                            <MDBCol md='6'>
                                <h4 className="text-start mb-4">Company Information</h4>
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Company Name'
                                    id='companyName'
                                    type='text'
                                    {...register('companyName', { required: 'Company name is required' })}
                                />
                                {errors.companyName && <p className="text-danger">{errors.companyName.message}</p>}

                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='NIP'
                                    id='nip'
                                    type='text'
                                    {...register('nip', { required: 'NIP is required' })}
                                />
                                {errors.nip && <p className="text-danger">{errors.nip.message}</p>}

                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='REGON'
                                    id='regon'
                                    type='text'
                                    {...register('regon', { required: 'REGON is required' })}
                                />
                                {errors.regon && <p className="text-danger">{errors.regon.message}</p>}

                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Company Email'
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

                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Company Phone'
                                    id='phone'
                                    type='text'
                                    {...register('phone', { required: 'Phone is required' })}
                                />
                                {errors.phone && <p className="text-danger">{errors.phone.message}</p>}
                            </MDBCol>
                            <MDBCol md='6'>
                                <h4 className="text-start mb-4">Address & Contact Person</h4>
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
                                    label='Zip Code'
                                    id='zip'
                                    type='text'
                                    {...register('zip', { required: 'Zip code is required' })}
                                />
                                {errors.zip && <p className="text-danger">{errors.zip.message}</p>}

                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Contact Person First Name'
                                    id='contactFirstName'
                                    type='text'
                                    {...register('contactFirstName', { required: 'Contact person first name is required' })}
                                />
                                {errors.contactFirstName && <p className="text-danger">{errors.contactFirstName.message}</p>}

                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Contact Person Last Name'
                                    id='contactLastName'
                                    type='text'
                                    {...register('contactLastName', { required: 'Contact person last name is required' })}
                                />
                                {errors.contactLastName && <p className="text-danger">{errors.contactLastName.message}</p>}

                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Position in Company'
                                    id='contactPosition'
                                    type='text'
                                    {...register('contactPosition', { required: 'Position is required' })}
                                />
                                {errors.contactPosition && <p className="text-danger">{errors.contactPosition.message}</p>}
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
            <ToastContainer/>
        </MDBContainer>
    );
}
export default withAuthRedirect(CompanyRegister);