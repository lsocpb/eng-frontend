import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './Login.css';
import {
    MDBInput,
    MDBCol,
    MDBRow,
    MDBCheckbox,
    MDBBtn,
    MDBIcon,
    MDBContainer,
} from 'mdb-react-ui-kit';
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const validateForm = () => {
        if (!username || !password) {
            setError('Username and password are required');
            return false;
        }
        setError('');
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
                sessionStorage.setItem('active-user', data.access_token);
                if (data.access_token !== null) {
                    toast.success(data.message || 'Login successful', {
                        position: "top-center",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setTimeout(() => {
                        window.location.href = "/protected";
                    }, 1000);
                } else {
                    toast.error(data.message || 'Login failed', {
                        position: "top-center",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            } else {
                const data = await response.json();
                toast.error(data.message || 'Wrong username or password', {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } catch (error) {
            setLoading(false);
            setError('An error occurred. Please try again later.');
        }
    };

    return (
        <MDBContainer className="my-5 gradient-form overflow-hidden">
            <MDBRow className="justify-content-center align-items-center">
                <MDBCol col='6' className="mb-2 align-items-center justify-content-center text-center">
                    <div className="d-flex flex-column ms-5">
                        <div className="text-center">
                            <img src={process.env.PUBLIC_URL + '/logo.png'} style={{width: '110px'}} alt="logo"/>
                            <h4>We are The CharFair Team</h4>
                        </div>
                        <p>Please login to your account</p>
                        <MDBInput
                            wrapperClass='mb-4 w-75 mx-auto'
                            label='Username'
                            id='form1'
                            type='username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <MDBInput
                            wrapperClass='mb-4 w-75 mx-auto'
                            label='Password'
                            id='form2'
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div
                            className="d-flex flex-row text-center align-items-center justify-content-center mb-5 pb-1">
                            <MDBBtn className="mb-4 w-50 gradient-custom-2 mx-5" onClick={handleSubmit}>
                                LOGIN
                            </MDBBtn>
                            <a className="text-muted mx-5 mb-4" href="#!">Forgot password?</a>
                        </div>
                        <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                            <p className="mb-0">Don't have an account?</p>
                            <MDBBtn outline className='mx-2' color='danger'>
                                SING UP
                            </MDBBtn>
                        </div>
                    </div>
                </MDBCol>
            </MDBRow>
            <ToastContainer/>
        </MDBContainer>
    );
}


export default Login;
