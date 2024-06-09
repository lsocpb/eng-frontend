import React, {useState} from 'react';
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
    MDBInputGroup
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
            <MDBNavbar expand='lg px-2' light bgColor='light'>
                <MDBContainer fluid>
                    <MDBNavbarBrand href='/home'>CharFair</MDBNavbarBrand>
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
                    <MDBCollapse navbar open={openNavNoTogglerSecond}
                                 className='justify-content-center align-items-center'>
                        <MDBNavbarNav className='ms-auto mb-lg-0 align-items-center'>
                            <MDBNavbarItem>
                                <MDBNavbarLink active aria-current='page' href='/home'>
                                    Home
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink active aria-current='page' href='/profile'>
                                    Profile
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBBtn className="btn btn-outline-danger rounded-pill" tabIndex={-1}
                                        aria-disabled='true' onClick={userLogout}>
                                    Logout
                                </MDBBtn>
                            </MDBNavbarItem>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>
        </>
    );
}