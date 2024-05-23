import React from 'react';
import { render, screen } from "../../../helpers/test-utils";
import userEvent from "@testing-library/user-event";
// import { act } from "react-dom/test-utils";
import { act } from "react-dom/test-utils";
import userFixtures from "../../../helpers/fixtures/user";
import { faker } from "@faker-js/faker";
import RegistrationForm from "../RegistrationForm";

const userData = userFixtures();

test("renders RegistrationForm component", async () => {
  render(<RegistrationForm />);

  const user = userEvent.setup();

  const registrationForm = screen.getByTestId("registration-form");
  expect(registrationForm).toBeInTheDocument();

  const avatarField = screen.getByTestId("avatar-field");
  expect(avatarField).toBeInTheDocument();

  const firstNameField = screen.getByTestId("firstName-field");
  expect(firstNameField).toBeInTheDocument();

  const lastNameField = screen.getByTestId("lastName-field");
  expect(lastNameField).toBeInTheDocument();

  const usernameField = screen.getByTestId("username-field");
  expect(usernameField).toBeInTheDocument();

  const emailField = screen.getByTestId("email-field");
  expect(emailField).toBeInTheDocument();

  const passwordField = screen.getByTestId("password-field");
  expect(passwordField).toBeInTheDocument();

  const bioField = screen.getByTestId("bio-field");
  expect(bioField).toBeInTheDocument();

  const submitButton = screen.getByTestId("submit-button");
  expect(submitButton).toBeInTheDocument();

  const password = faker.lorem.slug(2);
  const bio = faker.lorem.sentence(10);

  await act(async () => {
    await user.type(firstNameField, userData.first_name);
    await user.type(lastNameField, userData.last_name);
    await user.type(usernameField, userData.username);
    await user.type(emailField, userData.email);
    await user.type(passwordField, password);
    await user.type(bioField, bio);
  });

  expect(firstNameField.value).toBe(userData.first_name);
  expect(lastNameField.value).toBe(userData.last_name);
  expect(usernameField.value).toBe(userData.username);
  expect(emailField.value).toBe(userData.email);
  expect(passwordField.value).toBe(password);
  expect(bioField.value).toBe(bio);

})