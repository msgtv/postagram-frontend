import React from "react";
import {
  Toast,
  ToastContainer
} from 'react-bootstrap';

export default function Toaster(
  {
    showToast,
    title,
    message,
    onClose,
    type
  }
) {
  return (
    <ToastContainer position='top-center'>
      <Toast
        onClose={onClose}
        show={showToast}
        delay={3000}
        autohide={true}
        bg={type}
      >
        <Toast.Header>
          <strong className="me-auto">
            {title}
          </strong>
        </Toast.Header>
        <Toast.Body>
          <p className="text-white">
            {message}
          </p>
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
}