
import React from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBListGroup,
  MDBListGroupItem,
  MDBCheckbox,
  MDBRange
} from 'mdb-react-ui-kit';

/**
 * FilterSidebar component represents a sidebar with filters for the product list.
 * @component
 * @param {Object} props
 * @param {function} props.onFilterChange - The function to handle filter changes
 * @param {string} props.margin - The margin of the sidebar
 * @returns {JSX.Element} The FilterSidebar component
 */
function FilterSidebar({ onFilterChange, margin }) {
  return (
    <MDBCard className={`h-auto shadow-5-strong ${margin}`}>
      <MDBCardBody>
        <MDBCardTitle className="text-center mb-4">Filters</MDBCardTitle>

        <h6 className="mb-3">Price Range</h6>
        <MDBRange
          defaultValue={100000}
          min={0}
          max={1000000}
          step={1000}
          id="priceRange"
          label="Price"
          onChange={(e) => onFilterChange('price', e.target.value)}
          className='danger-range'
        />

        <h6 className="mt-4 mb-3">Status</h6>
        <MDBListGroup flush="true">
          <MDBListGroupItem>
            <MDBCheckbox
              name='statusActive'
              id='statusActive'
              label='Active'
              onChange={(e) => onFilterChange('status', 'active', e.target.checked)}
            />
          </MDBListGroupItem>
          <MDBListGroupItem>
            <MDBCheckbox
              name='statusInactive'
              id='statusInactive'
              label='Ended'
              className="text-danger"
              onChange={(e) => onFilterChange('status', 'inactive', e.target.checked)}
            />
          </MDBListGroupItem>
        </MDBListGroup>

      </MDBCardBody>
    </MDBCard>
  );
}

export default FilterSidebar;