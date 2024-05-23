import React from "react";
import { format } from "timeago.js";
import {
  Image,
  Card,
  Dropdown,
} from "react-bootstrap";
import axiosService from "../../helpers/axiosHelper";
import { getUser, getUserAvatar } from "../../hooks/user.action";
import {MoreToggleIcon} from "../MoreToggleIcon";
import {
  useToaster,
  useSetToaster
} from "../../contexts/ToasterContext";
import UpdateComment from "./UpdateComment";
import Like from "../Like";

export default function Comment({ postId, comment, refresh }) {
  const toasterData = useToaster();
  const setToasterData = useSetToaster();

  const user = getUser();

  function handleDelete() {
    // comment deletion
    axiosService
      .delete(`/post/${postId}/comment/${comment.id}/`)
      .then(() => {
        setToasterData({
          ...toasterData,
          title: "Comment!",
          message: "Comment deleted successfully",
          type: "success",
          show: true,
        })
      })
      .then(
        () => refresh()
      )
      .catch(err => {
        console.error(err);
        setToasterData({
          ...toasterData,
          title: "Comment!",
          message: "An error occurred!",
          type: "danger",
          show: true,
        })
      })
  }

  function handleLikeClick(action) {
    axiosService
      .post(`/post/${postId}/comment/${comment.id}/${action}/`)
      .then(() => {
        refresh();
      })
      .catch(err => console.error(err));
  }

  return (
    <Card className="rounded-3 my-2" data-testid='comment-test'>
      <Card.Body>
        <Card.Title className="d-flex flex-row justify-content-between">
          <div className="d-flex flex-row">
            <Image
              src={getUserAvatar(comment.author)}
              roundedCircle={true}
              width={48}
              height={48}
              className="me-2 border border-primary border-2"
            />
            <div className="d-flex flex-column justify-content-start align-self-center mt-2">
              <p className="fs-6 m-0">
                {comment.author.name}
              </p>
              <p className="fs-6 fw-lighter">
                <small>{format(comment.created)}</small>
              </p>
            </div>
          </div>
          {user.id === comment.author.id && (
            <div>
              <Dropdown>
                <Dropdown.Toggle
                  as={MoreToggleIcon}
                ></Dropdown.Toggle>
                <Dropdown.Menu>
                  <UpdateComment
                    postId={postId}
                    comment={comment}
                    refresh={refresh}
                  />
                  <Dropdown.Item
                    onClick={handleDelete}
                    className="text-danger"
                  >Delete</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          )}
        </Card.Title>
        <Card.Text>
          {comment.body}
        </Card.Text>
        <div className="d-flex flex-row align-items-center">
          <Like
            isLiked={comment.liked}
            onLike={() => {
              comment.liked
                ? handleLikeClick('remove_like')
                : handleLikeClick('like');
            }}
          />
          {/*<p className="ms-1 fs-6">*/}
            <small>{comment.likes_count} like</small>
          {/*</p>*/}
        </div>
      </Card.Body>
    </Card>
  );
}
