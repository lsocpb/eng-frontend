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
import './AdminNavbar.css';

export default function App() {
    const [openNavNoTogglerSecond, setOpenNavNoTogglerSecond] = useState(false);
    const [searchText, setSearchText] = useState("");

    const searchProducts = (e) => {
        e.preventDefault();
    };

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const Sidebar = () => (
        <>
            <div className={`sidebar bg-dark text-white ${sidebarOpen ? 'open' : 'closed'}`} style={{
                width: '250px',
                height: '100vh',
                position: 'fixed',
                left: sidebarOpen ? '0' : '-250px',
                top: 0,
                transition: 'left 0.3s ease-in-out',
                overflowX: 'hidden',
                zIndex: 1001,
            }}>
                <MDBNavbarBrand href='#' className='mt-3 mb-2 text-center justify-content-center align-items-center'>
                    <span className='text-center text-white'>ADMIN PANEL</span>
                </MDBNavbarBrand>
                <MDBNavbarNav>
                    <div className="position-fixed mx-2">
                        <MDBNavbarItem>
                            <MDBNavbarLink href='/admin'>
                                <MDBIcon fas icon='tachometer-alt'/>
                                <span className='ms-2'>Statistic</span>
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                            <MDBNavbarLink href='/admin/category/all'>
                                <MDBIcon fas icon='palette'/>
                                <span className='ms-2'>Categories</span>
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                            <MDBNavbarLink href='#'>
                                <MDBIcon fas icon='font'/>
                                <span className='ms-2'>Recent Payments</span>
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                            <MDBNavbarLink href='#'>
                                <MDBIcon fas icon='font'/>
                                <span className='ms-2'>Recent Payments</span>
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                    </div>
                </MDBNavbarNav>
            </div>
            {sidebarOpen && <div className="overlay" onClick={toggleSidebar} style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(0,0,0,0.5)',
                zIndex: 1000,
                transition: 'opacity 0.3s ease-in-out',
                opacity: sidebarOpen ? 1 : 0,
            }}/>}
        </>
    );


    return (
        <div style={{
            transition: 'margin-left 0.3s ease-in-out',
            marginLeft: sidebarOpen ? '250px' : '0',
        }}>
            <MDBNavbar sticky bgColor='white' expand='lg'>
                <MDBContainer>
                    <Sidebar/>
                    <MDBBtn
                        color="danger"
                        onClick={toggleSidebar}
                        style={{
                            position: 'fixed',
                            top: '25px',
                            left: '40px',
                            zIndex: 1001
                        }}
                    >
                        <MDBIcon fas icon={sidebarOpen ? 'times' : 'bars'}/>
                    </MDBBtn>
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
                                <MDBBtn rounded pill aria-current='page' href='/product/add'
                                        className='mx-5 text-white btn-danger'>
                                    <MDBIcon fas icon="hand-holding-heart" className="me-2"/> Donate
                                </MDBBtn>
                            </MDBNavbarItem>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>
        </div>
    );
}