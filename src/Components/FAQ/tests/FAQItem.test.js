import { render, screen, fireEvent } from '@testing-library/react';
import FAQ from '../FAQ';
import FAQItem from '../FAQItem';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

describe('FAQItem Component', () => {
    test('renders FAQItem component with question and answer', () => {
        const question = "How does CharFair's auction platform work?";
        const answer = "CharFair connects charities with donors through an online auction system.";

        render(<FAQItem question={question} answer={answer} />);

        expect(screen.getByText(question)).toBeInTheDocument();
    });

    test('toggles answer visibility when question is clicked', () => {
        const question = "How does CharFair's auction platform work?";
        const answer = "CharFair connects charities with donors through an online auction system.";

        render(<FAQItem question={question} answer={answer} />);

        const questionElement = screen.getByText(question);
        fireEvent.click(questionElement);

        // Check if the answer is rendered after clicking the question
        expect(screen.getByText(answer)).toBeInTheDocument();
    });
});