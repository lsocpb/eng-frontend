import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import CategoryNavigator from "../Category/CategoryNavigator";
import { MDBCard, MDBCardBody, MDBCardFooter, MDBIcon, MDBBadge, MDBTooltip } from "mdb-react-ui-kit";

/**
 * A card component that displays brief information about a product, including its image, description,
 * category, seller details, and bid information.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.item - The product item data.
 * @returns {React.Element} - A card UI displaying the product's summary details.
 */
const ProductCard = ({item}) => {

    const [isBuyNow, setIsBuyNow] = useState(false);

    useEffect(() => {
        setIsBuyNow(item.auction_type === "buy_now");
    }, [item]);

    /**
     * Truncates the product description if it exceeds the specified length.
     *
     * @param {string} description - The full product description.
     * @param {number} maxLength - The maximum length of the description to display.
     * @returns {string} - The truncated description with "..." appended if it was shortened.
     */
    const descriptionToShow = (description, maxLength) => {
        if (description.length <= maxLength) {
            return description;
        } else {
            const truncatedText = description.substring(0, maxLength);
            return truncatedText + "...";
        }
    };

    return (
        <MDBCard className="py-1 h-100 shadow-5-strong">
            <div className="position-relative" style={{ height: '300px' }}>
                <img
                    src={item.product.image_url_1}
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
                    <CategoryNavigator item={{ id: item.category.category_id }} />
                    <small className="text-muted">
                        <MDBIcon far icon="clock" className="me-1" /> {item.days_left} days left
                    </small>
                </div>

                <h5 className="card-title mb-2 text-truncate">
                    <b>{item.product.name}</b>
                </h5>

                <p className="card-text flex-grow-1 overflow-hidden" style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                }}>
                    {descriptionToShow(item.product.description, 70)}
                </p>

                <div className="d-flex justify-content-between align-items-center mt-auto">
                    <div className="d-flex align-items-center">
                        <img
                            src={item.seller.profile_image_url || "https://via.placeholder.com/40"}
                            alt="Seller"
                            className="rounded-circle me-2 border border-danger"
                            style={{width: '40px', height: '40px', objectFit: 'cover'}}
                        />
                        <small>{item.seller.username || "Anonymous"}</small>
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
                        to={`/auction/${item.id}`}
                        className="btn btn-danger rounded-pill px-3 py-2">
                        {isBuyNow ? "Buy Now" : "Bid Now"}
                    </Link>
                    <div className="text-end">
                        <small className="text-muted">{isBuyNow ? "Price" : "Current Bid"}</small>
                        <h5 className="mb-0 text-danger">${item.price}</h5>
                    </div>
                </div>
            </MDBCardFooter>
        </MDBCard>
    );
};

export default ProductCard;