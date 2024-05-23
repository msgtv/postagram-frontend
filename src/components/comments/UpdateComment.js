import React, { useState } from "react";
import {
  Button,
  Modal,
  Form,
  Dropdown
} from "react-bootstrap";
import axiosService from "../../helpers/axiosHelper";
import {
  useToaster,
  useSetToaster
} from "../../contexts/ToasterContext";

export default function UpdateComment({
                                        postId,
                                        comment,
                                        refresh
}) {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({
    author: comment.author.id,
    body: comment.body,
    post: postId
  });
  // const [isUpdated, setIsUpdated] = useState(false);

  let isUpdated = false;

  const toasterData = useToaster();
  const setToasterData = useSetToaster();

  function handleShow() {
    setShow(!show);
  }

  function handleClose() {
    console.log(`handleClose isUpdated: ${isUpdated}`);

    if (!isUpdated) {
      setForm({
        ...form,
        body: comment.body
      })
      // setIsUpdated(false);
      isUpdated = false;
      setValidated(false);
    }

    setShow(false);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const updateForm = e.currentTarget;

    if (updateForm.checkValidity() === false) e.stopPropagation();

    setValidated(true);

    const data = {
      ...form
    }

    if (form.body === comment.body) {
      handleClose();
      return;
    }

    axiosService
      .put(`/post/${postId}/comment/${comment.id}/`, data)
      .then(() => {
        setToasterData({
          ...toasterData,
          title: "Comment!",
          message: `Comment ${comment.id} successfully updated`,
          type: "success",
          show: true,
        });
        // setIsUpdated(true);
        isUpdated = true;
        console.log(`axiosService isUpdated: ${isUpdated}`);
      })
      .then(() => refresh())
      .then(() => {
        handleClose();
      })
      .catch(err => {
        console.error(err);
        setToasterData({
          ...toasterData,
          title: "Error!",
          message: "An error occurred!",
          type: "danger",
          show: true,
        });
      })
  }

  return (
    <>
      <Dropdown.Item onClick={handleShow} data-testid="show-modal-form">
        Edit
      </Dropdown.Item>
      <Modal
        show={show}
        onHide={handleClose}
      >
        <Form
          noValidate={true}
          validated={validated}
          onSubmit={handleSubmit}
        >
          <Modal.Header
            closeButton={true}
            className="border-0"
          >
            Edit Comment
          </Modal.Header>
          <Modal.Body className="border-0">
            <Form.Group className="mb-3">
              <Form.Control
                name="body"
                value={form.body}
                onChange={e => setForm({
                  ...form,
                  [e.target.name]: e.target.value
                })}
                as="textarea"
                rows={3}
                data-testid="comment-body-field"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              type="submit"
              disabled={!form.body?.length}
              data-testid="update-comment-submit"
            >Send</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}