import React, {useState} from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
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

function Register() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDetails = new URLSearchParams();
        formDetails.append('username', username);
        formDetails.append('password', password);
        formDetails.append('email', email);

        try {
            const response = await fetch('http://localhost:8000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    email: email,
                    address: {
                        street: street,
                        city: city,
                        zip: zip
                    }
                }),
            });
            if(!response.ok){
                const errorData = await response.json();
                toast.error(errorData.message || 'Register failed', {
                        position: "top-center",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                throw new Error(errorData.message);
            }

            if (response.ok){
                const data = await response.json();
                toast.success(data.message || 'Register successful', {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setTimeout(() => {
                        window.location.href = "/login";
                    }, 1000);
            }
        } catch (error) {
            setError(error.response.data.detail);
        }
    }

    return (
        <MDBContainer className='overflow-hidden my-5'>
            <MDBCol className='mb-5 p-5 justify-content-center align-items-center'>
                <MDBCardBody className='d-flex flex-column text-center justify-content-center align-items-center'>

                    <h2 className="fw-bold mb-5">Sign up now!</h2>

                    <MDBInput wrapperClass='mb-4 w-25' label='Username' id='form1' type='text' value={username}
                              onChange={(e) => setUsername(e.target.value)}/>
                    <MDBInput wrapperClass='mb-4 w-25' label='Email' id='form2' type='email' value={email}
                              onChange={(e) => setEmail(e.target.value)}/>
                    <MDBInput wrapperClass='mb-4 w-25' label='Password' id='form3' type='password' value={password}
                              onChange={(e) => setPassword(e.target.value)}/>
                    <MDBInput wrapperClass='mb-4 w-25' label='Street' id='form4' type='text' value={street}
                                onChange={(e) => setStreet(e.target.value)}/>
                    <MDBInput wrapperClass='mb-4 w-25' label='City' id='form5' type='text' value={city}
                                onChange={(e) => setCity(e.target.value)}/>
                    <MDBInput wrapperClass='mb-4 w-25' label='Zip' id='form6' type='text' value={zip}
                                onChange={(e) => setZip(e.target.value)}/>
                    <MDBBtn className='w-25 mb-4 btn-danger' size='md' onClick={handleSubmit}>sign up</MDBBtn>

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