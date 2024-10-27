import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBBadge,
  MDBCarousel,
  MDBCarouselItem,
  MDBSpinner,
  MDBBtn,
  MDBIcon,
  MDBProgress,
  MDBProgressBar,
} from "mdb-react-ui-kit";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { BASE_API_URL } from "../../api/config";
import CountdownTimer from "../CountdownTimer/CountdownTimer";
import BidModal from "../Modals/BidModal";
import BuyModal from "../Modals/BuyModal";
import Cookies from "js-cookie";
import { socketService } from "../../services/socketService";
import { showErrorToast } from "../ToastNotifications/ToastNotifications";
import SocialModal from "../Modals/SocialModal/SocialModal";
import {useUser} from "../UserContext/UserContext";

/**
 * Component that displays detailed information about a product.
 * Fetches product data based on the `productId` from the URL parameters
 * and displays it along with seller information.
 *
 * @component
 * @returns {React.Element} - Returns the product detail page with images, descriptions, and seller information.
 */
const ProductPage = () => {
  const { auctionId } = useParams();
  const [auction, setAuction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showBidModal, setShowBidModal] = useState(false);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [isAuctionEnded, setIsAuctionEnded] = useState(false);
  const [seller, setSeller] = useState(null);
  const [product, setProduct] = useState(null);
  const [isBuyNow, setIsBuyNow] = useState(false);
  const [finished, setFinished] = useState(false);
  const [isPriceUpdating, setIsPriceUpdating] = useState(false);
  const [showSocialModal, setShowSocialModal] = useState(false);
  const { user } = useUser();
  const shareUrl = window.location.href;

  useEffect(() => {
    /**
     * Function to fetch product data from the API
     */
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${BASE_API_URL}/auction/id/${auctionId}`
        );
        setAuction(response.data);
        setFinished(response.data.is_auction_finished);
        setProduct(response.data.product);
        setIsBuyNow(response.data.auction_type === "buy_now")
        setSeller(response.data.seller);
        checkAuctionStatus(response.data.product.end_date);
        const token = Cookies.get("active-user");
        if (token) {
          socketService.connect(token);
          socketService.followAuction(response.data.id);
        }
      } catch (err) {
        setError(`Failed to fetch product data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();

    /**
     * Function to handle price updates from the socket service
     * @param {Array} data
     */
    const handlePriceUpdate = (data) => {
      setIsPriceUpdating(true);
      if (data.price) {
        setAuction((prevAuction) => ({
          ...prevAuction,
          price: data.price,
        }));
      }
      setTimeout(() => {
        setIsPriceUpdating(false);
      }, 1000);
    };

    /**
     * Function to handle winner updates from the socket service
     */
    const handleWinnerUpdate = () => {
      showErrorToast("You are no longer the highest bidder");
    };

    socketService.addListener("bid_price_update", handlePriceUpdate);
    socketService.addListener("bid_winner_update", handleWinnerUpdate);

    return () => {
      socketService.removeListener("bid_price_update", handlePriceUpdate);
      socketService.removeListener("bid_price_update", handleWinnerUpdate);
      socketService.disconnect();
    };
  }, [auctionId]);

  /**
   * Function to check if the auction has ended
   */
  const checkAuctionStatus = (endDate) => {
    const now = new Date();
    const auctionEndDate = new Date(endDate);
    setIsAuctionEnded(now > auctionEndDate);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <MDBContainer className="text-center mt-5">
        <h2 className="text-danger">{error}</h2>
      </MDBContainer>
    );
  }

  if (!auction) {
    return (
      <MDBContainer className="text-center mt-5">
        <h2 className="text-warning">Product not found</h2>
      </MDBContainer>
    );
  }
  const imageStyle = {
    width: "100%",
    height: "800px",
    objectFit: "contain",
    objectPosition: "center",
    transition: "opacity 0.5s ease-in-out",
  };
  /**
   * Function to toggle the bid modal
   */
  const toggleBidModal = () => {
    if (!user) {
      showErrorToast("You need to be logged in to place a bid");
    }
    setShowBidModal(!showBidModal);
  };
  /**
   * Function to toggle the buy modal
   */
  const toggleBuyModal = () => {
    if (!user) {
        showErrorToast("You need to be logged in to buy this product");
    }
    setShowBuyModal(!showBuyModal);
  };
  /**
   * Function to toggle the social modal
   */
  const toggleSocialModal = () => {
    setShowSocialModal(!showSocialModal);
  };

  return (
    <MDBContainer fluid className="my-5 px-5">
      <MDBRow>
        <MDBCol md="8">
          <MDBCard className="shadow-6-strong mb-4">
            <MDBCardBody>
              <MDBCarousel showControls showIndicators fade>
                {[product.image_url_1, product.image_url_2, product.image_url_3]
                  .filter(Boolean)
                  .map((url, index) => (
                    <MDBCarouselItem key={index} itemId={index + 1}>
                      <img
                        src={url}
                        alt={`Product image ${index + 1}`}
                        style={imageStyle}
                      />
                    </MDBCarouselItem>
                  ))}
              </MDBCarousel>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol md="4">
          <MDBCard className="shadow-6-strong mb-4">
            <MDBCardBody>
              <MDBCardTitle className="h2 mb-3">{product.name}</MDBCardTitle>
              <MDBCardText
                className={`h2 mb-4 ${isPriceUpdating ? "text-danger" : ""}`}
                style={{ transition: "color 0.3s ease-in-out" }}
              >
                ${parseFloat(auction.price).toFixed(2)}
                {isPriceUpdating && (
                  <MDBBadge color="success" className="ms-2">
                    New!
                  </MDBBadge>
                )}
              </MDBCardText>
              <MDBCardText>
                {finished ? (
                  <MDBBadge color="danger">Auction Ended</MDBBadge>
                ) : (
                  <small className="text-muted">
                    Ends in:{" "}
                    <CountdownTimer date={new Date(auction.end_date)} />
                  </small>
                )}
              </MDBCardText>
              <div className="mt-4 d-flex flex-column">
                {!isBuyNow ? (
                  <MDBBtn
                    rounded
                    pill
                    color={"danger"}
                    className="mb-2 w-auto"
                    onClick={toggleBidModal}
                    disabled={finished}
                  >
                    <MDBIcon fas icon="gavel" className="me-2" />
                    {finished ? "AUCTION ENDED" : "PLACE A BID!"}
                  </MDBBtn>
                ) : (
                  <MDBBtn
                    rounded
                    pill
                    color={"danger"}
                    className="mb-2 w-auto"
                    onClick={toggleBuyModal}
                    disabled={finished}
                  >
                    <MDBIcon fas icon="shopping-cart" className="me-2" />
                    {finished ? "AUCTION ENDED" : "BUY NOW!"}
                  </MDBBtn>
                )}
                <MDBBtn
                  rounded
                  pill
                  className="mb-2 w-auto btn-outline-danger"
                  onClick={toggleSocialModal}
                >
                  <MDBIcon fas icon="heart" className="me-2" /> SHARE ON
                  SOCIALS!
                </MDBBtn>
              </div>
              <MDBCardText className="text-center text-muted mt-2">
                <MDBIcon fas icon="info-circle" className="me-2" />
                Your support makes a difference!
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>

          <MDBCard className="shadow-6-strong bg-light">
            <MDBCardBody className="d-flex flex-column align-items-center">
              <MDBCardText>
                <h2 className="text-center mb-3">Seller</h2>
              </MDBCardText>
              <MDBCardImage
                src={seller.profile_image_url}
                alt="Champion Profile Picture"
                className="rounded-circle mb-3 border border-danger"
                style={{ width: "120px", height: "120px", objectFit: "cover" }}
              />
              <MDBCardText className="text-center mb-3">
                <strong className="h4 text-danger">{seller.username}</strong>
              </MDBCardText>
              <MDBCardText className="text-center mt-3 small">
                <MDBIcon fas icon="star" className="text-warning me-2" />
                verified seller
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>

      <MDBRow className="mt-2">
        <MDBCol md="8">
          <MDBCard className="shadow-6-strong">
            <MDBCardBody>
              <MDBCardText className="h2">About</MDBCardText>
              <MDBCardText className="lead">{product.description}</MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      <BidModal
        isOpen={showBidModal}
        toggle={toggleBidModal}
        productName={auction.name}
        currentPrice={parseFloat(auction.price).toFixed(2)}
        auctionId={auction.id}
      />
      <BuyModal
        isOpen={showBuyModal}
        toggle={toggleBuyModal}
        productName={auction.product.name}
        productPrice={parseFloat(auction.price).toFixed(2)}
        auctionId={auction.id}
      />
      <SocialModal
        isOpen={showSocialModal}
        toggle={toggleSocialModal}
        url={shareUrl}
        title={auction.product.name}
        description={auction.product.description}
        hashtag={"#ChampionAuctions #charity #charfair"}
      />
    </MDBContainer>
  );
};

export default ProductPage;
