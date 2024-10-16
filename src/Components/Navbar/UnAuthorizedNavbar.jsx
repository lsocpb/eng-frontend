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

/**
 * UnauthorizedNavbar component renders a navigation bar.
 *
 */
export default function UnAuthorizedNavbar() {
    const [openNavNoTogglerSecond, setOpenNavNoTogglerSecond] = useState(false);

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
                <MDBCollapse navbar open={openNavNoTogglerSecond} className="justify-content-end">
                    <MDBNavbarNav className='w-auto mb-lg-0 align-items-center'>
                        <div className="d-flex mx-3">
                            <MDBNavbarItem>
                                <MDBBtn href='/register' className='btn btn-outline-danger rounded-pill'>
                                    Register
                                </MDBBtn>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBBtn href='/login' className='btn btn-danger rounded-pill' tabIndex={-1}
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