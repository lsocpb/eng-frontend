import React, { useState } from 'react';
import {
  MDBCard, MDBCardBody, MDBCardTitle,
  MDBBadge, MDBCardText, MDBRow, MDBCol
} from 'mdb-react-ui-kit';
import CountdownTimer from '../CountdownTimer/CountdownTimer';

/**
 * Renders a single product card
 * @param {Object} props - The component props.
 * @param {Object} props.product - The product data.
 * @param {Function} props.onClick - The click handler for the product card.
 * @returns {React.ReactElement} The accessible product card component.
 */
const ProductCardCategoryView = ({ product, onClick, bidCount }) => {

  const timeLeft = new Date(product.end_date) - new Date();
  const isEnding = timeLeft <= 24 * 60 * 60 * 1000;
  
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      onClick(product.id);
    }
  };

    

  return (
    <MDBCol size="12" className="mb-4">
      <MDBCard
        onClick={() => onClick(product.id)}
        onKeyDown={handleKeyDown}
        className="hover-shadow transition-all duration-300 transform hover:-translate-y-1"
        tabIndex="0"
        role="button"
        aria-label={`View details for ${product.name}`}
      >
        <MDBRow className="g-0">
          <MDBCol xs="12" md="4" className="d-flex align-items-stretch">
            <div className="w-100 position-relative" style={{minHeight: '250px'}}>
              <img
                src={product.product.image_url_1}
                alt={product.product.name}
                className="img-fluid rounded-start h-100"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
              {product.is_auction_finished ? (
                <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center">
                  <MDBBadge color='danger' className="p-3 fs-5">Auction Ended</MDBBadge>
                </div>
              ) : isEnding ? (
                <MDBBadge 
                  color='warning' 
                  className="position-absolute top-0 end-0 m-2 p-2"
                >
                  Ending Soon!
                </MDBBadge>
              ) : null}
            </div>
          </MDBCol>
          <MDBCol md="8">
            <MDBCardBody className="d-flex flex-column h-100">
              <div>
                <MDBCardTitle className="h4 mb-3">{product.product.name}</MDBCardTitle>
                {!product.is_auction_finished && (
                  <MDBCardText className="mb-3">
                    <div className="d-flex align-items-center">
                      <i className="far fa-clock me-2"></i>
                      <CountdownTimer 
                        date={new Date(product.end_date)}
                        className="text-primary fw-bold"
                      />
                    </div>
                  </MDBCardText>
                )}
              </div>
              
              <div className="mt-auto">
                <MDBCardText className="mb-2">
                  <small className="text-danger">Current Bid:</small>
                  <h2 className="text-danger mb-0">
                    ${parseFloat(product.price).toFixed(2)}
                  </h2>
                </MDBCardText>
                
                <div className="d-flex justify-content-between align-items-center">
                  <small className="text-muted">
                    {bidCount || 0} bids
                  </small>
                  <button className="btn btn-danger btn-sm">
                    View Details
                  </button>
                </div>
              </div>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBCol>
  );
};

export default ProductCardCategoryView;