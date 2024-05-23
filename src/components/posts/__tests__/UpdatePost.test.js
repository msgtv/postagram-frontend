import { render, screen } from "../../../helpers/test-utils";
import userEvent from "@testing-library/user-event";
import UpdatePost from "../UpdatePost";
import userFixtures from "../../../helpers/fixtures/user";
import postFixtures from "../../../helpers/fixtures/post";
import { faker } from "@faker-js/faker";
import { fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";

const userData = userFixtures();
const postData = postFixtures(true, false, userData);

test("Render UpdatePost component", async () => {
  const user = userEvent.setup();
  render(<UpdatePost post={postData} />);

  const showModalForm = screen.getByTestId('show-modal-form');
  expect(showModalForm).toBeInTheDocument();

  fireEvent.click(showModalForm);

  const postBodyField = screen.getByTestId('post-body-field');
  expect(postBodyField).toBeInTheDocument();

  const submitButton = screen.getByTestId('update-post-submit');
  expect(submitButton).toBeInTheDocument();

  const postBody = faker.lorem.sentence(10);

  await act(async () => {
    await user.type(postBodyField, postBody);
  });

  // Checking if field has the text and button is not disabled
  expect(postBodyField.value).toBe(postData.body + postBody);
  expect(submitButton.disabled).toBeFalsy();
});