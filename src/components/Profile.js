// Profile.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import styles from "../styles/Common.module.css";
import clsx from "clsx";

// Profile functional component
const Profile = () => {
  // State to hold user information
  const [user, setUser] = useState({
    name: "",
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  // Effect to fetch user profile data on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Fetching user profile
        const response = await axios.get("/api/profile");
        setUser(response.data);
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
    formData.append("oldPassword", user.oldPassword);
    formData.append("newPassword", user.newPassword);
    formData.append("confirmNewPassword", user.confirmNewPassword);

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
      <Row className="w-100">
        <Col className="shadow-lg mx-auto" xs={12} sm={10} md={8} lg={5}>
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

            {/* Form group for old password */}
            <Form.Group controlId="formBasicOldPassword">
              <Form.Label>Old Password:</Form.Label>
              <Form.Control
                type="password"
                value={user.oldPassword}
                onChange={(e) =>
                  setUser((prevUser) => ({
                    ...prevUser,
                    oldPassword: e.target.value,
                  }))
                }
                className="mb-3"
              />
            </Form.Group>

            {/* Form group for new password */}
            <Form.Group controlId="formBasicNewPassword">
              <Form.Label>New Password:</Form.Label>
              <Form.Control
                type="password"
                value={user.newPassword}
                onChange={(e) =>
                  setUser((prevUser) => ({
                    ...prevUser,
                    newPassword: e.target.value,
                  }))
                }
                className="mb-3"
              />
            </Form.Group>

            {/* Form group for confirm new password */}
            <Form.Group controlId="formBasicConfirmNewPassword">
              <Form.Label>Confirm New Password:</Form.Label>
              <Form.Control
                type="password"
                value={user.confirmNewPassword}
                onChange={(e) =>
                  setUser((prevUser) => ({
                    ...prevUser,
                    confirmNewPassword: e.target.value,
                  }))
                }
                className="mb-3"
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Update Password
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
