import { render, screen } from "../../../helpers/test-utils";
import userFixtures from "../../../helpers/fixtures/user";
import UpdateProfile from "../UpdateProfile";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { faker } from "@faker-js/faker";

const userData = userFixtures();

test('renders UpdateProfile', async () => {
  const user = userEvent.setup();

  render(<UpdateProfile user={userData} />);

  const updateForm = screen.getByTestId('update-form-test');
  expect(updateForm).toBeInTheDocument();

  const firstNameField = screen.getByTestId('firstName-field');
  expect(firstNameField).toBeInTheDocument();

  const lastNameField = screen.getByTestId('lastName-field');
  expect(lastNameField).toBeInTheDocument();

  const bioField = screen.getByTestId('bio-field');
  expect(bioField).toBeInTheDocument();

  const substring = faker.lorem.slug(4);

  await act(async () => {
    await user.type(firstNameField, substring);
    await user.type(lastNameField, substring);
    await user.type(bioField, substring);
  })

  expect(firstNameField.value).toBe(userData.first_name + substring);
  expect(lastNameField.value).toBe(userData.last_name + substring);
  expect(bioField.value).toBe(userData.bio + substring);
})