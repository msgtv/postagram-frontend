import { render, screen } from "../../../helpers/test-utils";
import userEvent from "@testing-library/user-event";
import { faker } from "@faker-js/faker";
import { fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { v4 as uuid } from "uuid";
import commentFixtures from "../../../helpers/fixtures/comment";
import UpdateComment from "../UpdateComment";

const postId = uuid();
const commentData = commentFixtures();

test("render UpdateComment component", async () => {
  const user = userEvent.setup();
  render(<UpdateComment comment={commentData} postId={postId} />);

  const showModalForm = screen.getByTestId('show-modal-form');
  expect(showModalForm).toBeInTheDocument();

  fireEvent.click(showModalForm);

  const commentBodyField = screen.getByTestId('comment-body-field');
  expect(commentBodyField).toBeInTheDocument();

  const submitButton = screen.getByTestId('update-comment-submit');
  expect(submitButton).toBeInTheDocument();

  const commentBody = faker.lorem.sentence(30);

  await act(async () => {
    await user.type(commentBodyField, commentBody);
  });

  expect(commentBodyField.value).toBe(commentData.body + commentBody);
});