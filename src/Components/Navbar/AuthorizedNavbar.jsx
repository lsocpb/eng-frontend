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
} from 'mdb-react-ui-kit';

export default function App() {
    const [openNavNoTogglerSecond, setOpenNavNoTogglerSecond] = useState(false);

    const user = sessionStorage.getItem('active-user');

    const userLogout = () => {
        sessionStorage.removeItem('active-user');
        window.location.reload();
    }

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
                    <MDBCollapse navbar open={openNavNoTogglerSecond} className='justify-content-center'>
                        <MDBNavbarNav className='mb-2 px-4 mb-lg-0 align-items-center'>
                            <MDBNavbarItem>
                                <MDBNavbarLink active aria-current='page' href='/home' className='text-dark'>
                                    <MDBIcon fas icon="home" className="me-2" /> Home
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink active aria-current='page' href='/profile' className='text-dark'>
                                    <MDBIcon fas icon="user" className="me-2" /> Profile
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink active aria-current='page' href='/admin/category/all' className='text-dark'>
                                    <MDBIcon fas icon="list" className="me-2" /> Causes
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink active aria-current='page' href='/product/add' className='text-dark'>
                                    <MDBIcon fas icon="hand-holding-heart" className="me-2" /> Donate
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBBtn color='danger' className="rounded-pill" onClick={userLogout}>
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