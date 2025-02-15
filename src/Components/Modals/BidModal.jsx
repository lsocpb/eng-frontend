import React, { useState } from "react";
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
  MDBIcon,
} from "mdb-react-ui-kit";
import Cookies from "js-cookie";
import {
  showErrorToast,
  showSuccessToast,
} from "../ToastNotifications/ToastNotifications";
import axios from "axios";
import { BASE_API_URL } from "../../api/config";
import { useNavigate } from "react-router-dom";
import { socketService } from "../../services/socketService";

/**
 * BidModal component represents a modal that allows the user to place a bid on a product.
 * @component
 * @param {Object} props
 * @param {boolean} props.isOpen - The state of the modal
 * @param {function} props.toggle - The function to toggle the modal
 * @param {string} props.productName - The name of the product
 * @param {number} props.currentPrice - The current price of the product
 * @param {number} props.auctionId - The ID of the auction
 * @returns {JSX.Element} The BidModal component
 */
const BidModal = ({ isOpen, toggle, productName, currentPrice, auctionId }) => {
  const [bidAmount, setBidAmount] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  /**
   * Function to handle the bid button click
   * @param {Object} e - The event object
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get("active-user");
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${BASE_API_URL}/auction/bid`,
        {
          auction_id: parseInt(auctionId),
          bid_value: parseFloat(bidAmount),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      confirmBid();
      showSuccessToast(response.data.message || "Bid placed successfully");
    } catch (error) {
      const errorMessage =
        error.response?.data?.detail ||
        "An error occurred while placing your bid.";
      showErrorToast(errorMessage);
      setTimeout(() => {
        confirmBid();
      }, 500);
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Function to confirm the bid
   */
  const confirmBid = () => {
    setShowConfirmation(false);
    setBidAmount("");
    toggle();
  };

  /**
   * Function to cancel the bid
   */
  const cancelBid = () => {
    setShowConfirmation(false);
  };

  return (
    <MDBModal open={isOpen} tabIndex="-1">
      <MDBModalDialog>
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>
              You are placing a bid for: {productName}
            </MDBModalTitle>
            <MDBBtn
              className="btn-close"
              color="danger"
              onClick={toggle}
            ></MDBBtn>
          </MDBModalHeader>
          {!showConfirmation ? (
            <form onSubmit={handleSubmit}>
              <MDBModalBody>
                <p>Current price: ${currentPrice}</p>
                <MDBInput
                  label="Your offer (USD)"
                  id="bidAmount"
                  type="number"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  required
                  step="0.01"
                />
              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn className="btn-outline-danger" onClick={toggle}>
                  Cancel
                </MDBBtn>
                <MDBBtn type="submit" color="danger" disabled={isSubmitting}>
                  <MDBIcon fas icon="gavel" className="me-2" />
                  {isSubmitting ? "Submitting..." : "Place a bid"}
                </MDBBtn>
              </MDBModalFooter>
            </form>
          ) : (
            <>
              <MDBModalBody>
                <p>
                  Are you sure you want to place a bid of ${bidAmount} for{" "}
                  {productName}?
                </p>
              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn className="btn-outline-danger" onClick={cancelBid}>
                  Cancel
                </MDBBtn>
                <MDBBtn color="danger" onClick={confirmBid}>
                  <MDBIcon fas icon="check" className="me-2" /> Confirm Bid
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
