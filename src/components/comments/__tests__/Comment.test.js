import { render, screen } from "../../../helpers/test-utils";
import { v4 as uuid4 } from "uuid";
import commentFixtures from "../../../helpers/fixtures/comment";
import userFixtures from "../../../helpers/fixtures/user";
import { setUserData } from "../../../hooks/user.action";
import Comment from "../Comment";

const postId = uuid4();
const commentData = commentFixtures(
  true, false, undefined, postId);
const userData = userFixtures();

beforeEach(() => {
  // to fully reset the state between __tests__,
  // clear the storage
  localStorage.clear();

  // and reset all mocks
  jest.clearAllMocks();

  setUserData({
    user: userData,
    access: null,
    refresh: null,
  });
});

test("renders Comment component", () => {
  render(<Comment comment={commentData} postId={postId} />);

  const commentElement = screen.getByTestId('comment-test');
  expect(commentElement).toBeInTheDocument();
});