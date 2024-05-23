import React from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import ProfileDetails from "../components/profile/ProfileDetails";
import useSWR from "swr";
import { fetcher } from "../helpers/axiosHelper";
import Post from "../components/posts/Post";
import { Row, Col } from "react-bootstrap";

export default function Profile() {
  const { userId } = useParams();
  const user = useSWR(`/user/${userId}/`, fetcher);

  const posts = useSWR(
    `/post/?author__public_id=${userId}`,
    fetcher,
    { refreshInterval: 20000 }
  );

  return (
    <Layout hasNavigationBack={true}>
      <Row className="justify-content-evenly">
        <Col sm={9}>
          <ProfileDetails user={user.data} />
          <div>
            <Row className="my-4">
              {posts.data && posts.data.map(post => (
                <Post key={post.id} post={post} refresh={posts.mutate} />
              ))}
            </Row>
          </div>
        </Col>
      </Row>
    </Layout>
  );
}