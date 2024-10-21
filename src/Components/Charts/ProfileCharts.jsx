import React from 'react';
import { MDBCol, MDBRow } from 'mdb-react-ui-kit';
import BarChart from './BarChart';
import LineChart from './LineChart';

/**
 * Charts component to display sales and bids charts.
 * @component
 * @returns {JSX.Element} The Charts component
 */
const Charts = () => {
  const commonOptions = {
    maintainAspectRatio: false,
    scales: {
      x: { grid: { display: false } },
      y: {
        ticks: { precision: 0, font: { size: 14 } },
        grid: { color: 'rgba(0, 0, 0, 0.1)' },
      },
    },
    plugins: {
      legend: { labels: { font: { size: 16 } } },
      title: { display: true, font: { size: 20 } },
    },
  };

  //TODO API call to get data
  const barChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
      label: 'Sales',
      data: [12, 19, 3, 5, 2, 3, 10],
      backgroundColor: '#EC5B62',
      borderColor: '#C94A51',
      borderWidth: 2,
      hoverBackgroundColor: '#C94A51',
    }],
  };

  //TODO API call to get data
  const lineChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
      label: 'Bids',
      data: [12, 19, 3, 5, 2, 3, 10],
      fill: true,
      borderColor: '#C94A51',
      tension: 0.3,
      borderWidth: 3,
      pointRadius: 5,
      pointBackgroundColor: '#C94A51',
      pointBorderColor: '#C94A51',
      pointHoverRadius: 7,
    }],
  };

  return (
    <MDBRow>
      <MDBCol md="6">
        <BarChart
          data={barChartData}
          options={{
            ...commonOptions,
            plugins: {
              ...commonOptions.plugins,
              title: { ...commonOptions.plugins.title, text: 'Last 6 months sales' },
            },
          }}
        />
      </MDBCol>
      <MDBCol md="6">
        <LineChart
          data={lineChartData}
          options={{
            ...commonOptions,
            plugins: {
              ...commonOptions.plugins,
              title: { ...commonOptions.plugins.title, text: 'Last 6 months bids' },
            },
          }}
        />
      </MDBCol>
    </MDBRow>
  );
};

export default Charts;