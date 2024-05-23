import React, { useState } from "react";
import {
  Button,
  Modal,
  Form
} from "react-bootstrap";
import axiosService from "../../helpers/axiosHelper";
import {
  getUser
} from "../../hooks/user.action";
import {
  useToaster,
  useSetToaster
} from "../../contexts/ToasterContext";

export default function CreatePost({ refresh }) {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({});
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
      .post("/post/", data)
      .then(() => {
        handleClose();
        setForm({});

        setToasterData({
          ...toasterData,
          title: "Post!",
          message: "Post created 🚀",
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
      <Form.Group className="my-3 w-75">
        <Form.Control
          className="py-2 rounded-pill border-primary text-primary"
          type="text"
          placeholder="Write a post"
          onClick={handleShow}
          data-testid="show-modal-form"
        />
      </Form.Group>

      <Modal show={show} onHide={handleClose} data-testid="create-post-form">
        <Form
          noValidate={true}
          validated={validated}
          onSubmit={handleSubmit}
        >
          <Modal.Header
            closeButton={true}
            className="border-0"
          >
            <Modal.Title>Create Post</Modal.Title>
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
                data-testid="post-body-field"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              type="submit"
              disabled={!form.body?.length}
              data-testid="create-post-submit"
            >
              Post
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}