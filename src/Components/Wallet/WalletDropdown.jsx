import React, {useState, useEffect} from 'react';
import {
    MDBNavbarItem,
    MDBNavbarLink,
    MDBIcon,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBBtn,
    MDBSpinner,
} from 'mdb-react-ui-kit';
import axios from 'axios';
import {BASE_API_URL} from '../../api/config';
import "./Wallet.css";
import Cookies from "js-cookie";

/**
 * WalletDropdown component displays the user's wallet balance and provides
 * links to add funds and view transaction history.
 *
 * @component
 * @returns {JSX.Element} - Rendered WalletDropdown component
 */
const WalletDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [walletData, setWalletData] = useState({
        balance_total: 0,
        balance_reserved: 0
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchWalletData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${BASE_API_URL}/user/wallet`, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('active-user')}`
                }
            });
            setWalletData(response.data);
        } catch (err) {
            setError('Failed to load wallet data');
            console.error('Error fetching wallet data:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            fetchWalletData();
        }
    }, [isOpen]);

    const availableBalance = walletData.balance_total - walletData.balance_reserved;

    return (
        <MDBNavbarItem>
            <MDBDropdown>
                <MDBDropdownToggle
                    tag='a'
                    className='nav-link text-dark no-caret'
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <MDBIcon fas icon="wallet" size="lg" className="me-2 mx-2"/>
                </MDBDropdownToggle>

                <MDBDropdownMenu className="p-4 shadow-lg" style={{minWidth: '300px'}}>
                    {isLoading ? (
                        <div className="text-center py-4">
                            <MDBSpinner size="sm"/>
                        </div>
                    ) : error ? (
                        <div className="text-center text-danger py-3">
                            <MDBIcon fas icon="exclamation-circle" className="me-2"/>
                            {error}
                        </div>
                    ) : (
                        <>
                            <div className="text-center mb-4">
                                <MDBIcon
                                    fas
                                    icon="wallet"
                                    size="3x"
                                    style={{color: "#FFC0CB"}}
                                    className="mb-3"
                                />
                                <h4 className="mb-2">Your Balance</h4>
                                <h2 className="text-muted mb-2">${walletData.balance_total.toFixed(2)}</h2>

                                <div className="small text-muted mb-1">
                                    Available: ${availableBalance.toFixed(2)}
                                </div>
                                {walletData.balance_reserved > 0 && (
                                    <div className="small text-warning">
                                        <MDBIcon fas icon="lock" className="me-1"/>
                                        Reserved: ${walletData.balance_reserved.toFixed(2)}
                                    </div>
                                )}
                            </div>

                            <div className="d-grid gap-2">
                                <MDBBtn
                                    color="danger"
                                    className="mb-2"
                                    href="/wallet/add-funds"
                                >
                                    <MDBIcon fas icon="plus-circle" className="me-2"/>
                                    Add Funds
                                </MDBBtn>

                                <MDBBtn
                                    className="btn btn-outline-danger"
                                    outline
                                    href="/wallet/history"
                                >
                                    <MDBIcon fas icon="history" className="me-2"/>
                                    Transaction History
                                </MDBBtn>
                            </div>

                            <hr className="my-4"/>

                            <div className="text-center">
                                <small className="text-muted">
                                    Need help? <a href="/contact">Contact Support</a>
                                </small>
                            </div>
                        </>
                    )}
                </MDBDropdownMenu>
            </MDBDropdown>
        </MDBNavbarItem>
    );
};

export default WalletDropdown;