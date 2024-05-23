import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import Layout from "../components/Layout";
import UpdateProfile from "../components/profile/UpdateProfile";
import { fetcher } from "../helpers/axiosHelper";
import {
  Row,
  Col
} from "react-bootstrap";

export default function EditProfile() {
  const { userId } = useParams();
  const user = useSWR(
    `/user/${userId}/`,
    fetcher
  );

  return (
    <Layout hasNavigationBack={true}>
      {user.data ? (
        <Row className="justify-content-evenly">
          <Col sm={9}>
            <UpdateProfile user={user.data} />
          </Col>
        </Row>
      ) : (
        <p>Loading...</p>
      )}
    </Layout>
  );
}