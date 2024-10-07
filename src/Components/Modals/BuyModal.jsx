import React, { useState } from 'react';
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBIcon
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const BuyModal = ({ isOpen, toggle, productName, productPrice }) => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const navigate = useNavigate();

    const handleBuy = () => {
        setShowConfirmation(true);
    };

    const confirmPurchase = () => {
        setShowConfirmation(false);
        toggle();
        const paymentId = uuidv4();
        navigate(`/payment/${paymentId}`, { state: { productName, productPrice } });
    };

    const cancelPurchase = () => {
        setShowConfirmation(false);
    };

    return (
        <MDBModal open={isOpen} tabindex={-1}>
            <MDBModalDialog>
                <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle>You are purchasing: {productName}</MDBModalTitle>
                        <MDBBtn className="btn-close" color="none" onClick={toggle}></MDBBtn>
                    </MDBModalHeader>
                    {!showConfirmation ? (
                        <MDBModalBody>
                            <p>Price: ${productPrice}</p>
                        </MDBModalBody>
                    ) : (
                        <MDBModalBody>
                            <p>Are you sure you want to purchase {productName} for ${productPrice}?</p>
                        </MDBModalBody>
                    )}
                    <MDBModalFooter>
                        {!showConfirmation ? (
                            <>
                                <MDBBtn className="btn-outline-danger" onClick={toggle}>
                                    Cancel
                                </MDBBtn>
                                <MDBBtn color="danger" onClick={handleBuy}>
                                    Buy Now
                                </MDBBtn>
                            </>
                        ) : (
                            <>
                                <MDBBtn className="btn-outline-danger" onClick={cancelPurchase}>
                                    Cancel
                                </MDBBtn>
                                <MDBBtn color="danger" onClick={confirmPurchase}>
                                    Confirm Purchase
                                </MDBBtn>
                            </>
                        )}
                    </MDBModalFooter>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    );
};

export default BuyModal;
