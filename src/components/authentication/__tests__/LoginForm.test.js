import React from 'react';
import { render, screen } from "../../../helpers/test-utils";
import userEvent from '@testing-library/user-event';
import { act } from "react-dom/test-utils";
import userFixtures from "../../../helpers/fixtures/user";
import LoginForm from "../LoginForm";
import { faker } from "@faker-js/faker";

const userData = userFixtures();

test("renders Login form", async () => {
  render (<LoginForm />);

  const user = userEvent.setup();

  const loginForm = screen.getByTestId("login-form");
  expect(loginForm).toBeInTheDocument();

  const usernameField = screen.getByTestId("username-field");
  expect(usernameField).toBeInTheDocument();

  const passwordField = screen.getByTestId("password-field");
  expect(passwordField).toBeInTheDocument();
  //
  const password = faker.lorem.slug(2);

  // await act(async () => {
  //   await userEvent.type(usernameField, userData.username);
  //   await userEvent.type(passwordField, password);
  // });

  await act(async () => {
    await user.type(usernameField, userData.username);
    await user.type(passwordField, password);
  })

  expect(usernameField.value).toBe(userData.username);
  expect(passwordField.value).toBe(password);
});