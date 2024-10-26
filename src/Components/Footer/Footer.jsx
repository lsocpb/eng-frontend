import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBBtn,
  MDBInput
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <MDBFooter className='text-center text-lg-start bg-white text-muted shadow-5-strong mt-4'>
      <section className='p-4 border-bottom'>
        <MDBContainer>
          <MDBRow className='d-flex justify-content-center align-items-center'>
            <MDBCol md="6" lg="5" className='mb-4 mb-lg-0 justify-content-center align-items-center'>
              <div className='mt-2 mt-lg-0 d-flex justify-content-center align-items-center'>
                <MDBBtn floating className='mx-1' color='danger' role='button'>
                  <MDBIcon fab icon='facebook-f' />
                </MDBBtn>
                <MDBBtn floating className='mx-1' color='danger' role='button'>
                  <MDBIcon fab icon='twitter' />
                </MDBBtn>
                <MDBBtn floating className='mx-1' color='danger' role='button'>
                  <MDBIcon fab icon='instagram' />
                </MDBBtn>
                <MDBBtn floating className='mx-1' color='danger' role='button'>
                  <MDBIcon fab icon='linkedin' />
                </MDBBtn>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <section className='py-5'>
        <MDBContainer>
          <MDBRow className="d-flex justify-content-center mx-5">
            <MDBCol lg="3" md="6" className='mb-4 mx-5 mb-lg-0'>
              <h5 className='text-danger mb-4'>
                <MDBIcon fas icon='heart' className='me-2' />
                CharFair
              </h5>
              <p>
                Join our mission to make a positive impact through charitable auctions. Every bid contributes to meaningful change in communities worldwide.
              </p>
            </MDBCol>

            <MDBCol lg="3" md="6" className='mb-4 mb-lg-0'>
              <h5 className='text-danger mb-4'>Quick Links</h5>
              <ul className='list-unstyled'>
                <li className='mb-2'>
                  <MDBIcon fas icon='angle-right' className='me-2'/>
                  <a href='#!' className='text-muted' onClick={() => handleNavigation('/about')}>
                    About Us
                  </a>
                </li>
                <li className='mb-2'>
                  <MDBIcon fas icon='angle-right' className='me-2'/>
                  <a href='/stories' className='text-muted' onClick={() => handleNavigation('/stories')}>
                    Success Stories
                  </a>
                </li>
                <li className='mb-2'>
                  <MDBIcon fas icon='angle-right' className='me-2'/>
                  <a href='#!' className='text-muted' onClick={() => handleNavigation('/faq')}>
                    FAQs
                  </a>
                </li>
              </ul>
            </MDBCol>

            <MDBCol lg="3" md="6" className='mb-4 mb-lg-0'>
              <h5 className='text-danger mb-4'>Contact</h5>
              <ul className='list-unstyled'>
                <li className='mb-3'>
                  <MDBIcon fas icon='home' className='me-2'/>
                  Wiejska 8, Bialystok, Poland
                </li>
                <li className='mb-3'>
                  <MDBIcon fas icon='envelope' className='me-2' />
                  charfair@gmail.com
                </li>
                <li className='mb-3'>
                  <MDBIcon fas icon='phone' className='me-2' />
                  + 01 234 567 88
                </li>
              </ul>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4 bg-light'>
        <span className='me-1'>© 2024 Copyright:</span>
        <a className='text-danger fw-bold' href='/'>
          CharFair
        </a>
        <span className='mx-2'>|</span>
        <a className='text-muted me-2' href='/privacy'>
          Privacy Policy
        </a>
        <a className='text-muted' href='/terms'>
          Terms of Service
        </a>
      </div>
    </MDBFooter>
  );
};

export default Footer;