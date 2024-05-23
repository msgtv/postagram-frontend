import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import useUserActions from "../../hooks/user.action";

export default function LoginForm() {
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({
    username: "",
    password: "",
  })
  const [error, setError] = useState(null);
  const userActions = useUserActions();

  function handleSubmit(e) {
    e.preventDefault();

    const loginForm = e.currentTarget;

    if (loginForm.checkValidity() === false) {
      e.stopPropagation();
    }

    setValidated(true);

    const data = {
      username: form.username,
      password: form.password,
    };

    userActions.login(data).catch(err => {
      if (err.message) setError(err.request.response);
    })
  }

  return (
    <Form
      id="login-form"
      className="border p-4 rounded"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
      data-testid="login-form"
    >
      <Form.Group className="mb-3" >
        <Form.Label>Username</Form.Label>
        <Form.Control
          data-testid="username-field"
          value={form.username}
          onChange={e => {setForm({
            ...form,
            username: e.target.value
          })}}
          required
          type="text"
          placeholder="Enter username"
        />
        <Form.Control.Feedback type="invalid">
          This field is required
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Password</Form.Label>
        <Form.Control
          data-testid="password-field"
          value={form.password}
          type="password"
          minLength="8"
          required
          onChange={e => {setForm({
            ...form,
            password: e.target.value
          })}}
          placeholder="Enter password"
        />
      </Form.Group>
      {error && <div className="text-content text-danger">
        <p>{error}</p>
      </div>}

      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
  );
}