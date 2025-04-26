// // // Register.js
// // import React, { useState } from "react";
// // import api from "../services/api";
// // import { useNavigate } from "react-router-dom";
// // import {
// //   Container,
// //   Row,
// //   Col,
// //   Form,
// //   Button,
// //   Alert,
// //   Card,
// // } from "react-bootstrap";
// // import styles from "../styles/Common.module.css";
// // import clsx from "clsx"; // Import clsx

// // const Register = () => {
// //   const navigate = useNavigate();
// //   const [name, setName] = useState("");
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [error, setError] = useState("");

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     try {
// //       const response = await api.post("/register", { name, email, password });
// //       // Redirect the user to the login page after successful registration
// //       navigate("/login");
// //     } catch (err) {
// //       // Check if the error response has a 'data' property
// //       setError(
// //         err.response?.data?.message || "An error occurred during registration."
// //       );
// //     }
// //   };

// //   return (
// //     <Container
// //       className={clsx(
// //         styles.container,
// //         "d-flex",
// //         "flex-column",
// //         "justify-content-center",
// //         "align-items-center"
// //       )}
// //     >
// //       <Row className="w-100">
// //         <Col xs={12} sm={10} md={8} lg={5} className="mx-auto ">
// //           <Card className="shadow">
// //             <Card.Body>
// //               <Card.Title className="text-center">Register</Card.Title>
// //               {error && <Alert variant="danger">{error}</Alert>}
// //               <Form onSubmit={handleSubmit}>
// //                 <Form.Group controlId="formName">
// //                   <Form.Label>Name</Form.Label>
// //                   <Form.Control
// //                     type="text"
// //                     value={name}
// //                     onChange={(e) => setName(e.target.value)}
// //                     required
// //                   />
// //                 </Form.Group>
// //                 <Form.Group controlId="formEmail">
// //                   <Form.Label>Email</Form.Label>
// //                   <Form.Control
// //                     type="email"
// //                     value={email}
// //                     onChange={(e) => setEmail(e.target.value)}
// //                     required
// //                   />
// //                 </Form.Group>
// //                 <Form.Group controlId="formPassword">
// //                   <Form.Label>Password</Form.Label>
// //                   <Form.Control
// //                     type="password"
// //                     value={password}
// //                     onChange={(e) => setPassword(e.target.value)}
// //                     required
// //                   />
// //                 </Form.Group>
// //                 <Button variant="primary" type="submit" className="w-100 mt-3">
// //                   Register
// //                 </Button>
// //               </Form>
// //             </Card.Body>
// //           </Card>
// //         </Col>
// //       </Row>
// //     </Container>
// //   );
// // };

// // export default Register;

// import React, { useState } from "react";
// import api from "../services/api";
// import { useNavigate } from "react-router-dom";
// import {
//   Container,
//   Row,
//   Col,
//   Form,
//   Button,
//   Alert,
//   Card,
// } from "react-bootstrap";
// import styles from "../styles/Common.module.css";
// import clsx from "clsx"; // Import clsx

// const Register = () => {
//   const navigate = useNavigate();
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Adjusted endpoint to match Django API route for registration
//       const response = await api.post("/api/register/", {
//         name,
//         email,
//         password,
//       });
//       // Redirect the user to the login page after successful registration
//       navigate("/login");
//     } catch (err) {
//       // Check if the error response has a 'data' property
//       setError(
//         err.response?.data?.message || "An error occurred during registration."
//       );
//     }
//   };

//   return (
//     <Container
//       className={clsx(
//         styles.container,
//         "d-flex",
//         "flex-column",
//         "justify-content-center",
//         "align-items-center"
//       )}
//     >
//       <Row className="w-100">
//         <Col xs={12} sm={10} md={8} lg={5} className="mx-auto ">
//           <Card className="shadow">
//             <Card.Body>
//               <Card.Title className="text-center">Register</Card.Title>
//               {error && <Alert variant="danger">{error}</Alert>}
//               <Form onSubmit={handleSubmit}>
//                 <Form.Group controlId="formName">
//                   <Form.Label>Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     required
//                   />
//                 </Form.Group>
//                 <Form.Group controlId="formEmail">
//                   <Form.Label>Email</Form.Label>
//                   <Form.Control
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                   />
//                 </Form.Group>
//                 <Form.Group controlId="formPassword">
//                   <Form.Label>Password</Form.Label>
//                   <Form.Control
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                   />
//                 </Form.Group>
//                 <Button variant="primary" type="submit" className="w-100 mt-3">
//                   Register
//                 </Button>
//               </Form>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Register;

import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
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
import clsx from "clsx"; // Import clsx

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Adjusted endpoint to match Django API route for registration
      const response = await api.post("/api/register/", {
        name,
        email,
        password,
      });
      // Redirect the user to the login page after successful registration
      navigate("/login");
    } catch (err) {
      console.error("Registration error:", err); // Log the full error for debugging
      // Check if the error response has a 'data' property
      setError(
        err.response?.data?.message || "An error occurred during registration."
      );
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
              <Card.Title className="text-center">Register</Card.Title>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Form.Group>
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
                  Register
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
