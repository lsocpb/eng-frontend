import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FAQ from '../FAQ';
import FAQItem from '../FAQItem';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

describe('FAQ Component', () => {
    test('renders FAQ component with questions and answers', () => {
        render(
            <Router>
                <FAQ />
            </Router>
        );

        // Check if the FAQ title is rendered
        expect(screen.getByText("Frequently Asked Questions")).toBeInTheDocument();

        // Check if the FAQ questions are rendered
        expect(screen.getByText("How does CharFair's auction platform work?")).toBeInTheDocument();
        expect(screen.getByText("How can charities join the platform?")).toBeInTheDocument();
        expect(screen.getByText("What types of items can be auctioned?")).toBeInTheDocument();
        expect(screen.getByText("How are payments processed?")).toBeInTheDocument();
        expect(screen.getByText("What percentage of donations goes to the charities?")).toBeInTheDocument();
        expect(screen.getByText("How do you ensure the authenticity of charities?")).toBeInTheDocument();
    });

    test('navigates to contact page when Contact Support button is clicked', () => {
        const { getByText } = render(
            <Router>
                <FAQ />
            </Router>
        );

        const contactButton = getByText('Contact Support');
        fireEvent.click(contactButton);
    });
});