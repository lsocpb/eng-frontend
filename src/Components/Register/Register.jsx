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

function Register() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

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
                    email: email
                }),
            });
            const data = await response.json();
            console.log(data);
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
                    <MDBBtn className='w-md-50 mb-4 gradient-custom-2' size='md' onClick={handleSubmit}>sign up</MDBBtn>

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

        </MDBContainer>
    );
}

export default withAuthRedirect(Register);