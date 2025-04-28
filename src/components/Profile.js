// Profile.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
import styles from "../styles/Common.module.css";
import clsx from "clsx";

// Profile functional component
const Profile = () => {
  // State to hold user information
  const [user, setUser] = useState({
    name: "",
    email: "",
    attachment: "",
  });

  // State to hold additional user data
  const [userData, setUserData] = useState([]);

  // Effect to fetch user profile data on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Fetching user profile
        const response = await axios.get("/api/profile");
        setUser(response.data);

        // Fetching additional user data to display in a table
        const userResponse = await axios.get("/api/user_data");
        setUserData(userResponse.data);
      } catch (error) {
        // Log error if fetching fails
        console.error("Error fetching user profile:", error);
      }
    };
    fetchUserProfile();
  }, []); // Empty dependency array to run once on mount

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    // Append user data to FormData
    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("attachment", user.attachment);

    try {
      // Sending PUT request to update profile
      await axios.put("/api/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Required for file uploads
        },
      });
      console.log("Profile updated successfully");
    } catch (error) {
      // Log error if updating fails
      console.error("Error updating profile:", error);
    }
  };

  // Function to handle changes in the file input
  const handleAttachmentChange = (e) => {
    const file = e.target.files[0];
    setUser((prevUser) => ({ ...prevUser, attachment: file }));
  };

  return (
    <Container
      className={clsx(
        styles.container,
        "d-flex",
        "flex-column",
        "justify-content-center",
        "align-items-center",
        "mt-5 mt-md-3"
      )}
    >
      <Row>
        <Col className="shadow-lg">
          <h1 className="text-center mb-4">Profile</h1>
          <Form onSubmit={handleProfileUpdate}>
            {/* Form group for name */}
            <Form.Group controlId="formBasicName">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                value={user.name}
                onChange={(e) =>
                  setUser((prevUser) => ({ ...prevUser, name: e.target.value }))
                }
                className="mb-3"
              />
            </Form.Group>

            {/* Form group for email */}
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                value={user.email}
                onChange={(e) =>
                  setUser((prevUser) => ({
                    ...prevUser,
                    email: e.target.value,
                  }))
                }
                className="mb-3"
              />
            </Form.Group>

            {/* Form group for file attachment */}
            <Form.Group controlId="formBasicAttachment">
              <Form.Label>Attachment:</Form.Label>
              <Form.Control
                type="file"
                onChange={handleAttachmentChange}
                className="mb-3"
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Update Profile
            </Button>
          </Form>

          {/* Table to display user data */}
          <h2 className="mt-4">User Data</h2>
          <Table striped bordered hover className="mt-3">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Other Info</th>
              </tr>
            </thead>
            <tbody>
              {userData.length > 0 ? (
                userData.map((data) => (
                  <tr key={data.id}>
                    <td>{data.id}</td>
                    <td>{data.name}</td>
                    <td>{data.email}</td>
                    <td>{data.otherInfo}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
