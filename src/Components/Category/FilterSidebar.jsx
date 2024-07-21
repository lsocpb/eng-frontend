
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

function FilterSidebar({ onFilterChange }) {
  return (
    <MDBCard className="h-auto shadow-5-strong">
      <MDBCardBody>
        <MDBCardTitle className="text-center mb-4">Filters</MDBCardTitle>

        <h6 className="mb-3">Price Range</h6>
        <MDBRange
          defaultValue={5000}
          min={0}
          max={10000}
          step={10}
          id="priceRange"
          label="Price"
          onChange={(e) => onFilterChange('price', e.target.value)}
          className='danger-range'
        />

        <h6 className="mt-4 mb-3">Status</h6>
        <MDBListGroup flush>
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
              label='Inactive'
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