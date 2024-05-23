import React, { useState } from 'react';
import { format } from 'timeago.js';
import {
  CommentOutlined,
} from "@ant-design/icons";
import {
  Image,
  Card,
  Dropdown,
} from "react-bootstrap";
import UpdatePost from "./UpdatePost";
import Toaster from "../Toaster";
import axiosService from "../../helpers/axiosHelper";
import { Link } from "react-router-dom";
import {
  getUser,
  getUserAvatar
} from "../../hooks/user.action";
import { MoreToggleIcon } from "../MoreToggleIcon";
import Like from "../Like";

export default function Post({ post, refresh, isSinglePost = false }) {
  const [showToast, setShowToast] = useState(false);
  const user = getUser();

  function handleDelete() {
    axiosService
      .delete(`/post/${post.id}/`)
      .then(
        () => { setShowToast(true); refresh(); }
      )
      .catch(err => console.error(err));
  }

  function handleLikeClick(action) {
    axiosService
      .post(`/post/${post.id}/${action}/`)
      .then(() => {
        refresh();
      })
      .catch(err => console.error(err));
  }

  return (
    <>
      <Card className="rounded-3 my-4" data-testid="post-test">
        <Card.Body>
          <Card.Title className="d-flex flex-row justify-content-between">
            <div className="d-flex flex-row">
              <Image
                // src={randomAvatar()}
                src={getUserAvatar(post.author)}
                roundedCircle={true}
                width={48}
                height={48}
                className="me-2 border border-primary border-2"
              />
              <div className="d-flex flex-column justify-content-start align-self-center mt-2">
                <p className="fs-6 m-0">{post.author.name}</p>
                <p className="fs-6 fw-lighter">
                  <small>{format(post.created)}</small>
                </p>
              </div>
            </div>
            {user.id === post.author.id && (
              <div>
                <Dropdown>
                  <Dropdown.Toggle as={MoreToggleIcon} />
                  <Dropdown.Menu>
                    <UpdatePost post={post} refresh={refresh} />
                    <Dropdown.Item
                      onClick={handleDelete}
                      className="text-danger"
                    >
                      Delete
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            )}
          </Card.Title>
          <Card.Text>{post.body}</Card.Text>
        </Card.Body>
        <Card.Footer className="d-flex bg-white w-50 justify-content-between border-0">
          <div className="">
            <Like
              isLiked={post.liked}
              onLike={() => {
                post.liked
                  ? handleLikeClick("remove_like")
                  : handleLikeClick("like");
              }}
            />
            <span className="ms-1 fs-6">
              <small>{post.likes_count}</small>
            </span>
          </div>
          {!isSinglePost && (
            <div className="d-flex flex-row">
              <Link
                to={`/post/${post.id}/`}
                style={{
                  textDecoration: "none",
                  color: "black"
                }}
              >
                <CommentOutlined
                  style={{
                    width: "24px",
                    height: "24px",
                    padding: "2px",
                    fontSize: "20px",
                    color: "#c4c4c4",
                    marginRight: "5px",
                  }}
                />
                <small>{post.comments_count} comments</small>
              </Link>
            </div>
          )}
        </Card.Footer>
      </Card>
      <Toaster
        title="Post"
        message="Post deleted"
        type="danger"
        showToast={showToast}
        onClose={() => setShowToast(false)}
      />
    </>
  );
}
