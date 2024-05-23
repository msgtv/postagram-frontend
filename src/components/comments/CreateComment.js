import React, { useState } from 'react';
import {
  Button,
  Form,
  Image
} from "react-bootstrap";
import axiosService from "../../helpers/axiosHelper";
import {
  getUser,
  getUserAvatar
} from "../../hooks/user.action";
import {
  useToaster,
  useSetToaster
} from "../../contexts/ToasterContext";

export default function CreateComment({ postId, refresh }) {
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({
    body: ""
  })
  const toasterData = useToaster();
  const setToasterData = useSetToaster();
  const user = getUser();

  function handleSubmit(e) {
    e.preventDefault();

    const createCommentForm = e.currentTarget;

    if (createCommentForm.checkValidity() === false) {
      e.stopPropagation();
    }
    setValidated(true);

    const data = {
      author: user.id,
      body: form.body,
      post: postId,
    };

    axiosService
      .post(`/post/${postId}/comment/`, data)
      .then(() => {
        setForm({
          ...form,
          body: ""
        })
      })
      .then(() => {
        setToasterData({
          ...toasterData,
          type: "success",
          message: "Comment posted successfully 🚀",
          show: true,
          title: "Comment!",
        });
      })
      .then(() => refresh())
      .catch(() => {
        setToasterData({
          type: "danger",
          message: "",
          show: true,
          title: "An error occurred!",
        });
      });
  }

  return (
    <Form
      className="d-flex flex-row justify-content-between"
      noValidate={true}
      validated={validated}
      onSubmit={handleSubmit}
      data-testid='create-comment-form'
    >
      <Image
        src={getUserAvatar()}
        roundedCircle={true}
        width={48}
        height={48}
        className="my-2"
      />
      <Form.Group className="m-3 w-75">
        <Form.Control
          className="py-2 rounded-pill border-primary"
          type="text"
          placeholder="Write a comment"
          value={form.body}
          name="body"
          onChange={e => setForm({
            ...form,
            body: e.target.value
          })}
          data-testid='comment-body-field'
        />
      </Form.Group>
      <div className="m-auto">
        <Button
          variant="primary"
          type="submit"
          disabled={form.body === undefined}
          size="small"
        >
          Leave
        </Button>
      </div>
    </Form>
  );
}