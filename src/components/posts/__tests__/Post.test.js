import { render, screen } from "../../../helpers/test-utils";
import Post from "../Post";
import { setUserData } from "../../../hooks/user.action";
import userFixtures from "../../../helpers/fixtures/user";
import postFixtures from "../../../helpers/fixtures/post";

const userData = userFixtures();

const postData = postFixtures();

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

test("render Post component", () => {
  render(<Post post={postData} />);

  const postElement = screen.getByTestId("post-test");
  expect(postElement).toBeInTheDocument();
})