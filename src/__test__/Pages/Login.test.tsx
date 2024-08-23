import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Login } from "../../pages/Login";

describe("Test Login Page", () => {
  test("Should render the Login Page", () => {
    render(<Login />);
    const loginText = screen.getByText(/Login/);
    expect(loginText).toBeTruthy();
  });
});
