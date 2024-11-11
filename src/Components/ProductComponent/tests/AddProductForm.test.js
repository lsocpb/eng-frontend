import { render, screen } from "@testing-library/react";
import AddProductForm from "../AddProductForm";
import { MemoryRouter } from "react-router-dom";

describe("AddProductForm", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: jest.fn().mockImplementation(query => ({
                matches: false,
                media: query,
                onchange: null,
                addListener: jest.fn(),
                removeListener: jest.fn(),
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                dispatchEvent: jest.fn(),
            })),
        });
    });

    it("should render the form elements", () => {
        render(<AddProductForm />, { wrapper: MemoryRouter });

        expect(screen.getByLabelText(/Item Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Item Description/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Category/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Auction Type/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Buy Now Price/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Auction Deadline/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Item Images/i)).toBeInTheDocument();
    });
});
