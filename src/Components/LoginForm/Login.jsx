import React, { useState, useRef } from 'react';
import './Login.css';
import {
    MDBInput,
    MDBCol,
    MDBRow,
    MDBBtn,
    MDBContainer,
} from 'mdb-react-ui-kit';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import withAuthRedirect from "../AuthRedirect/withAuthRedirect";
import { showSuccessToast, showErrorToast } from '../ToastNotifications/ToastNotifications';
import Cookies from 'js-cookie';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const submitRef = useRef(null);

    const validateForm = () => {
        if (!username || !password) {
            showErrorToast('Username and password are required');
            return false;
        }
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) return;
        setLoading(true);

        const formDetails = new URLSearchParams();
        formDetails.append('username', username);
        formDetails.append('password', password);

        try {
            const response = await fetch('http://localhost:8000/auth/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formDetails,
            });

            setLoading(false);

            if (response.ok) {
                const data = await response.json();
                Cookies.set('active-user', data.access_token, { secure: true, sameSite: 'strict' });
                if (data.access_token) {
                    showSuccessToast('Login successful');
                    setTimeout(() => {
                        window.location.href = "/home";
                    }, 1000);
                } else {
                    showErrorToast('Wrong username or password');
                }
            } else {
                const data = await response.json();
                showErrorToast(data.message || 'Wrong username or password');
            }
        } catch (error) {
            setLoading(false);
            showErrorToast('An error occurred. Please try again later.');
        }
    };

    const handleKeyDown = (event, nextRef) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            nextRef.current.focus();
        }
    };

    return (
        <MDBContainer className="my-5 gradient-form overflow-hidden">
            <MDBRow className="justify-content-center align-items-center">
                <MDBCol col='6' className="mb-2 align-items-center justify-content-center text-center">
                    <div className="d-flex flex-column">
                        <div className="text-center">
                            <img src={process.env.PUBLIC_URL + '/logo.png'} style={{width: '110px'}} alt="CharFair Team logo"/>
                            <h4>We are The CharFair Team</h4>
                        </div>
                        <p>Please login to your account</p>
                        <form onSubmit={handleSubmit}>
                            <MDBInput
                                wrapperClass='mb-4 w-25 mx-auto'
                                label='Username'
                                id='form1'
                                type='text'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                onKeyDown={(e) => handleKeyDown(e, passwordRef)}
                                inputRef={usernameRef}
                            />
                            <MDBInput
                                wrapperClass='mb-4 w-25 mx-auto'
                                label='Password'
                                id='form2'
                                type='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={(e) => handleKeyDown(e, submitRef)}
                                inputRef={passwordRef}
                            />
                            <div className="d-flex flex-column text-center align-items-center justify-content-center mb-5">
                                <MDBBtn
                                    className="w-25 btn-danger"
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    ref={submitRef}
                                >
                                    {loading ? 'Logging in...' : 'LOGIN'}
                                </MDBBtn>
                                <a className="text-muted mt-2" href="#!">Forgot password?</a>
                            </div>
                        </form>
                        <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                            <p className="mb-0">Don't have an account?</p>
                            <MDBBtn outline className='mx-2' color='danger' href="/register">
                                SIGN UP
                            </MDBBtn>
                        </div>
                    </div>
                </MDBCol>
            </MDBRow>
            <ToastContainer/>
        </MDBContainer>
    );
}

export default withAuthRedirect(Login);