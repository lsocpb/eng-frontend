import React, { useState, useEffect } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBSpinner,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
  MDBBadge,
  MDBCard,
  MDBCardBody
} from 'mdb-react-ui-kit';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get('https://api.charfair.me/user/wallet/transactions', {
          headers: {
            'Authorization': `Bearer ${Cookies.get('active-user')}`
          }
        });
        setTransactions(response.data.transactions);
      } catch (err) {
        setError('Failed to load transaction history');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'success':
        return <MDBBadge color='success' className='me-1'>Success</MDBBadge>;
      case 'expired':
        return <MDBBadge color='warning' className='me-1'>Expired</MDBBadge>;
      default:
        return <MDBBadge color='info' className='me-1'>{status}</MDBBadge>;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <MDBContainer>
      <MDBContainer fluid className="py-5">
        <MDBRow className="justify-content-center mb-5">
          <MDBCol md="10" lg="8" className="text-center">
            <h1 className="display-4 text-danger font-weight-bold mb-4">
              Transaction History
            </h1>
            <p className="lead text-muted">
              View your recent transactions and payment history
            </p>
          </MDBCol>
        </MDBRow>

        <MDBRow className="justify-content-center">
          <MDBCol md="10" lg="8">
            {isLoading ? (
              <div className="text-center py-5">
                <MDBSpinner />
              </div>
            ) : error ? (
              <div className="text-center text-danger py-4">
                <MDBIcon fas icon="exclamation-circle" className="me-2" />
                {error}
              </div>
            ) : (
              <MDBCard className="border-0 shadow-sm">
                <MDBCardBody className="p-4">
                  <MDBTable hover responsive className="align-middle mb-0">
                    <MDBTableHead>
                      <tr>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Receipt</th>
                      </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                      {transactions.map((transaction) => (
                        <tr key={transaction.uuid}>
                          <td>{formatDate(transaction.created_at)}</td>
                          <td>
                            <span className={transaction.amount >= 0 ? 'text-success' : 'text-danger'}>
                              ${Math.abs(transaction.amount).toFixed(2)}
                            </span>
                          </td>
                          <td>{getStatusBadge(transaction.transaction_status)}</td>
                          <td>
                            {transaction.receipt_url ? (
                              <MDBBtn
                                color="link"
                                size="sm"
                                href={transaction.receipt_url}
                                target="_blank"
                              >
                                <MDBIcon fas icon="receipt" />
                              </MDBBtn>
                            ) : (
                              <span className="text-muted">-</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </MDBTableBody>
                  </MDBTable>

                  {transactions.length === 0 && (
                    <div className="text-center text-muted py-4">
                      <MDBIcon fas icon="info-circle" className="me-2" />
                      No transactions found
                    </div>
                  )}
                </MDBCardBody>
              </MDBCard>
            )}
          </MDBCol>
        </MDBRow>

        <MDBRow className="justify-content-center mt-5">
          <MDBCol md="10" lg="8" className="text-center">
            <MDBCard className="border-0 shadow-sm bg-danger text-white">
              <MDBCardBody className="p-5">
                <MDBIcon fas icon="wallet" size="3x" className="mb-3" />
                <h3 className="mb-3">Need to add funds?</h3>
                <p className="mb-4">
                  Ready to increase your wallet balance? Click below to add funds.
                </p>
                <MDBBtn
                  color="light"
                  size="lg"
                  onClick={() => navigate('/wallet/add-funds')}
                >
                  Add Funds
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </MDBContainer>
  );
};

export default TransactionHistory;