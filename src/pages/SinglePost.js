import React from "react";
import Layout from "../components/Layout";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../helpers/axiosHelper";
import Post from "../components/posts/Post";
import CreateComment from "../components/comments/CreateComment";
import Comment from "../components/comments/Comment";

export default function SinglePost() {
  let { postId } = useParams();

  const post = useSWR(`/post/${postId}`, fetcher);
  const comments = useSWR(
    `/post/${postId}/comment/`,
    fetcher,
    { refreshInterval: 10000 });

  return (
    <Layout hasNavigationBack={true}>
      {post.data ? (
        <Row className="justify-content-center">
          <Col sm={8}>
            <Post
              post={post.data}
              refresh={post.mutate}
              isSinglePost={true}
            />
            <CreateComment
              postId={post.data.id}
              refresh={comments.mutate}
            />
            {comments && (
              comments.data?.map(c => (
                <Comment
                  key={c.id}
                  refresh={comments.mutate}
                  comment={c}
                  postId={postId}
                />
              ))
            )}
          </Col>
        </Row>
      ) : (
        <div>Loading...</div>
      )}
    </Layout>
  );
}