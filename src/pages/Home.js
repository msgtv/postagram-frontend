import React from "react";
import Layout from "../components/Layout";
import {
  Row,
  Col,
  Image
} from "react-bootstrap";
import useSWR from "swr";
import { fetcher } from "../helpers/axiosHelper";
import {
  getUserAvatar,
  getUser
} from "../hooks/user.action";
import CreatePost from "../components/posts/CreatePost";
import Post from "../components/posts/Post";
import ProfileCard from "../components/profile/ProfileCard";

function Home() {
  const user = getUser();
  const posts = useSWR(
    "/post/",
    fetcher,
    { refreshInterval: 10000 }
  )
  const profiles = useSWR(
    "/user/?limit=5",
    fetcher
  )

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <Row className="justify-content-evenly">
        <Col sm={7}>
          <Row
            className="border rounded align-items-center"
          >
            <Col className="flex-shrink-1">
              <Image
                src={getUserAvatar()}
                roundedCircle={true}
                width={52}
                height={52}
                className="my-2"
              />
            </Col>
            <Col
              sm={10}
              className="flex-grow-1"
            >
              <CreatePost refresh={posts.mutate} />
            </Col>
          </Row>
          <Row className="my-4">
            {
              posts.data?.map(post => (
                <Post
                  key={post.id}
                  post={post}
                  refresh={posts.mutate}
                />
              ))
            }
          </Row>
        </Col>
        <Col
          sm={3}
          className="border rounded py-4 h-50"
        >
          <h4 className="font-weight-bold text-center">
            Suggested people
          </h4>
          <div className="d-flex flex-column">
            {
              profiles.data
              && profiles.data.results.map(user => (
                <ProfileCard
                  key={user.id}
                  user={user}
                />
              ))
            }
          </div>
        </Col>
      </Row>
    </Layout>
  );
}

export default Home;