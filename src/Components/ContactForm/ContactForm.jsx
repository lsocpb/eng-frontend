import React, { useState } from 'react';
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBIcon,
    MDBInput,
    MDBTextArea,
    MDBSpinner,
    MDBContainer,
    MDBRow,
} from 'mdb-react-ui-kit';
import axios from 'axios';
import { BASE_API_URL } from "../../api/config";
import './ContactForm.css';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await axios.post(`${BASE_API_URL}/user/send-email`, {
                ...formData,
                to: 'charfaircharity@gmail.com',
            });
            setSubmitStatus('success');
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            console.error('Error sending email:', error);
            setSubmitStatus('error');
        }
        setIsSubmitting(false);
    };

    return (
        <MDBContainer>
            <MDBContainer fluid className="py-5">
                <MDBRow className="justify-content-center mb-5">
                    <MDBCol md="10" lg="8" className="text-center">
                        <h1 className="display-4 text-danger font-weight-bold mb-4">
                            Get in Touch
                        </h1>
                        <p className="lead text-muted mb-5">
                            Have questions about our platform? We're here to help and would love to hear from you.
                        </p>
                    </MDBCol>
                </MDBRow>
                <MDBRow className="justify-content-center">
                    <MDBCol md="10" lg="8">
                        <MDBCard className="border-0 shadow-sm card-hover">
                            <MDBCardBody className="p-5">
                                <div className="text-center mb-5">
                                    <div className="rounded-circle mx-auto mb-4 icon-circle">
                                        <MDBIcon fas icon="envelope" size="2x" className="text-danger" />
                                    </div>
                                    <h4 className="text-danger mb-3">Send us a Message</h4>
                                    <p className="text-muted">
                                        Fill out the form below and we'll get back to you as soon as possible.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="contact-form">
                                    <MDBInput
                                        label="Your Name"
                                        name="name"
                                        id="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="mb-4 form-field"
                                        required
                                    />
                                    <MDBInput
                                        type="email"
                                        id="email"
                                        label="Your Email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="mb-4 form-field"
                                        required
                                    />
                                    <MDBTextArea
                                        label="Your Message"
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={4}
                                        className="mb-4 form-field"
                                        required
                                    />
                                    <div className="text-center mt-4">
                                        <MDBBtn
                                            type="submit"
                                            color="danger"
                                            className="btn-hover px-5 py-3"
                                            size="lg"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <MDBSpinner size="sm" role="status" tag="span" className="me-2"/>
                                            ) : (
                                                <MDBIcon fas icon="paper-plane" className="me-2"/>
                                            )}
                                            Send Message
                                        </MDBBtn>
                                    </div>
                                </form>

                                {submitStatus && (
                                    <div className={`text-center mt-4 status-message ${submitStatus}`}>
                                        {submitStatus === 'success' ? (
                                            <div className="text-success">
                                                <MDBIcon fas icon="check-circle" className="me-2" />
                                                Message sent successfully!
                                            </div>
                                        ) : (
                                            <div className="text-danger">
                                                <MDBIcon fas icon="exclamation-circle" className="me-2" />
                                                Error sending message. Please try again.
                                            </div>
                                        )}
                                    </div>
                                )}
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </MDBContainer>
    );
};

export default ContactForm;