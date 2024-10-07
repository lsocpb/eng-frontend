import React from 'react';
import {useLocation, useParams} from 'react-router-dom';

const PaymentPage = () => {
    const {paymentId} = useParams();
    const location = useLocation();
    const { productName, productPrice } = location.state || {};

    return (
        <div>
            <h2>Processing Payment</h2>
            <p>You are purchasing: {productName}</p>
            <p>Price: ${productPrice}</p>
            {/* Add your payment processing logic here */}
        </div>
    );
};

export default PaymentPage;
