import { render, screen } from "../../../helpers/test-utils";
import userEvent from "@testing-library/user-event";
import CreatePost from "../CreatePost";
import { faker } from "@faker-js/faker";
import { fireEvent} from "@testing-library/react";
import { act } from "react-dom/test-utils";

test("Renders CreatePost component", async() => {
  const user = userEvent.setup();
  render(<CreatePost />);

  const showModalForm = screen.getByTestId("show-modal-form");
  expect(showModalForm).toBeInTheDocument();

  fireEvent.click(showModalForm);

  const createFormElement = screen.getByTestId("create-post-form");
  expect(createFormElement).toBeInTheDocument();

  const postBodyField = screen.getByTestId("post-body-field");
  expect(postBodyField).toBeInTheDocument();

  const submitButton = screen.getByTestId("create-post-submit");
  expect(submitButton).toBeInTheDocument();

  expect(submitButton.disabled).toBeTruthy();

  const postBody = faker.lorem.sentence(10);

  await act(async () => {
    await user.type(postBodyField, postBody);
  });

  // Checking if field has the text and button is not
  // disabled

  expect(submitButton.disabled).toBeFalsy();
});