import React from 'react';
import { Line } from "react-chartjs-2";
import { MDBCard, MDBCardBody } from 'mdb-react-ui-kit';

const LineChart = ({ data, options }) => {
  return (
    <MDBCard className="mb-4 mb-md-0" style={{backgroundColor: '#FBF4F5'}}>
      <MDBCardBody>
        <Line
          data={data}
          height={400}
          width={600}
          options={options}
        />
      </MDBCardBody>
    </MDBCard>
  );
};

export default LineChart;