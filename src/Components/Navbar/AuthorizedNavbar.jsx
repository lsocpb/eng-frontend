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
    MDBInputGroup,
} from 'mdb-react-ui-kit';
import {useUser} from "../UserContext/UserContext";
import WalletDropdown from '../Wallet/WalletDropdown';
/**
 * AuthorizedNavbar component displays a responsive navigation bar for authenticated users.
 */
export default function AuthorizedNavbar() {
    const [openNavNoTogglerSecond, setOpenNavNoTogglerSecond] = useState(false);
    const [searchText, setSearchText] = useState("");
    const { user } = useUser();

    const searchProducts = (e) => {
        e.preventDefault();
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
                                    <form onSubmit={searchProducts} className="search-form">
                                        <MDBInputGroup>
                                            <input
                                                type='search'
                                                className='form-control rounded-pill'
                                                placeholder='Search for products...'
                                                aria-label='Search'
                                                value={searchText}
                                                onChange={(e) => setSearchText(e.target.value)}
                                            />
                                            <MDBBtn color='danger' rippleColor='dark' className='rounded-pill ms-2'
                                                    type='submit'>
                                                <MDBIcon fas icon='search'/>
                                            </MDBBtn>
                                        </MDBInputGroup>
                                    </form>
                                </MDBNavbarItem>
                                <MDBNavbarItem>
                                    <MDBNavbarLink active aria-current='page' href='/home' className='text-dark'>
                                        <MDBIcon fas icon="home" size={"lg"} className="me-2 mx-4"/>
                                    </MDBNavbarLink>
                                </MDBNavbarItem>
                                <MDBNavbarItem>
                                    <MDBNavbarLink active aria-current='page' href='/profile' className='text-dark'>
                                        <MDBIcon fas icon="user" size={"lg"} className="me-2 mx-4"/>
                                    </MDBNavbarLink>
                                </MDBNavbarItem>
                                <MDBNavbarItem>
                                    <MDBNavbarLink active aria-current='page' className='text-dark'>
                                        <MDBIcon fas icon="bell" size={"lg"} className="me-2 mx-4"/>
                                    </MDBNavbarLink>
                                </MDBNavbarItem>
                                <WalletDropdown/>
                                {user.role === 'admin' &&
                                <MDBNavbarItem>
                                    <MDBNavbarLink active aria-current='page' href='/admin' className='text-dark'>
                                        <MDBIcon fas icon="cog" size={"lg"} className="me-2 mx-4"/>
                                    </MDBNavbarLink>
                                </MDBNavbarItem>
                                }
                                <MDBNavbarItem>
                                    <MDBBtn rounded pill aria-current='page' href='/product/add'
                                            className='mx-5 text-white btn-danger'>
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