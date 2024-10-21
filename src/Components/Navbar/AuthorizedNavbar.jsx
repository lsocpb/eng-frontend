import React, {useEffect, useRef, useState} from 'react';
import {
    MDBNavbar,
    MDBContainer,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBCollapse,
    MDBBtn,
    MDBIcon,
    MDBNavbarNav,
    MDBInputGroup, MDBSpinner,
} from 'mdb-react-ui-kit';
import {useUser} from "../UserContext/UserContext";
import WalletDropdown from '../Wallet/WalletDropdown';
import NotificationDropdown from '../Notifications/NotificationDropdown';
import axios from "axios";
import {BASE_API_URL} from "../../api/config";
import "./AdminNavbar.css"

/**
 * AuthorizedNavbar component displays a responsive navigation bar for authenticated users.
 * @returns {JSX.Element} - Rendered AuthorizedNavbar component
 */
export default function AuthorizedNavbar() {
    const [openNavNoTogglerSecond, setOpenNavNoTogglerSecond] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const {user} = useUser();
    const searchContainerRef = useRef(null);
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        /**
         * Function to handle clicks outside the search container
         * @param {Event} event - The event object
         */
        function handleClickOutside(event) {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
                setShowResults(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    /**
     * Function to search for products based on the search text
     * @param {Event} e 
     */
    const searchProducts = async (e) => {
        e.preventDefault();

        if (!searchText.trim()) {
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post((`${BASE_API_URL}/auction/search`), {
                keyword: searchText
            });
            setSearchResults(response.data.auctions);
            setShowResults(true);
        } catch (err) {
            if (err.response?.status === 404) {
                setSearchResults([]);
                setError('No auctions found');
                setShowResults(false);
            } else {
                setError('An error occurred while searching. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };
    /**
     * Function to clear the search results and search text 
     */
    const clearSearch = () => {
        setSearchText('');
        setSearchResults([]);
        setError(null);
        setShowResults(false);
    };

    return (
        <>
            <MDBNavbar sticky bgColor='white' expand='lg'>
                <MDBContainer>
                    <MDBNavbarBrand href='/home' className='mx-3 d-flex'>
                        <img src={process.env.PUBLIC_URL + '/chairfair.png'} style={{width: '150px', height: '60px'}}
                             alt="CharFair logo"/>
                    </MDBNavbarBrand>
                    <MDBNavbarToggler
                        type='button'
                        data-target='#navbarTogglerDemo02'
                        aria-controls='navbarTogglerDemo02'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                        onClick={() => setOpenNavNoTogglerSecond(!openNavNoTogglerSecond)}
                    >
                        <MDBIcon icon='bars' fas/>
                    </MDBNavbarToggler>
                    <MDBCollapse navbar open={openNavNoTogglerSecond}>
                        <MDBNavbarNav className='mb-2 px-4 mb-lg-0 align-items-center'>
                            <MDBNavbarItem className="flex-grow-1 mx-5 mt-1">
                                <div ref={searchContainerRef} className="position-relative">
                                    <form onSubmit={searchProducts} className="search-form">
                                        <MDBInputGroup>
                                            <input
                                                type='search'
                                                className='form-control rounded-pill'
                                                placeholder='Search for products...'
                                                aria-label='Search'
                                                value={searchText}
                                                onChange={(e) => setSearchText(e.target.value)}
                                                onFocus={() => {
                                                    if (searchResults.length > 0 || error) {
                                                        setShowResults(true);
                                                    }
                                                }}
                                            />
                                            <MDBBtn
                                                color='danger'
                                                rippleColor='dark'
                                                className='rounded-pill ms-2'
                                                type='submit'
                                                disabled={isLoading}
                                            >
                                                {isLoading ? (
                                                    <MDBSpinner size='sm'/>
                                                ) : (
                                                    <MDBIcon fas icon='search'/>
                                                )}
                                            </MDBBtn>
                                        </MDBInputGroup>
                                    </form>

                                    {showResults && (searchResults.length > 0 || error) && (
                                        <div
                                            className="position-absolute w-100 mt-2 bg-white rounded-3 shadow-lg border border-gray-200"
                                            style={{
                                                maxHeight: '400px',
                                                overflowY: 'auto',
                                                zIndex: 1000
                                            }}>
                                            <div
                                                className="d-flex justify-content-between align-items-center p-3 border-bottom bg-light">
                                                <span className="fw-bold text-gray-700">
                                                    {searchResults.length} Results found
                                                </span>
                                                <button
                                                    type="button"
                                                    className="btn btn-link p-1 rounded-circle hover:bg-gray-200"
                                                    onClick={() => setShowResults(false)}
                                                >
                                                    <MDBIcon fas icon="times" className="text-gray-600"/>
                                                </button>
                                            </div>

                                            {error ? (
                                                <div className="p-4 text-center">
                                                    <MDBIcon far icon="frown" size="3x" className="text-gray-400 mb-3"/>
                                                    <p className="text-gray-600">{error}</p>
                                                </div>
                                            ) : (
                                                <div className="divide-y divide-gray-200">
                                                    {searchResults.map((auction) => (
                                                        <a
                                                            key={auction.id}
                                                            href={`/auction/${auction.id}`}
                                                            className="d-block p-3 text-decoration-none text-dark hover:bg-gray-50 transition-colors duration-200"
                                                        >
                                                            <div className="d-flex align-items-center">
                                                                {auction.product.image_url_1 ? (
                                                                    <div className="flex-shrink-0">
                                                                        <img
                                                                            src={auction.product.image_url_1}
                                                                            alt={auction.name}
                                                                            className="rounded-3 object-cover"
                                                                            style={{
                                                                                width: '60px',
                                                                                height: '60px',
                                                                            }}
                                                                        />
                                                                    </div>
                                                                ) : (
                                                                    <div className="flex-shrink-0 bg-gray-200 rounded-3"
                                                                         style={{
                                                                             width: '60px',
                                                                             height: '60px'
                                                                         }}>
                                                                        <MDBIcon far icon="image"
                                                                                 className="text-gray-400"/>
                                                                    </div>
                                                                )}
                                                                <div className="ms-3 flex-grow-1">
                                                                    <div className="fw-bold mb-1 text-gray-900">
                                                                        {auction.product.name}
                                                                    </div>
                                                                    <div className="d-flex align-items-center">
                                                                        <span className="text-danger fw-semibold">
                                                                            ${auction.price || '0'}
                                                                        </span>
                                                                        <span className="ms-2 text-gray-500 small">
                                                                            Current bid
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <MDBIcon fas icon="chevron-right"
                                                                         className="text-gray-400 ms-2"/>
                                                            </div>
                                                        </a>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink active aria-current='page' href='/home' className='text-dark'>
                                    <MDBIcon fas icon="home" size={"lg"} className="me-2 mx-2"/>
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink active aria-current='page' href='/profile' className='text-dark'>
                                    <MDBIcon fas icon="user" size={"lg"} className="me-2 mx-2"/>
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            <NotificationDropdown/>
                            <WalletDropdown/>
                            {user.role === 'admin' &&
                                <MDBNavbarItem>
                                    <MDBNavbarLink active aria-current='page' href='/admin' className='text-dark'>
                                        <MDBIcon fas icon="cog" size={"lg"} className="me-2 mx-2"/>
                                    </MDBNavbarLink>
                                </MDBNavbarItem>
                            }
                            <MDBNavbarItem>
                                <MDBBtn rounded pill="true" aria-current='page' href='/product/add'
                                        className='mx-2 text-white btn-danger'>
                                    <MDBIcon fas icon="hand-holding-heart" className="me-2"/> Donate
                                </MDBBtn>
                            </MDBNavbarItem>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>
        </>
    );
}