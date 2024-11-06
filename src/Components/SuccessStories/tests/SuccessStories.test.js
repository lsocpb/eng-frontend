import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SuccessStories from '../SuccessStories';

const mockStories = [
  {
    id: 1,
    category: 'education',
    title: "School Building Project in Ghana",
    description: "Through our auction platform, we raised $15,000 to build a new school in Ghana, providing education access to over 300 children.",
    impact: "300+ students access to education",
    raised: "$150,000",
    image: "https://assets.globalpartnership.org/s3fs-public/styles/hero_stories/public/2023-06/ghana-classroom.jpg?VersionId=VsSO5BcsPqTlkZAMbnZ3h18Cih0z570l&itok=dVjT-KgU",
    partner: "Education For All Foundation"
  },
  {
    id: 2,
    category: 'healthcare',
    title: "Medical Equipment for Rural Clinic",
    description: "A successful campaign that provided essential medical equipment to a rural clinic in India, serving thousands of patients annually.",
    impact: "5,000+ patients served annually",
    raised: "$75,000",
    image: "https://www.nyadire.org/uploads/4/7/6/4/4764398/3527803_orig.jpeg",
    partner: "Global Health Initiative"
  }
];

describe('SuccessStories Component', () => {
  it('renders the list of stories correctly', async () => {
    render(<SuccessStories stories={mockStories} />, { wrapper: MemoryRouter });

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /Success Stories/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /Ready to Make a Difference\?/i })).toBeInTheDocument();
    });

    expect(screen.getByRole('button', { name: /Start Your Own Success Story/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /All Stories/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Education/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Healthcare/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Environment/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Humanitarian/i })).toBeInTheDocument();
  });
  
});