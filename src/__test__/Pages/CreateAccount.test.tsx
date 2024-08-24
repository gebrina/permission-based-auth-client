import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, test } from "vitest";
import { CreateAccount } from "../../pages/CreateAccount";

describe("Create Account Page Tests", () => {
  const { container } = render(
    <MemoryRouter>
      <CreateAccount />
    </MemoryRouter>
  );

  test("Create Account page must have a title", () => {
    const pageTitle = screen.getByRole("heading", { level: 1 });
    expect(pageTitle).toBeTruthy();
  });

  test("Create Account's form title should be Sign Up", () => {
    const title = screen.getByText(/sign up/i);
    expect(title).toBeTruthy();
  });

  test("Create account form must have 6 input fields", () => {
    const registerForm = container.querySelector("form");
    expect(registerForm).toBeTruthy();
    const inputFields = registerForm?.querySelectorAll("input");
    expect(inputFields).toHaveLength(6);
  });

  test("Username field must have empty value initially", () => {
    const usernameField: HTMLInputElement = screen.getByLabelText("Username");
    expect(usernameField).toBeTruthy();
    expect(usernameField.value).toBeFalsy();
  });

  test("First Nname field must have empty value initially", () => {
    const firstNameField: HTMLInputElement =
      screen.getByLabelText("First Name");
    expect(firstNameField).toBeTruthy();
    expect(firstNameField.value).toBeFalsy();
  });

  test("Last Name field must have empty value initially", () => {
    const lastNameField: HTMLInputElement = screen.getByLabelText("Last Name");
    expect(lastNameField).toBeTruthy();
    expect(lastNameField.value).toBeFalsy();
  });

  test("Email field must have empty value initially", () => {
    const emailField: HTMLInputElement = screen.getByLabelText(/email/i);
    expect(emailField).toBeTruthy();
    expect(emailField.value).toBeFalsy();
  });

  test("Occupation field must have empty value initially", () => {
    const occupationField: HTMLInputElement =
      screen.getByLabelText(/occupation/i);
    expect(occupationField).toBeTruthy();
    expect(occupationField.value).toBeFalsy();
  });

  test("Password field must have empty value initially", () => {
    const passwordField: HTMLInputElement = screen.getByLabelText(/password/i);
    expect(passwordField).toBeTruthy();
    expect(passwordField.value).toBeFalsy();
  });

  test("Creat Account form must have a submit button", () => {
    const submitButton = screen.getByRole("button", { name: "Sign up" });
    expect(submitButton).toBeTruthy();
  });
});
