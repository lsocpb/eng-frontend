import React, { useState, useEffect } from 'react';
import {
  MDBIcon,
  MDBSpinner,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
  MDBBadge
} from 'mdb-react-ui-kit';
import axios from 'axios';
import Cookies from 'js-cookie';
import {BASE_API_URL} from "../../api/config";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${BASE_API_URL}/user/wallet/transactions`, {
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
    <div className="container py-5">
      <div className="card shadow-lg">
        <div className="card-body p-4">
          <div className="text-center mb-4">
            <MDBIcon
              fas
              icon="history"
              size="3x"
              style={{ color: "#FFC0CB" }}
              className="mb-3"
            />
            <h2 className="mb-4">Transaction History</h2>
          </div>

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
            <>
              <MDBTable hover responsive className="align-middle mb-4">
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

              <div className="d-flex justify-content-center gap-2">
                <MDBBtn
                  color="danger"
                  href="/wallet"
                  className="w-50 text-center"
                >
                  <MDBIcon fas icon="wallet" className="me-2" />
                  Back to Wallet
                </MDBBtn>
              </div>

              <hr className="my-4" />

              <div className="text-center">
                <small className="text-muted">
                  Need help? <a href="/contact">Contact Support</a>
                </small>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;