import React, { useState } from 'react';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBIcon,
} from 'mdb-react-ui-kit';
import FAQItem from './FAQItem';
import { useNavigate} from "react-router-dom";

const FAQ = () => {

    const navigate = useNavigate();
    const handleNavigation = () => {
        navigate('/contact');
    }

    const faqs = [
        {
            question: "How does CharFair's auction platform work?",
            answer: "CharFair connects charities with donors through an online auction system. Charities can list items or experiences for auction, and donors can bid on these items. All proceeds go directly to the respective charitable causes, with full transparency in the process."
        },
        {
            question: "How can charities join the platform?",
            answer: "Charities can register through our simple onboarding process. They need to provide their official registration documents, mission statement, and specific campaign goals. Our team reviews applications within 48 hours to ensure authenticity and compliance."
        },
        {
            question: "What types of items can be auctioned?",
            answer: "Charities can auction physical items, digital products, experiences, services, and exclusive opportunities. All items must comply with our platform guidelines and legal requirements. We encourage unique and meaningful auction items that align with charitable causes."
        },
        {
            question: "How are payments processed?",
            answer: "We use secure payment gateways to process all transactions. Winning bidders can pay using credit cards, PayPal, or bank transfers. Funds are held in escrow until the auction item is delivered, ensuring safety for both parties."
        },
        {
            question: "What percentage of donations goes to the charities?",
            answer: "100% of all auction proceeds go directly to the charities. We do not charge any fees or commissions on donations. Our platform is designed to maximize the impact of charitable contributions and support meaningful causes."
        },
        {
            question: "How do you ensure the authenticity of charities?",
            answer: "We conduct thorough verification processes including checking official registration status, reviewing financial records, and monitoring ongoing activities. We also maintain partnerships with charity watchdog organizations for additional oversight."
        }
    ];

    return (
        <MDBContainer>
            <MDBContainer fluid className="py-5">
                <MDBRow className="justify-content-center mb-5">
                    <MDBCol md="10" lg="8" className="text-center">
                        <h1 className="display-4 text-danger font-weight-bold mb-4">
                            Frequently Asked Questions
                        </h1>
                        <p className="lead text-muted">
                            Find answers to common questions about CharFair's auction platform and how we help connect charities with donors.
                        </p>
                    </MDBCol>
                </MDBRow>

                <MDBRow className="justify-content-center">
                    <MDBCol md="10" lg="8">
                        {faqs.map((faq, index) => (
                            <FAQItem
                                key={index}
                                question={faq.question}
                                answer={faq.answer}
                            />
                        ))}
                    </MDBCol>
                </MDBRow>

                <MDBRow className="justify-content-center mt-5">
                    <MDBCol md="10" lg="8" className="text-center">
                        <MDBCard className="border-0 shadow-sm bg-danger text-white">
                            <MDBCardBody className="p-5">
                                <MDBIcon far icon="question-circle" size="3x" className="mb-3" />
                                <h3 className="mb-3">Still have questions?</h3>
                                <p className="mb-4">
                                    Can't find the answer you're looking for? Please contact our support team.
                                </p>
                                <button className="btn btn-light btn-lg" onClick={handleNavigation}>
                                    Contact Support
                                </button>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </MDBContainer>
    );
}

export default FAQ;