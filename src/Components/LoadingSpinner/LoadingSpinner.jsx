import React from 'react';
import { MDBSpinner } from 'mdb-react-ui-kit';

/**
 * LoadingSpinner component
 * @function LoadingSpinner
 * @returns {JSX.Element} A full-screen loading spinner
 */
const LoadingSpinner = () => (
    <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)'
    }}
    role="status">
        <MDBSpinner role='status' color='danger' style={{width: '6rem', height: '6rem'}}>
            <span className='visually-hidden'>Loading...</span>
        </MDBSpinner>
    </div>
);

export default LoadingSpinner;