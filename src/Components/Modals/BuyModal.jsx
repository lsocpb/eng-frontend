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
  MDBIcon,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
  showErrorToast,
  showSuccessToast,
} from "../ToastNotifications/ToastNotifications";
import axios from "axios";
import { BASE_API_URL } from "../../api/config";
import Cookies from "js-cookie";

/**
 * BuyModal component represents a modal that allows the user to buy a product.
 * @component
 * @param {Object} props
 * @param {boolean} props.isOpen - The state of the modal
 * @param {function} props.toggle - The function to toggle the modal
 * @param {string} props.productName - The name of the product
 * @param {number} props.productPrice - The price of the product
 * @param {number} props.auctionId - The ID of the auction
 * @returns {JSX.Element} The BuyModal component
 */
const BuyModal = ({ isOpen, toggle, productName, productPrice, auctionId }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Function to handle the buy button click
   */
  const handleBuy = () => {
    setShowConfirmation(true);
  };

  /**
   * Function to cancel the purchase
   */
  const cancelPurchase = () => {
    setShowConfirmation(false);
  };

  /**
   * Function to confirm the purchase
   */
  const confirmPurchase = async () => {
    const token = Cookies.get("active-user");
    if (!token) {
      showErrorToast("You must be logged in to make a purchase");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${BASE_API_URL}/auction/buy_now`,
        {
          auction_id: parseInt(auctionId),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toggle();
      showSuccessToast(
        "Item purchased successfully, we notified buyer and will contact you soon"
      );
    } catch (error) {
      showErrorToast(error);
    } finally {
      setIsSubmitting(false);
      setShowConfirmation(false);
    }
  };

  return (
    <MDBModal open={isOpen} tabindex={-1}>
      <MDBModalDialog>
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>You are purchasing: {productName}</MDBModalTitle>
            <MDBBtn
              className="btn-close"
              color="none"
              onClick={toggle}
            ></MDBBtn>
          </MDBModalHeader>
          {!showConfirmation ? (
            <MDBModalBody>
              <p>Price: ${productPrice}</p>
            </MDBModalBody>
          ) : (
            <MDBModalBody>
              <p>
                Are you sure you want to purchase {productName} for $
                {productPrice}?
              </p>
              <p className="text-danger">
                  Please note that this action is irreversible, make sure you
                  want to buy this item!
              </p>
              <p>
                We will inform the seller and he will contact you soon after purchase
                to arrange details about the auction.
              </p>
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
                {isSubmitting ? (
                  <MDBBtn color="danger" disabled>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Purchasing...
                  </MDBBtn>
                ) : (
                  <MDBBtn color="danger" onClick={confirmPurchase}>
                    <MDBIcon fas icon="shopping-cart" className="me-2" />
                    Confirm Purchase
                  </MDBBtn>
                )}
              </>
            )}
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
};

export default BuyModal;
