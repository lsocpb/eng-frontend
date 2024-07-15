import React, { useState } from 'react';
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
    MDBInputGroup,
} from 'mdb-react-ui-kit';

export default function App() {
    const [openNavNoTogglerSecond, setOpenNavNoTogglerSecond] = useState(false);
    const [searchText, setSearchText] = useState("");

    const user = sessionStorage.getItem('active-user');

    const userLogout = () => {
        sessionStorage.removeItem('active-user');
        window.location.reload();
    }

    const searchProducts = (e) => {
        e.preventDefault();
        // Implement search functionality here
        console.log("Searching for:", searchText);
    };

    return (
        <>
            <MDBNavbar sticky bgColor='white' expand='lg'>
                <MDBContainer fluid>
                    <MDBNavbarBrand href='/home' className='mx-3 d-flex'>
                        <img src={process.env.PUBLIC_URL + '/chairfair.png'} style={{width: '150px', height: '60px'}} alt="CharFair logo"/>
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
                                <form onSubmit={searchProducts}>
                                    <MDBInputGroup>
                                        <input
                                            type='search'
                                            className='form-control rounded-pill'
                                            placeholder='Search for products...'
                                            aria-label='Search'
                                            value={searchText}
                                            onChange={(e) => setSearchText(e.target.value)}
                                        />
                                        <MDBBtn color='danger' rippleColor='dark' className='rounded-pill ms-2' type='submit'>
                                            <MDBIcon fas icon='search' />
                                        </MDBBtn>
                                    </MDBInputGroup>
                                </form>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink active aria-current='page' href='/home' className='text-dark'>
                                    <MDBIcon fas icon="home" className="me-2 mx-4"/> Home
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink active aria-current='page' href='/profile' className='text-dark'>
                                    <MDBIcon fas icon="user" className="me-2 mx-4"/> Profile
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink active aria-current='page' href='/admin/category/all' className='text-dark'>
                                    <MDBIcon fas icon="list" className="me-2 mx-4" /> Causes
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink active aria-current='page' href='/product/add' className='text-dark'>
                                    <MDBIcon fas icon="hand-holding-heart" className="me-2 mx-4" /> Donate
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBBtn color='danger' className="rounded-pill mx-5" onClick={userLogout}>
                                    <MDBIcon fas icon="sign-out-alt" className="me-2" /> Logout
                                </MDBBtn>
                            </MDBNavbarItem>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>
        </>
    );
}