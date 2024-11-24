import React, {useEffect, useRef, useState} from 'react';
import {
    MDBNavbar,
    MDBContainer,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBIcon,
    MDBCollapse,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink, MDBBtn, MDBInputGroup, MDBSpinner,
} from 'mdb-react-ui-kit';
import axios from "axios";
import {BASE_API_URL} from "../../api/config";
import {useUser} from "../UserContext/UserContext";

/**
 * UnauthorizedNavbar component renders a navigation bar.
 * @returns {JSX.Element} - Rendered UnauthorizedNavbar component
 */
export default function UnAuthorizedNavbar() {
    const [openNavNoTogglerSecond, setOpenNavNoTogglerSecond] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const userContext = useUser();
    const user = userContext?.user;
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

    return (
        <MDBNavbar sticky expand='lg' light bgColor='light'>
            <MDBContainer>
                <MDBNavbarBrand href='/home' className="d-flex mx-2">
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
                <MDBCollapse navbar open={openNavNoTogglerSecond} className="justify-content-center">
                    <MDBNavbarNav className='w-auto mb-lg-0 justify-content-center align-items-center'>
                        <div ref={searchContainerRef} className="pe-4">
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
                                        aria-label='Search'
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
                                    className="position-absolute w-50 mt-2 bg-white rounded-3 shadow-lg border border-gray-200"
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
                                            aria-label="Times"
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
                        <div className="d-flex mx-3">
                            <MDBNavbarItem>
                                <MDBBtn href='/register' className='btn btn-outline-danger rounded-pill mx-2'>
                                    Register
                                </MDBBtn>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBBtn href='/login' className='btn btn-danger rounded-pill'>
                                    Login
                                </MDBBtn>
                            </MDBNavbarItem>
                        </div>
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    );
}