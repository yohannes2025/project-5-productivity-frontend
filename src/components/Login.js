// src/components/Login.js
import React, { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Card,
} from "react-bootstrap";
import styles from "../styles/Common.module.css";
import clsx from "clsx";

const Login = ({ onLogin }) => {
  console.log(
    "Calling /api/user/ with header:",
    api.defaults.headers.common["Authorization"]
  );
  // Accepting onLogin as a prop
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/api/login/", {
        email,
        password,
      });

      const { access, refresh } = response.data;

      // ✅ Save tokens
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);

      // ✅ Immediately update Axios headers
      api.defaults.headers.common["Authorization"] = `Bearer ${access}`;

      console.log("Received tokens:", response.data);
      console.log("Stored access token:", localStorage.getItem("access_token"));
      console.log(
        "Axios header:",
        api.defaults.headers.common["Authorization"]
      );

      // ✅ Call onLogin AFTER header is set
      await onLogin();

      // ✅ Redirect
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password.");
      console.error("Login error:", err.response || err);
    }
  };

  return (
    <Container
      className={clsx(
        styles.container,
        "d-flex",
        "flex-column",
        "justify-content-center",
        "align-items-center"
      )}
    >
      <Row className="w-100">
        <Col xs={12} sm={10} md={8} lg={5} className="mx-auto ">
          <Card className="shadow">
            <Card.Body>
              <Card.Title className="text-center">Login</Card.Title>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100 mt-3">
                  Login
                </Button>
              </Form>
              <div className="text-center mt-3">
                Don't have an account? <Link to="/register">Register</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
