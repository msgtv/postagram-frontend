import React, { useState } from "react";
import {
  Form,
  Button,
  Image
} from "react-bootstrap";
import useUserActions from "../../hooks/user.action";
import {
  useToaster,
  useSetToaster,
} from "../../contexts/ToasterContext";
import {useNavigate} from "react-router-dom";

export default function UpdateProfile({ user }) {
  const navigate = useNavigate();

  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    avatar: user.avatar,
    bio: user.bio,
  });
  const [error, setError] = useState(null);

  const userActions = useUserActions();

  const [avatar, setAvatar] = useState(null);

  const toasterData = useToaster();
  const setToasterData = useSetToaster();

  function handleSubmit(e) {
    e.preventDefault();

    const profileForm = e.currentTarget;
    if (profileForm.checkValidity() === false) {
      e.stopPropagation();
    }
    setValidated(true);

    const formData = new FormData();

    Object.keys(form).forEach(key => {
      if (
        form[key]
        && key !== 'avatar'
        && form[key] !== user[key]
      ) {
        formData.append(key, form[key]);
      }
    })
    if (avatar) {
      console.log(avatar);
      formData.append('avatar', avatar);
    }

    console.log(formData);

    userActions
      .edit(formData, user.id)
      .then(() => {
        setToasterData({
          ...toasterData,
          type: "success",
          message: "Profile updated successfully 🚀",
          show: true,
          title: "Profile updated",
        });
      })
      .then(() => {
        navigate(-1);
      })
      .catch(err => {
        if (err.message) {
          setError(err.request.response);
        }

        console.error(err);
      });
  }

  return (
    <Form
      id="update-profile-form"
      className="border p-4 rounded"
      noValidate={true}
      validated={validated}
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      data-testid='update-form-test'
    >
      <Form.Group className="mb-3 d-flex flex-column"
      >
        <Form.Label
          className="text-center"
        >
          Avatar
        </Form.Label>
        <Image
          src={form.avatar}
          roundedCircle={true}
          width={120}
          height={120}
          className="m-2 border border-primary border-2 align-self-center"
        />
        <Form.Control
          onChange={e => setAvatar(e.target.files[0])}
          className="w-50 align-self-center"
          type="file"
          size="sm"
        />
        <Form.Control.Feedback type="invalid">
          This file is required
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          value={form.first_name}
          required={true}
          type="text"
          placeholder="Enter first name"
          onChange={e => setForm({...form, first_name: e.target.value})}
          data-testid='firstName-field'
        />
        <Form.Control.Feedback type="invalid">
          This field is required
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          value={form.last_name}
          required={true}
          type="text"
          placeholder="Enter last name"
          onChange={e => setForm({...form, last_name: e.target.value})}
          data-testid='lastName-field'
        />
        <Form.Control.Feedback type="invalid">
          This field is required
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Bio</Form.Label>
        <Form.Control
          value={form.bio}
          onChange={e => setForm({...form, bio: e.target.value})}
          as="textarea"
          rows={3}
          placeholder="A simple bio (Optional)"
          data-testid='bio-field'
        />
      </Form.Group>

      {error && (
        <div className="text-content text-danger">
          <p>{error}</p>
        </div>
      )}

      <Button variant="primary" type="submit">
        Save changes
      </Button>
    </Form>
  );
}