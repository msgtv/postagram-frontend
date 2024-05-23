import React, { useState } from "react";
import {
  Button,
  Modal,
  Form,
  Dropdown
} from "react-bootstrap";
import axiosService from "../../helpers/axiosHelper";
import {
  getUser
} from "../../hooks/user.action";
import {useSetToaster, useToaster} from "../../contexts/ToasterContext";

export default function UpdatePost({ post, refresh }) {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({
    body: post.body,
    author: post.author.id });
  const user = getUser();

  const toasterData = useToaster();
  const setToasterData = useSetToaster();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleSubmit(e) {
    e.preventDefault();

    const postForm = e.currentTarget;

    if (postForm.checkValidity() === false) e.stopPropagation();

    setValidated(true);

    const data = {
      author: user.id,
      body: form.body,
    }

    axiosService
      .put(`/post/${post.id}/`, data)
      .then(() => {
        handleClose();
        // setForm({});

        setToasterData({
          ...toasterData,
          title: "Post!",
          message: "Post updated 🚀",
          type: "success",
          show: true,
        })
      })
      .then(() => {
        refresh();
      })
      .catch((err) => {
        console.error(err);
        setToasterData({
          ...toasterData,
          title: "Post!",
          message: "Something went wrong",
          type: "danger",
          show: true,
        })
      })
  }


  return (
    <>
      <Dropdown.Item
        onClick={handleShow}
        data-testid="show-modal-form"
      >
        Update
      </Dropdown.Item>

      <Modal show={show} onHide={handleClose}>
        <Form
          noValidate={true}
          validated={validated}
          onSubmit={handleSubmit}
        >
          <Modal.Header
            closeButton={true}
            className="border-0"
          >
            <Modal.Title>Update Post</Modal.Title>
          </Modal.Header>
          <Modal.Body className="border-0">
            <Form.Group className="mb-3">
              <Form.Control
                name="body"
                value={form.body}
                onChange={e => setForm({
                  ...form,
                  body: e.target.value
                })}
                as="textarea"
                rows={3}
                data-testid='post-body-field'
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              type="submit"
              disabled={!form.body?.length}
              data-testid='update-post-submit'
            >
              Post
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}