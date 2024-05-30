import React, {useState} from 'react';
import {
    MDBNavbar,
    MDBContainer,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBIcon,
    MDBCollapse,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink, MDBBtn,
} from 'mdb-react-ui-kit';

export default function App() {
    const [openNavNoTogglerSecond, setOpenNavNoTogglerSecond] = useState(false);

    return (
        <MDBNavbar expand='lg' light bgColor='light'>
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
                <MDBCollapse navbar open={openNavNoTogglerSecond} className="justify-content-end">
                    <MDBNavbarNav className='w-auto mb-lg-0 align-items-center'>
                        <div className="d-flex">
                            <MDBNavbarItem>
                                <MDBBtn href='/register' className='btn btn-outline-danger rounded-pill'>
                                    Register
                                </MDBBtn>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBBtn href='/login' className='btn btn-outline-danger rounded-pill' tabIndex={-1}
                                        aria-disabled='true'>
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