import { render, screen } from '@testing-library/react';
import StatCard from '../StatCard';

const mockChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Dataset 1',
      data: [10, 20, 30, 40, 50, 60],
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderWidth: 1,
    },
  ],
};

describe('StatCard Component', () => {
  it('renders the stat card with title, value, and positive change', () => {
    render(
      <StatCard
        title="Revenue"
        value="$10,000"
        change={5}
        icon="dollar-sign"
        color="green"
        chartData={mockChartData}
      />
    );

    expect(screen.getByText('Revenue')).toBeInTheDocument();
    expect(screen.getByText('$10,000')).toBeInTheDocument();
    expect(screen.getByText('5%')).toBeInTheDocument();
  });

  it('renders the stat card with title, value, and negative change', () => {
    render(
      <StatCard
        title="Expenses"
        value="$5,000"
        change={-3}
        icon="arrow-down"
        color="red"
        chartData={mockChartData}
      />
    );

    expect(screen.getByText('Expenses')).toBeInTheDocument();
    expect(screen.getByText('$5,000')).toBeInTheDocument();
    expect(screen.getByText('3%')).toBeInTheDocument();
  });

  it('renders the chart with the correct data', () => {
    render(
      <StatCard
        title="Users"
        value="1,000"
        change={10}
        icon="user"
        color="blue"
        chartData={mockChartData}
      />
    );

    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('1,000')).toBeInTheDocument();
    expect(screen.getByText('10%')).toBeInTheDocument();
  });

  it('renders the stat card with zero change', () => {
    render(
      <StatCard
        title="Profit"
        value="$2,000"
        change={0}
        icon="chart-line"
        color="purple"
        chartData={mockChartData}
      />
    );

    expect(screen.getByText('Profit')).toBeInTheDocument();
    expect(screen.getByText('$2,000')).toBeInTheDocument();
    expect(screen.getByText('0%')).toBeInTheDocument();
  });
});