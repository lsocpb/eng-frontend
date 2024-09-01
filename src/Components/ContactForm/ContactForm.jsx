import React, {useState} from 'react';
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBIcon,
    MDBInput,
    MDBTextArea,
    MDBSpinner, MDBContainer,
} from 'mdb-react-ui-kit';
import axios from 'axios';
import {BASE_API_URL} from "../../api/config";

/**
 * ContactForm component renders a contact form.
 */
const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    /**
     * Handle form input changes
     * @param e
     */
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    /**
     * Handle form submission
     * @param e
     * @returns {Promise<void>}
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await axios.post(`${BASE_API_URL}/send-email`, {
                ...formData,
                to: 'charfaircharity@gmail.com',
            });
            setSubmitStatus('success');
            setFormData({name: '', email: '', message: ''});
        } catch (error) {
            console.error('Error sending email:', error);
            setSubmitStatus('error');
        }
        setIsSubmitting(false);
    };

    return (
        <MDBContainer className="py-5">
            <MDBCard className="h-100 shadow-5-strong">
                <MDBCardBody className="p-4">
                    <h4 className="mb-4 text-center text-danger">
                        <MDBIcon fas icon="envelope" className="me-2"/>
                        Contact Us
                    </h4>
                    <form onSubmit={handleSubmit}>
                        <MDBInput
                            label="Your Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mb-4"
                            required
                        />
                        <MDBInput
                            type="email"
                            label="Your Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mb-4"
                            required
                        />
                        <MDBTextArea
                            label="Your Message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={4}
                            className="mb-4"
                            required
                        />
                        <div className="text-center">
                            <MDBBtn
                                type="submit"
                                color="danger"
                                className="rounded-pill px-4 py-2"
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
                    {submitStatus === 'success' && (
                        <div className="text-success text-center mt-3">
                            <MDBIcon fas icon="check-circle" className="me-2"/>
                            Message sent successfully!
                        </div>
                    )}
                    {submitStatus === 'error' && (
                        <div className="text-danger text-center mt-3">
                            <MDBIcon fas icon="exclamation-circle" className="me-2"/>
                            Error sending message. Please try again.
                        </div>
                    )}
                </MDBCardBody>
            </MDBCard>
        </MDBContainer>
    );
};

export default ContactForm;