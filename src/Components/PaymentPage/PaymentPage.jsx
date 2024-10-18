import React, { useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBTypography,
} from "mdb-react-ui-kit";
import axios from "axios";
import { BASE_API_URL } from "../../api/config";
import Cookies from "js-cookie";

const PaymentPage = () => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const predefinedAmounts = [
    { value: 50, label: "50 PLN" },
    { value: 100, label: "100 PLN" },
    { value: 200, label: "200 PLN" },
    { value: 500, label: "500 PLN" },
  ];

  const handlePredefinedAmount = (value) => {
    setAmount(value.toString());
    setError("");
  };

  const handleCustomAmount = (e) => {
    const value = e.target.value;
    if (
      value === "" ||
      (/^\d*\.?\d{0,2}$/.test(value) && parseFloat(value) <= 10000)
    ) {
      setAmount(value);
      setError("");
    }
  };

  const handleSubmit = async () => {
    if (!amount || parseFloat(amount) < 10) {
      setError("Minimal amount to top up is 10 PLN");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_API_URL}/user/wallet/topup`,
        {
          amount: parseFloat(amount),
        },
        {
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${Cookies.get('active-user')}`
          },
        }
      );

      const data = response.data;

      if (data.payment_url) {
        window.location.href = data.payment_url;
      } else {
        setError("There was an error processing the payment");
      }
    } catch (err) {
      setError("There was an error with the server. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MDBContainer>
      <MDBRow className="justify-content-center py-3">
        <MDBCol md="8" lg="6">
          <MDBCard>
            <MDBCardBody className="p-5">
              <div className="text-center mb-5">
                <MDBIcon
                  fas
                  icon="wallet"
                  size="3x"
                  className="text-success mb-3"
                />
                <MDBTypography tag="h3" className="mb-2">
                  Add funds
                </MDBTypography>
                <p className="text-muted">
                  Choose a predefined amount or enter a custom amount
                </p>
              </div>

              <div className="mb-4">
                <MDBRow className="row-cols-2 g-3">
                  {predefinedAmounts.map((preset) => (
                    <MDBCol key={preset.value}>
                      <MDBBtn
                        color="danger"
                        className={`w-100 ${
                          amount === preset.value.toString()
                            ? "border-primary"
                            : ""
                        }`}
                        onClick={() => handlePredefinedAmount(preset.value)}
                      >
                        {preset.label}
                      </MDBBtn>
                    </MDBCol>
                  ))}
                </MDBRow>
              </div>
              <div className="mb-4">
                <MDBInput
                  label="Own amount (PLN)"
                  type="number"
                  value={amount}
                  onChange={handleCustomAmount}
                  min="10"
                  max="10000"
                  className="mb-2"
                />
                <small className="text-muted">
                  Minimal amount: 10 PLN, maximum: 10,000 PLN
                </small>
              </div>
              {error && <div className="alert alert-danger mb-4">{error}</div>}
              <MDBBtn
                block
                className="mb-4 btn btn-outline-danger"
                onClick={handleSubmit}
                disabled={loading || !amount}
              >
                {loading ? (
                  <>
                    <MDBIcon fas icon="spinner" className="me-2 fa-spin" />
                    Przetwarzanie...
                  </>
                ) : (
                  <>
                    <MDBIcon fas icon="credit-card" className="me-2" />
                    Add funds {amount ? `${amount} PLN` : ""}
                  </>
                )}
              </MDBBtn>
              <div className="text-center text-muted">
                <small>
                  <MDBIcon fas icon="lock" className="me-2" />
                  Payments are secured by Stripe.
                </small>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default PaymentPage;
