import React from "react";
import {
  Card,
  Button,
  Image
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getUserAvatar } from "../../hooks/user.action";

export default function ProfileCard({ user }) {
  const navigate = useNavigate();

  function handleNavigateToProfile() {
    navigate(`/profile/${user.id}/`);
  }

  return (
    <Card className="border-0 p-2" data-testid="profile-card">
      <div className="d-flex">
        <Image
          src={getUserAvatar(user)}
          roundedCircle={true}
          width={48}
          height={48}
          className="my-3 border border-primary border-2"
        />
        <Card.Body>
          <Card.Title
            className="fs-6"
            data-testid="profile-card-title"
          >
            {user.name}
          </Card.Title>
          <Button
            variant="primary"
            onClick={handleNavigateToProfile}
            size="sm"
          >
            See Profile
          </Button>
        </Card.Body>
      </div>
    </Card>
  );
}