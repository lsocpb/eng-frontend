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
    MDBInput,
    MDBIcon
} from 'mdb-react-ui-kit';

const BidModal = ({ isOpen, toggle, productName, currentPrice }) => {
    const [bidAmount, setBidAmount] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowConfirmation(true);
    };

    const confirmBid = () => {
        setShowConfirmation(false);
        setBidAmount('');
        toggle();
    };

    const cancelBid = () => {
        setShowConfirmation(false);
    };

    return (
        <MDBModal open={isOpen} tabIndex='-1'>
            <MDBModalDialog>
                <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle>You are placing a bid for: {productName}</MDBModalTitle>
                        <MDBBtn className='btn-close' color='danger' onClick={toggle}></MDBBtn>
                    </MDBModalHeader>
                    {!showConfirmation ? (
                        <form onSubmit={handleSubmit}>
                            <MDBModalBody>
                                <p>Current price: ${currentPrice}</p>
                                <MDBInput
                                    label='Your offer (USD)'
                                    id='bidAmount'
                                    type='number'
                                    value={bidAmount}
                                    onChange={(e) => setBidAmount(e.target.value)}
                                    required
                                    min={currentPrice}
                                    step="0.01"
                                />
                            </MDBModalBody>
                            <MDBModalFooter>
                                <MDBBtn className="btn-outline-danger" onClick={toggle}>
                                    Cancel
                                </MDBBtn>
                                <MDBBtn type='submit' color='danger'>
                                    <MDBIcon fas icon="gavel" className="me-2"/> Place a bid
                                </MDBBtn>
                            </MDBModalFooter>
                        </form>
                    ) : (
                        <>
                            <MDBModalBody>
                                <p>Are you sure you want to place a bid of ${bidAmount} for {productName}?</p>
                            </MDBModalBody>
                            <MDBModalFooter>
                                <MDBBtn className="btn-outline-danger" onClick={cancelBid}>
                                    Cancel
                                </MDBBtn>
                                <MDBBtn color='danger' onClick={confirmBid}>
                                    <MDBIcon fas icon="check" className="me-2"/> Confirm Bid
                                </MDBBtn>
                            </MDBModalFooter>
                        </>
                    )}
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    );
};

export default BidModal;