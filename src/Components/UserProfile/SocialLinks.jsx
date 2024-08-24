import {MDBCard, MDBCardBody, MDBCardText, MDBIcon, MDBListGroup, MDBListGroupItem} from "mdb-react-ui-kit";

/**
 * Component to display a list of social media links with icons in a card layout.
 *
 * @component
 * @example
 * return <SocialLinks />;
 *
 * @returns {JSX.Element} A card containing a list of social media links with associated icons.
 */
const SocialLinks = () => (
  <MDBCard className="mb-4 mb-lg-0">
    <MDBCardBody className="p-0">
      <MDBListGroup flush className="rounded-3">
        {[
          { icon: "website fa-lg", text: "https://allegro.pl" },
          { icon: "twitter fa-lg", text: "@allegro", color: '#55acee' },
          { icon: "instagram fa-lg", text: "allegro", color: '#ac2bac' },
          { icon: "facebook fa-lg", text: "Allegro", color: '#3b5998' }
        ].map((item, index) => (
          <MDBListGroupItem key={index} className="d-flex justify-content-between align-items-center p-3" style={{backgroundColor: '#FBF4F5'}}>
            <MDBIcon fab icon={item.icon} style={item.color ? {color: item.color} : {}} />
            <MDBCardText>{item.text}</MDBCardText>
          </MDBListGroupItem>
        ))}
      </MDBListGroup>
    </MDBCardBody>
  </MDBCard>
);

export default SocialLinks;