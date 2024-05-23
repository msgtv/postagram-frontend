import { render, screen } from "../../../helpers/test-utils";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { v4 as uuid} from "uuid";
import CreateComment from "../CreateComment";
import {faker} from "@faker-js/faker";

test("render CreateComment component", async () => {
  const user = userEvent.setup();

  render(<CreateComment postId={uuid()} />);

  const createCommentForm = screen.getByTestId('create-comment-form');
  expect(createCommentForm).toBeInTheDocument();

  const commentBodyField = screen.getByTestId('comment-body-field');
  expect(commentBodyField).toBeInTheDocument();

  const commentBody = faker.lorem.sentence(10);
  await act(async () => {
    await user.type(commentBodyField, commentBody);
  });

  expect(commentBodyField.value).toBe(commentBody);
});