import {render, screen, fireEvent, waitFor} from "@testing-library/react";
import axios from "axios";
import {MemoryRouter} from "react-router-dom";
import AddProductForm from "../AddProductForm";
import {useUser} from "../../UserContext/UserContext";

jest.mock("axios");
jest.mock("../../ToastNotifications/ToastNotifications", () => ({
    showErrorToast: jest.fn(),
    showSuccessToast: jest.fn(),
}));
jest.mock("js-cookie", () => ({
    get: jest.fn().mockReturnValue("test-token"),
}));
jest.mock("../../UserContext/UserContext", () => ({
    useUser: jest.fn(),
}));

describe("AddProductForm Component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        useUser.mockReturnValue({user: {id: 1}});
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

    test("renders the form with required fields", () => {
        render(
            <MemoryRouter>
                <AddProductForm/>
            </MemoryRouter>
        );

        expect(screen.getByLabelText(/Item Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Item Description/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Category/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Auction Type/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Buy Now Price/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Auction Deadline/i)).toBeInTheDocument();
        expect(screen.getByText(/Start Auction/i)).toBeInTheDocument();
    });

    test("fetches and displays categories", async () => {
        const mockCategories = {
            categories: [
                {id: 1, name: "Home", description: "Home stuff", icon: "house-chimney-window"},
                {id: 2, name: "Pets", description: "Pets stuff", icon: "dog"},
            ],
        };
        axios.get.mockResolvedValueOnce({data: mockCategories});

        render(
            <MemoryRouter>
                <AddProductForm/>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText(/Home/i)).toBeInTheDocument();
            expect(screen.getByText(/Pets/i)).toBeInTheDocument();
        });
    });

    test("handles form input changes correctly", () => {
        render(
            <MemoryRouter>
                <AddProductForm/>
            </MemoryRouter>
        );

        const nameInput = screen.getByLabelText(/Item Name/i);
        const descriptionInput = screen.getByLabelText(/Item Description/i);

        fireEvent.change(nameInput, {target: {value: "Test Item"}});
        fireEvent.change(descriptionInput, {target: {value: "Test Description"}});

        expect(nameInput.value).toBe("Test Item");
        expect(descriptionInput.value).toBe("Test Description");
    });
});
