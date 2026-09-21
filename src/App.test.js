import { render, screen } from "@testing-library/react";
import App from "./App";
test("renders the interactive story", () => { render(<App />); expect(screen.getByText(/Where will you go next/i)).toBeInTheDocument(); expect(screen.getByRole("button", { name: /follow path 1/i })).toBeInTheDocument(); });
