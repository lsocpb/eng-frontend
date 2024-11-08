import React, { useState } from 'react';
import {
    MDBCard,
    MDBCardBody,
    MDBIcon,
} from 'mdb-react-ui-kit';

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <MDBCard className="border-0 shadow-sm mb-4 card-hover">
            <MDBCardBody className="p-4">
                <div
                    className="d-flex justify-content-between align-items-center cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}
                    style={{ cursor: 'pointer' }}
                >
                    <h5 className="mb-0 font-weight-bold">{question}</h5>
                </div>
                <div className={`faq-answer mt-3 ${isOpen ? 'show' : ''}`}>
                    <p className="text-muted mb-0">
                        {answer}
                    </p>
                </div>
            </MDBCardBody>
        </MDBCard>
    );
};

export default FAQItem;