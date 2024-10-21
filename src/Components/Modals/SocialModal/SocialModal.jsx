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
    >
      <div className="modal-content" style={{
        background: "linear-gradient(to bottom right, #ffffff, #fff5f7)",
        borderRadius: "15px",
        border: "none",
        boxShadow: "0 0 30px rgba(0,0,0,0.1)"
      }}>
        <MDBModalHeader className="border-bottom-0 pb-0">
          <h5 className="modal-title d-flex align-items-center" style={{
            background: "linear-gradient(45deg, #ff4081, #ff1744)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: "bold"
          }}>
            <MDBIcon fas icon="share-alt" className="me-2 text-center" />
            You're awesome! Share this with your friends!
          </h5>
          <MDBBtn 
            floating
            color="danger"
            tag="button"
            onClick={toggle}
            className="btn btn-close btn-danger"
            />
        </MDBModalHeader>

        <MDBModalBody className="pt-4">
          <MDBContainer className="px-4">
            <div className="d-flex flex-column gap-3 justify-content-center align-items-center">
              {socialButtons.map(({ Button, icon, gradient, label, props }) => (
                <Button {...props} key={label} className="w-50">
                    <MDBBtn 
                      style={{
                        background: gradient,
                      }}
                      className="w-100 d-flex align-items-center justify-content-center py-3 shadow-sm hover-shadow"
                    >
                      <MDBIcon
                        fab
                        icon={icon} 
                        size="lg"
                        className="me-3" 
                      />
                      Share on {label}
                    </MDBBtn>
                </Button>
              ))}
            </div>

            <div className="mt-4 pt-3 border-top border-light">
              <p className="text-muted mb-2 small fw-bold">Or copy link</p>
              <div className="input-group shadow-sm">
                <input 
                  type="text" 
                  value={url} 
                  className="form-control bg-light border-0" 
                  readOnly
                  style={{ padding: "0.8rem" }}
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
                  >
                    <MDBIcon far icon="copy" />
                  </MDBBtn>
                </MDBTooltip>
              </div>
            </div>
          </MDBContainer>
        </MDBModalBody>

        <MDBModalFooter className="border-top-0 justify-content-center">
          <small className="text-muted" style={{ 
            fontWeight: "500",
            background: "linear-gradient(45deg, #ff4081, #ff1744)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            Thanks for sharing! 💖
          </small>
        </MDBModalFooter>
      </div>
    </MDBModal>
  );
};

export default SocialModal;