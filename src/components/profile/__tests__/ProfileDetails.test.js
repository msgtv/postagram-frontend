import { render, screen } from "../../../helpers/test-utils";
import userFixtures from "../../../helpers/fixtures/user";
import ProfileDetails from "../ProfileDetails";

const userData = userFixtures();

test("renders ProfileDetails component", () => {
  render(<ProfileDetails user={userData} />);

  const profileDetails = screen.getByTestId('profile-test');
  expect(profileDetails).toBeInTheDocument();

  const nameElement = screen.getByTestId('profile-name-test');
  expect(nameElement).toBeInTheDocument();

  const bioElement = screen.getByTestId('profile-bio-test');
  expect(bioElement).toBeInTheDocument();


});