import React from 'react';
import { Link } from "react-router-dom";
import CategoryNavigator from "../Category/CategoryNavigator";
import { MDBCard, MDBCardBody, MDBCardFooter, MDBIcon, MDBBadge, MDBTooltip } from "mdb-react-ui-kit";

const ProductCard = ({item}) => {
    const descriptionToShow = (description, maxLength) => {
        if (description.length <= maxLength) {
            return description;
        } else {
            const truncatedText = description.substring(0, maxLength);
            return truncatedText + "...";
        }
    };

    return (
        <MDBCard className="py-1 h-100 shadow-5-strong" style={{ width: '400px' }}>
            <div className="position-relative" style={{ height: '300px' }}>
                <img
                    src={item.image_url_1}
                    className="card-img-top"
                    alt={item.name}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                />
                <MDBBadge color="danger" className="position-absolute top-0 end-0 m-2">
                    New
                </MDBBadge>
            </div>

            <MDBCardBody className="d-flex flex-column" style={{ height: '250px' }}>
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <CategoryNavigator item={{ id: item.category_id }} />
                    <small className="text-muted">
                        <MDBIcon far icon="clock" className="me-1" /> {item.days_left} days left
                    </small>
                </div>

                <h5 className="card-title mb-2 text-truncate">
                    <b>{item.name}</b>
                </h5>

                <p className="card-text flex-grow-1 overflow-hidden" style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                }}>
                    {descriptionToShow(item.description, 70)}
                </p>

                <div className="d-flex justify-content-between align-items-center mt-auto">
                    <div className="d-flex align-items-center">
                        <img
                            src={item.seller_avatar || "https://via.placeholder.com/40"}
                            alt="Seller"
                            className="rounded-circle me-2 border border-danger"
                            style={{width: '40px', height: '40px', objectFit: 'cover'}}
                        />
                        <small>{item.seller_name || "Anonymous"}</small>
                    </div>
                    <MDBTooltip tag="span" title="Number of bids">
                        <MDBBadge color="light" className="text-dark">
                            <MDBIcon fas icon="gavel" className="me-1" />
                            {item.bid_count || 0}
                        </MDBBadge>
                    </MDBTooltip>
                </div>
            </MDBCardBody>

            <MDBCardFooter className="bg-transparent border-top-0">
                <div className="d-flex justify-content-between align-items-center">
                    <Link
                        to={`/product/${item.id}/category/${item.category_id}`}
                        className="btn btn-danger rounded-pill px-3 py-2">
                        Bid Now
                    </Link>
                    <div className="text-end">
                        <small className="text-muted">Current Bid</small>
                        <h5 className="mb-0 text-danger">${item.price}</h5>
                    </div>
                </div>
            </MDBCardFooter>
        </MDBCard>
    );
};

export default ProductCard;