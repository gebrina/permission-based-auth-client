import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Login } from "../../pages/Login";

describe("Test Login Page", () => {
  render(<Login />);

  test("Sign in form must have a title", () => {
    const formTitle = screen.getByRole("heading", { level: 2 });
    expect(formTitle).toBeTruthy();
  });

  test("Sign in form's title shoud be Sign In", () => {
    const expectedTitle = "Sign In";
    const formTitle = screen.getByRole("heading", { level: 2 });
    expect(formTitle.textContent).toBe(expectedTitle);
  });

  test("Sign form shoud have two input fields", () => {
    const form = screen.getByRole("form");
    const formInputs = form.querySelectorAll("input");
    expect(formInputs).toHaveLength(2);
  });

  test("Initailly email field must be empty", () => {
    const emailFeild: HTMLInputElement = screen.getByRole("textbox", {
      name: "Email",
    });
    expect(emailFeild.value).toBeFalsy();
  });

  test("Email field must take value when user types on it", () => {
    const typedEmail = "test@gmail.com";

    const emailField: HTMLInputElement = screen.getByRole("textbox", {
      name: "Email",
    });

    expect(emailField).toBeTruthy();

    fireEvent.change(emailField, { target: { value: typedEmail } });
    expect(emailField.value).toBe(typedEmail);
  });
});
