import React from "react";
import {
  Navbar,
  Container,
  Image,
  NavDropdown,
  Nav,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import useUserActions, {getUserAvatar, getUser} from "../hooks/user.action";

export default function NavigationBar() {
  const userActions = useUserActions();
  const user = getUser();

  function handleLogout() {
    userActions.logout();
  }

  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand className="fw-bold" href="#home">
          Postagram
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <div className="d-flex align-items-center justify-content-center">
              <div className="text-white">
                {user.name}
              </div>
              <NavDropdown
                title={
                  <Image
                    src={getUserAvatar()}
                    roundedCircle={true}
                    width={36}
                    height={36}
                  />
                }
              >
                <NavDropdown.Item
                  as={Link}
                  to={`/profile/${user.id}/`}
                >
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}