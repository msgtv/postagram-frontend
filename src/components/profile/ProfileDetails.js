import React from "react";
import {
  Button,
  Image
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../hooks/user.action";

export default function ProfileDetails({ user }) {
  const navigate = useNavigate();
  const sessionUser = getUser();

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <div className="d-flex flex-row border-bottom p-5" data-testid='profile-test'>
        <Image
          src={user.avatar}
          roundedCircle={true}
          width={120}
          height={120}
          className="me-5 border border-primary border-2"
        />
        <div className="d-flex flex-column justify-content-start align-self-center mt-2">
          <p className="fs-4 m-0" data-testid='profile-name-test'>{user.name}</p>
          <p className="fs-6 m-0">{user.email}</p>
          <p className="fs-5" data-testid='profile-bio-test'>{
            user.bio ? user.bio : "(No bio.)"
          }</p>
          {sessionUser
            && sessionUser.id === user.id
            && (
              <Button
                variant="primary"
                size="sm"
                className="w-25"
                onClick={() => navigate(`/profile/${user.id}/edit/`)}
              >
                Edit
              </Button>
            )}
        </div>
      </div>
    </div>
  );
}