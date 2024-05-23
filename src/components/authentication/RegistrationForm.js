import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import useUserActions from "../../hooks/user.action";

function RegistrationForm() {
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({
    avatar: null,
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    bio: "",
  })
  const [error, setError] = useState(null);
  const userActions = useUserActions();

  function handleSubmit(e) {
    e.preventDefault();

    const registerForm = e.currentTarget;

    if (registerForm.checkValidity() === false) {
      e.stopPropagation();
    }

    setValidated(true);

    const formData = new FormData();

    // Добавляем данные формы
    formData.append('username', form.username);
    formData.append('password', form.password);
    formData.append('email', form.email);
    formData.append('first_name', form.first_name);
    formData.append('last_name', form.last_name);
    formData.append('bio', form.bio);

    // Добавляем файл аватара
    if (form.avatar) {
      formData.append('avatar', form.avatar);
    }

    userActions.register(formData).catch(err => {
      if (err.message) setError(err.request.response);
    })
  }

  return (
    <Form
      id="registration-form"
      className="border p-4 rounded"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      data-testid="registration-form"
    >
      <Form.Group
        className="mb-3"
      >
        <Form.Label>Avatar</Form.Label>
        <Form.Control
          onChange={e => setForm({
            ...form,
            avatar: e.target.files[0]
          })}

          required={false}
          type="file"
          placeholder="Upload Avatar"
          data-testid="avatar-field"
        />
        {form.avatar && <p>Вы выбрали: {form.avatar.name}</p>}
      </Form.Group>
      <Form.Group
        className="mb-3"
      >
        <Form.Label>First Name</Form.Label>
        <Form.Control
          value={form.first_name}
          onChange={e => setForm({
            ...form,
            first_name: e.target.value
          })}
          required
          type="text"
          placeholder="Enter first name"
          data-testid="firstName-field"
        />
        <Form.Control.Feedback type="invalid">
          This field is required
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group
        className="mb-3"
      >
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          value={form.last_name}
          onChange={e => setForm({
            ...form,
            last_name: e.target.value
          })}
          required
          type="text"
          placeholder="Enter last name"
          data-testid="lastName-field"
        />
        <Form.Control.Feedback type="invalid">
          This field is required
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group
        className="mb-3"
      >
        <Form.Label>Username</Form.Label>
        <Form.Control
          value={form.username}
          onChange={e => setForm({
            ...form,
            username: e.target.value
          })}
          required
          type="text"
          placeholder="Enter username"
          data-testid="username-field"
        />
        <Form.Control.Feedback type="invalid">
          This field is required
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group
        className="mb-3"
      >
        <Form.Label>Email address</Form.Label>
        <Form.Control
          value={form.email}
          onChange={e => setForm({
            ...form,
            email: e.target.value
          })}
          required
          type="email"
          placeholder="Enter email"
          data-testid="email-field"
        />
        <Form.Control.Feedback type="invalid">
          Please provide a valid email address.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group
        className="mb-3"
      >
        <Form.Label>Password</Form.Label>
        <Form.Control
          value={form.password}
          minLength={8}
          onChange={e => setForm({
            ...form,
            password: e.target.value
          })}
          required
          type="password"
          placeholder="Enter password"
          data-testid="password-field"
        />
        <Form.Control.Feedback type="invalid">
          Please provide a valid password
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Bio</Form.Label>
        <Form.Control
          value={form.bio}
          onChange={e => setForm({
            ...form,
            bio: e.target.value
          })}
          as="textarea"
          rows={3}
          placeholder="A simple bio (Optional)"
          data-testid="bio-field"
        />
      </Form.Group>
      {error
        && <div className="text-content text-danger">
          <p>{error}</p>
        </div>
      }
      <Button variant="primary" type="submit" data-testid='submit-button'>
        Submit
      </Button>
    </Form>
  );
}

export default RegistrationForm;