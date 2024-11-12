import React, { useState } from 'react';
import {
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBBtn,
  MDBIcon,
  MDBContainer,
  MDBTooltip,
  MDBRipple
} from "mdb-react-ui-kit";
import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from "react-share";

const SocialModal = ({ url, isOpen, toggle, title, hashtag, source }) => {
  const [copiedTooltip, setCopiedTooltip] = useState("Copy to clipboard");

  const socialButtons = [
    {
      Button: FacebookShareButton,
      icon: "facebook",
      gradient: "linear-gradient(40deg, #45cafc, #303f9f)",
      label: "Facebook",
      props: { url, hashtag }
    },
    {
      Button: TwitterShareButton,
      icon: "twitter",
      gradient: "linear-gradient(40deg, #2096ff, #05ffa3)",
      label: "Twitter",
      props: { url, title, hashtag }
    },
    {
      Button: WhatsappShareButton,
      icon: "whatsapp",
      gradient: "linear-gradient(40deg, #00b09b, #96c93d)",
      label: "WhatsApp",
      props: { url, title, separator: ":: " }
    },
    {
      Button: LinkedinShareButton,
      icon: "linkedin",
      gradient: "linear-gradient(40deg, #0077b5, #00a0dc)",
      label: "LinkedIn",
      props: { url, title, source }
    }
  ];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopiedTooltip("Copied!");
    setTimeout(() => setCopiedTooltip("Copy to clipboard"), 2000);
  };

  return (
    <MDBModal 
      open={isOpen} 
      tabIndex="-1" 
      className="fade" 
      staticBackdrop
      animation="slide-in-up"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className="modal-content" style={{
        background: "linear-gradient(to bottom right, #ffffff, #fff5f7)",
        borderRadius: "15px",
        border: "none",
        boxShadow: "0 0 30px rgba(0,0,0,0.1)",
        width: '90%',
        maxWidth: '400px',
        margin: 'auto'
      }}>
        <MDBModalHeader className="border-bottom-0 pb-0">
          <h5 className="modal-title d-flex align-items-center" style={{
            background: "linear-gradient(45deg, #ff4081, #ff1744)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: "bold",
            fontSize: '1rem'
          }}>
            <MDBIcon fas icon="share-alt" className="me-2 text-center" />
            Share with your friends!
          </h5>
          <MDBBtn
            floating
            color="danger"
            tag="button"
            onClick={toggle}
            className="btn btn-close btn-danger"
          />
        </MDBModalHeader>

        <MDBModalBody className="pt-3">
          <MDBContainer className="px-3">
            <div className="d-flex flex-column gap-2 justify-content-center align-items-center">
              {socialButtons.map(({ Button, icon, gradient, label, props }) => (
                <Button {...props} key={label} className="w-100">
                    <MDBBtn
                      style={{
                        background: gradient,
                      }}
                      className="w-100 d-flex align-items-center justify-content-center py-2"
                      size="sm"
                    >
                      <MDBIcon
                        fab
                        icon={icon}
                        size="lg"
                        className="me-2"
                      />
                      Share on {label}
                    </MDBBtn>
                </Button>
              ))}
            </div>

            <div className="mt-3 pt-2 border-top border-light">
              <p className="text-muted mb-2 small fw-bold">Or copy link</p>
              <div className="input-group shadow-sm">
                <input
                  type="text"
                  value={url}
                  className="form-control bg-light border-0"
                  readOnly
                  style={{ padding: "0.5rem" }}
                />
                <MDBTooltip
                  tag="span"
                  title={copiedTooltip}
                  placement="top"
                >
                  <MDBBtn
                    style={{
                      background: "linear-gradient(45deg, #ff4081, #ff1744)",
                      transition: "all 0.3s ease"
                    }}
                    onClick={handleCopy}
                    className="px-3"
                    size="sm"
                  >
                    <MDBIcon far icon="copy" />
                  </MDBBtn>
                </MDBTooltip>
              </div>
            </div>
          </MDBContainer>
        </MDBModalBody>

        <MDBModalFooter className="border-top-0 justify-content-center py-2">
          <small className="text-muted" style={{
            fontWeight: "500",
            background: "linear-gradient(45deg, #ff4081, #ff1744)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: '0.8rem'
          }}>
            Thanks for sharing! 💖
          </small>
        </MDBModalFooter>
      </div>
    </MDBModal>
  );
};

export default SocialModal;