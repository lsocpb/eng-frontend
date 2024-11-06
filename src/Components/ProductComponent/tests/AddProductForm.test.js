import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import AddProductForm from "../AddProductForm";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router } from "react-router-dom";
import Cookies from "js-cookie";

jest.mock("axios");
jest.mock("js-cookie");

describe("AddProductForm", () => {
  beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: true,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(), // Modern
      removeEventListener: jest.fn() // Modern
    }))
  });
});
  beforeEach(() => {
    Cookies.get.mockReturnValue("1-abc123");
  });

  it("renders the form correctly", () => {
    render(
      <Router>
        <AddProductForm />
      </Router>
    );
    expect(screen.getByText("Place an item for the charities!")).toBeInTheDocument();
  });
});