import React from 'react';
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
const ProductCardCategoryView = ({ product, onClick }) => {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      onClick(product.id);
    }
  };

  return (
    <MDBCol size="12" className="mb-4">
      <hr />
      <MDBCard
        onClick={() => onClick(product.id)}
        onKeyDown={handleKeyDown}
        className="hover-shadow"
        tabIndex="0"
        role="button"
        aria-label={`View details for ${product.name}`}
      >
        <MDBRow className="g-0">
          <MDBCol xs="12" md="4" className="d-flex align-items-stretch">
            <div className="w-100 position-relative" style={{minHeight: '200px'}}>
              <img
                src={product.product.image_url_1}
                alt={product.product.name}
                className="img-fluid rounded-start"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'fill'
                }}
              />
            </div>
          </MDBCol>
          <MDBCol md="8">
            <MDBCardBody>
              <MDBCardTitle>{product.product.name}</MDBCardTitle>
              <MDBCardText>
                <small className="text-muted">Quantity: {product.quantity}</small>
              </MDBCardText>
              <MDBCardText>
              {product.is_auction_finished ? ( <MDBBadge color='danger'>Auction Ended</MDBBadge> ) : (<small className="text-muted">
                                    Ends in: <CountdownTimer date={new Date(product.end_date)}/>
                                </small>)}
              </MDBCardText>
              <MDBCardText>
                <h2 className="text-dark">${parseFloat(product.price).toFixed(2)}</h2>
              </MDBCardText>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBCol>
  );
};

export default ProductCardCategoryView;