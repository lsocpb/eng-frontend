import React, { useState } from 'react';
import {
  MDBNavbarItem,
  MDBNavbarLink,
  MDBIcon,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBBtn,
} from 'mdb-react-ui-kit';
import "./Wallet.css";

const WalletDropdown = ({ balance = 1250.00 }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MDBNavbarItem>
      <MDBDropdown>
        <MDBDropdownToggle 
          tag='a' 
          className='nav-link text-dark no-caret' 
          onClick={() => setIsOpen(!isOpen)}
        >
          <MDBIcon fas icon="wallet" size="lg" className="me-2 mx-2"/>
        </MDBDropdownToggle>
        
        <MDBDropdownMenu className="p-4 shadow-lg" style={{ minWidth: '300px' }}>
          <div className="text-center mb-4">
            <MDBIcon 
              fas 
              icon="wallet" 
              size="3x"
              style={{ color: "#FFC0CB" }}
              className="mb-3"
            />
            <h4 className="mb-2">Your Balance</h4>
            <h2 className="text-muted mb-3">${balance.toFixed(2)}</h2>
          </div>

          <div className="d-grid gap-2">
            <MDBBtn 
              color="danger" 
              className="mb-2"
              href="/wallet/add-funds"
            >
              <MDBIcon fas icon="plus-circle" className="me-2"/>
              Add Funds
            </MDBBtn>
            
            <MDBBtn 
              className="btn btn-outline-danger"
              outline
              href="/wallet/history"
            >
              <MDBIcon fas icon="history" className="me-2"/>
              Transaction History
            </MDBBtn>
          </div>

          <hr className="my-4"/>

          <div className="text-center">
            <small className="text-muted">
              Need help? <a href="/contact">Contact Support</a>
            </small>
          </div>
        </MDBDropdownMenu>
      </MDBDropdown>
    </MDBNavbarItem>
  );
};

export default WalletDropdown;