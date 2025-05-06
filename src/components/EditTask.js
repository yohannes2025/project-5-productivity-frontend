// // // EditTask.js
// // import React, { useState } from "react"; // Import React and useState hook
// // import DatePicker from "react-datepicker"; // Import DatePicker for date selection
// // import "react-datepicker/dist/react-datepicker.css"; // Import DatePicker styles
// // import { Container, Card, Form, Button } from "react-bootstrap"; // Import Bootstrap components
// // import styles from "../styles/Common.module.css"; // Import custom styles
// // import clsx from "clsx"; // Import clsx for conditional class names

// // const EditTask = ({ task, users = [], onSubmit, onCancel }) => {
// //   // Define state variables for the task properties
// //   const [title, setTitle] = useState(task?.title || ""); // Initialize title
// //   const [description, setDescription] = useState(task?.description || ""); // Initialize description
// //   const [dueDate, setDueDate] = useState(
// //     task?.dueDate ? new Date(task.dueDate) : new Date() // Initialize due date
// //   );
// //   const [priority, setPriority] = useState(task?.priority || "low"); // Initialize priority
// //   const [category, setCategory] = useState(task?.category || ""); // Initialize category
// //   const [status, setStatus] = useState("Pending"); // Task status with initial value
// //   const [assignedUsers, setAssignedUsers] = useState(task?.assignedUsers || []); // Initialize assigned users
// //   const [files, setFiles] = useState([]); // Initialize files

// //   // Handle form submission
// //   const handleSubmit = (event) => {
// //     event.preventDefault(); // Prevent default form submission
// //     onSubmit({
// //       // Call the onSubmit function passing the updated task details
// //       ...task,
// //       title,
// //       description,
// //       dueDate,
// //       priority,
// //       category,
// //       status,
// //       assignedUsers,
// //       files,
// //     });
// //   };

// //   // Handle changes in assigned users selection
// //   const handleAssignedUserChange = (e) => {
// //     const options = e.target.options; // Get selected options
// //     const selected = [];
// //     for (let i = 0; i < options.length; i++) {
// //       // Collect selected user IDs
// //       if (options[i].selected) {
// //         selected.push(options[i].value);
// //       }
// //     }
// //     setAssignedUsers(selected); // Update the assigned users state
// //   };

// //   return (
// //     <Container
// //       className={clsx(
// //         styles.container,
// //         "d-flex",
// //         "flex-column",
// //         "justify-content-center",
// //         "align-items-center",
// //         "mt-5 mt-md-3"
// //       )}
// //     >
// //       <Card className="p-4 shadow" style={{ width: "100%", maxWidth: "600px" }}>
// //         <h3 className="text-center mb-4">Edit Task</h3>{" "}
// //         {/* Header for the Edit Task form */}
// //         <Form onSubmit={handleSubmit}>
// //           {" "}
// //           {/* Form submit handler */}
// //           {/* Task Title Input */}
// //           <Form.Group controlId="taskTitle">
// //             <Form.Control
// //               type="text"
// //               placeholder="Task Title"
// //               value={title}
// //               onChange={(e) => setTitle(e.target.value)} // Update title state
// //               required
// //             />
// //           </Form.Group>
// //           {/* Task Description Input */}
// //           <Form.Group controlId="taskDescription" className="mt-3">
// //             <Form.Control
// //               as="textarea"
// //               placeholder="Task Description"
// //               value={description}
// //               onChange={(e) => setDescription(e.target.value)} // Update description state
// //               rows={3}
// //             />
// //           </Form.Group>
// //           {/* Due Date Picker */}
// //           <Form.Group controlId="dueDate" className="mt-3">
// //             <Form.Label>Due Date</Form.Label>
// //             <DatePicker
// //               selected={dueDate}
// //               onChange={(date) => setDueDate(date)}
// //               className="form-control"
// //               // Add inputProps to provide an id to the underlying input
// //               inputProps={{
// //                 id: "dueDate", // Use the same id as the Form.Group controlId
// //               }}
// //             />
// //           </Form.Group>
// //           {/* Priority Selection */}
// //           <Form.Group controlId="taskPriority" className="mt-3">
// //             <Form.Label>Priority</Form.Label>
// //             <Form.Select
// //               value={priority}
// //               onChange={(e) => setPriority(e.target.value)} // Update priority state
// //             >
// //               <option value="low">Low</option>
// //               <option value="medium">Medium</option>
// //               <option value="high">High</option>
// //             </Form.Select>
// //           </Form.Group>
// //           {/* Category Input */}
// //           <Form.Group controlId="taskCategory" className="mt-3">
// //             <Form.Control
// //               type="text"
// //               placeholder="Category"
// //               value={category}
// //               onChange={(e) => setCategory(e.target.value)} // Update category state
// //             />
// //           </Form.Group>
// //           {/* Task Status Selection */}
// //           <Form.Group controlId="taskStatus" className="mt-3">
// //             <Form.Label>Status</Form.Label>

// //             <Form.Select
// //               value={status}
// //               onChange={(e) => setStatus(e.target.value)} // Update status state on selection
// //             >
// //               <option value="pending">To Do</option>
// //               <option value="in-progress">In Progress</option>
// //               <option value="done">Done</option>
// //             </Form.Select>
// //           </Form.Group>
// //           {/* Assigned Users Selection */}
// //           <Form.Group controlId="assignedUsers" className="mt-3">
// //             <Form.Label>Assigned Users:</Form.Label>
// //             <Form.Select
// //               multiple
// //               value={assignedUsers}
// //               onChange={handleAssignedUserChange} // Handle multi-select for assigned users
// //             >
// //               {users.map((user) => (
// //                 <option key={user.id} value={user.id}>
// //                   {user.name}
// //                 </option>
// //               ))}
// //             </Form.Select>
// //           </Form.Group>
// //           {/* File Upload Input */}
// //           <Form.Group controlId="taskFiles" className="mt-3">
// //             <Form.Label>Upload Files</Form.Label>
// //             <Form.Control
// //               type="file"
// //               multiple
// //               onChange={(e) => setFiles(Array.from(e.target.files))} // Update files state with selected files
// //             />
// //           </Form.Group>
// //           {/* Action Buttons */}
// //           <div className="d-flex justify-content-between mt-3">
// //             <Button variant="primary" type="submit">
// //               Edit Task
// //             </Button>
// //             <Button
// //               variant="outline-secondary"
// //               type="button"
// //               onClick={onCancel} // Cancel the edit and call provided onCancel prop
// //             >
// //               Cancel Edit
// //             </Button>
// //           </div>
// //         </Form>
// //       </Card>
// //     </Container>
// //   );
// // };

// // export default EditTask; // Export the EditTask component

// // EditTask.js
// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
// import {
//   Container,
//   Card,
//   Form,
//   Button,
//   Spinner,
//   Alert,
//   Row,
//   Col,
// } from "react-bootstrap";
// import styles from "../styles/Common.module.css";
// import clsx from "clsx";
// import api from "../services/api"; // Assuming your api.js is correctly configured

// // Define the API endpoint structure
// const TASK_DETAIL_API_ENDPOINT = "/api/tasks/"; // Append task ID for detail/update

// const EditTask = () => {
//   const { id } = useParams(); // Get the task ID from the URL parameters
//   const navigate = useNavigate(); // Hook for navigation

//   const [task, setTask] = useState(null); // State to store the fetched task data
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     due_date: "", // Use string format for input value
//     category: "",
//     priority: "medium", // Default priority
//     status: "pending", // Default status
//     assigned_users: [], // Assuming an array of user IDs or names
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [formErrors, setFormErrors] = useState({}); // State for form validation errors
//   const [submitting, setSubmitting] = useState(false); // State for submission loading

//   // Placeholder for available categories - replace with fetching from API if needed
//   const availableCategories = [
//     "development",
//     "design",
//     "testing",
//     "documentation",
//     "other",
//   ];
//   // Placeholder for available statuses - replace with fetching from API if needed
//   const availableStatuses = ["pending", "in_progress", "done"];
//   // Placeholder for available priorities
//   const availablePriorities = ["low", "medium", "high"];
//   // Placeholder for available users - replace with fetching from API if needed
//   // Assuming users are objects with id and name
//   const availableUsers = [
//     { id: 1, name: "Alice" },
//     { id: 2, name: "Bob" },
//     { id: 3, name: "Charlie" },
//   ];

//   // Fetch the task details when the component mounts or ID changes
//   useEffect(() => {
//     const fetchTask = async () => {
//       setLoading(true);
//       setError("");
//       try {
//         const response = await api.get(`${TASK_DETAIL_API_ENDPOINT}${id}/`);
//         const taskData = response.data;
//         setTask(taskData); // Store the fetched task data
//         // Pre-populate the form data state
//         setFormData({
//           title: taskData.title || "",
//           description: taskData.description || "",
//           // Format date for input[type="date"] (YYYY-MM-DD)
//           due_date: taskData.due_date
//             ? new Date(taskData.due_date).toISOString().split("T")[0]
//             : "",
//           category: taskData.category || "",
//           priority: taskData.priority || "medium",
//           status: taskData.status || "pending",
//           // Assuming assigned_users is an array of user IDs or objects
//           assigned_users: taskData.assigned_users || [],
//         });
//       } catch (err) {
//         console.error("Failed to load task:", err);
//         setError(
//           err.response?.data?.detail ||
//             err.message ||
//             "Unable to load task details."
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTask();
//   }, [id]); // Rerun effect if the task ID changes

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     // Clear validation error for this field on change
//     if (formErrors[name]) {
//       setFormErrors((prev) => {
//         const newErrors = { ...prev };
//         delete newErrors[name];
//         return newErrors;
//       });
//     }
//   };

//   // Handle changes for multi-select (assigned users)
//   const handleAssignedUsersChange = (e) => {
//     const selectedOptions = Array.from(e.target.selectedOptions).map(
//       (option) => option.value
//     );
//     setFormData((prev) => ({ ...prev, assigned_users: selectedOptions }));
//   };

//   // Basic form validation
//   const validateForm = () => {
//     const errors = {};
//     if (!formData.title.trim()) {
//       errors.title = "Title is required.";
//     }
//     if (!formData.due_date) {
//       errors.due_date = "Due date is required.";
//     } else {
//       const dueDate = new Date(formData.due_date);
//       const today = new Date();
//       today.setHours(0, 0, 0, 0); // Compare dates without time
//       if (dueDate < today) {
//         errors.due_date = "Due date cannot be in the past.";
//       }
//     }

//     // Add more validation rules as needed
//     // if (!formData.category) { errors.category = "Category is required."; }
//     // if (!formData.priority) { errors.priority = "Priority is required."; }
//     // if (!formData.status) { errors.status = "Status is required."; }

//     setFormErrors(errors);
//     return Object.keys(errors).length === 0; // Return true if no errors
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent default form submission

//     if (!validateForm()) {
//       console.log("Form validation failed.");
//       return; // Stop submission if validation fails
//     }

//     setSubmitting(true);
//     setError(""); // Clear previous errors

//     try {
//       // Send updated data to the backend using PUT
//       // Ensure your backend API expects a PUT request to the task detail endpoint for updates
//       // The payload should match what your backend expects (e.g., JSON)
//       const response = await api.put(
//         `${TASK_DETAIL_API_ENDPOINT}${id}/`,
//         formData
//       );

//       console.log("Task updated successfully:", response.data);
//       // Redirect to the task list or the updated task detail page
//       navigate("/"); // Redirect to task list
//       // navigate(`/tasks/${id}`); // Redirect to task detail if you have one
//     } catch (err) {
//       console.error("Failed to update task:", err);
//       setError(
//         err.response?.data?.detail || err.message || "Unable to update task."
//       );
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) {
//     return (
//       <Container className="text-center mt-5">
//         <Spinner animation="border" />
//         <p>Loading task details...</p>
//       </Container>
//     );
//   }

//   if (error && !task) {
//     // Show error if task couldn't be loaded at all
//     return (
//       <Container className="mt-5">
//         <Alert variant="danger">{error}</Alert>
//       </Container>
//     );
//   }

//   // Render the form once the task is loaded
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
//       <Card className="p-4 shadow w-100" style={{ maxWidth: "760px" }}>
//         <h3 className="text-center mb-4">Edit Task</h3>

//         {/* Show error alert if there's an update error */}
//         {error && <Alert variant="danger">{error}</Alert>}

//         <Form onSubmit={handleSubmit}>
//           <Row className="g-3">
//             <Col md={12}>
//               <Form.Group controlId="formTitle">
//                 <Form.Label>Title</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter task title"
//                   name="title"
//                   value={formData.title}
//                   onChange={handleChange}
//                   isInvalid={!!formErrors.title} // Mark as invalid if there's an error
//                 />
//                 <Form.Control.Feedback type="invalid">
//                   {formErrors.title}
//                 </Form.Control.Feedback>
//               </Form.Group>
//             </Col>

//             <Col md={12}>
//               <Form.Group controlId="formDescription">
//                 <Form.Label>Description</Form.Label>
//                 <Form.Control
//                   as="textarea"
//                   rows={3}
//                   placeholder="Enter task description"
//                   name="description"
//                   value={formData.description}
//                   onChange={handleChange}
//                 />
//               </Form.Group>
//             </Col>

//             <Col md={6}>
//               <Form.Group controlId="formDueDate">
//                 <Form.Label>Due Date</Form.Label>
//                 <Form.Control
//                   type="date"
//                   name="due_date"
//                   value={formData.due_date}
//                   onChange={handleChange}
//                   isInvalid={!!formErrors.due_date}
//                 />
//                 <Form.Control.Feedback type="invalid">
//                   {formErrors.due_date}
//                 </Form.Control.Feedback>
//               </Form.Group>
//             </Col>

//             <Col md={6}>
//               <Form.Group controlId="formCategory">
//                 <Form.Label>Category</Form.Label>
//                 <Form.Select
//                   name="category"
//                   value={formData.category}
//                   onChange={handleChange}
//                 >
//                   <option value="">Select Category</option>
//                   {availableCategories.map((category) => (
//                     <option key={category} value={category}>
//                       {category.charAt(0).toUpperCase() + category.slice(1)}
//                     </option>
//                   ))}
//                 </Form.Select>
//               </Form.Group>
//             </Col>

//             <Col md={6}>
//               <Form.Group controlId="formPriority">
//                 <Form.Label>Priority</Form.Label>
//                 <Form.Select
//                   name="priority"
//                   value={formData.priority}
//                   onChange={handleChange}
//                 >
//                   {availablePriorities.map((priority) => (
//                     <option key={priority} value={priority}>
//                       {priority.charAt(0).toUpperCase() + priority.slice(1)}
//                     </option>
//                   ))}
//                 </Form.Select>
//               </Form.Group>
//             </Col>

//             <Col md={6}>
//               <Form.Group controlId="formStatus">
//                 <Form.Label>Status</Form.Label>
//                 <Form.Select
//                   name="status"
//                   value={formData.status}
//                   onChange={handleChange}
//                 >
//                   {availableStatuses.map((status) => (
//                     <option key={status} value={status}>
//                       {status
//                         .replace("_", " ")
//                         .split(" ")
//                         .map(
//                           (word) => word.charAt(0).toUpperCase() + word.slice(1)
//                         )
//                         .join(" ")}
//                     </option>
//                   ))}
//                 </Form.Select>
//               </Form.Group>
//             </Col>

//             <Col md={12}>
//               <Form.Group controlId="formAssignedUsers">
//                 <Form.Label>Assigned Users</Form.Label>
//                 {/* Use a select with multiple attribute */}
//                 <Form.Select
//                   multiple
//                   name="assigned_users"
//                   value={formData.assigned_users} // Value must be an array of selected option values
//                   onChange={handleAssignedUsersChange}
//                 >
//                   {/* Assuming availableUsers is an array of { id, name } objects */}
//                   {availableUsers.map((user) => (
//                     <option key={user.id} value={user.id}>
//                       {" "}
//                       {/* Use user ID as value */}
//                       {user.name}
//                     </option>
//                   ))}
//                 </Form.Select>
//                 <Form.Text className="text-muted">
//                   Hold down Ctrl (Windows) or Cmd (Mac) to select multiple
//                   users.
//                 </Form.Text>
//               </Form.Group>
//             </Col>

//             {/* Add other form fields as needed */}
//           </Row>

//           <div className="text-center mt-4">
//             <Button variant="primary" type="submit" disabled={submitting}>
//               {submitting ? (
//                 <>
//                   <Spinner
//                     as="span"
//                     animation="border"
//                     size="sm"
//                     role="status"
//                     aria-hidden="true"
//                     className="me-2"
//                   />
//                   Updating...
//                 </>
//               ) : (
//                 "Update Task"
//               )}
//             </Button>
//             <Button
//               variant="secondary"
//               className="ms-2"
//               onClick={() => navigate("/")}
//             >
//               Cancel
//             </Button>
//           </div>
//         </Form>
//       </Card>
//     </Container>
//   );
// };

// export default EditTask;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Container, Card, Form, Button, Alert, Spinner } from "react-bootstrap";
import styles from "../styles/Common.module.css";
import clsx from "clsx";
import api from "../services/api"; // ✅ ensure this path is correct

const EditTask = ({ onCancel }) => {
  const { id } = useParams(); // Task ID from URL

  // State variables
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [priority, setPriority] = useState("low");
  const [category, setCategory] = useState("development");
  const [status, setStatus] = useState("pending");
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [files, setFiles] = useState([]);
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch task and users on mount
  useEffect(() => {
    const fetchTaskAndUsers = async () => {
      try {
        // Include token for user request
        const token = localStorage.getItem("access_token");

        const [taskRes, usersRes] = await Promise.all([
          api.get(`/api/tasks/${id}/`, {
            headers: {
              Authorization: `Bearer ${token}`, // Add token to request
            },
          }),
          api.get(`/api/users/`, {
            headers: {
              Authorization: `Bearer ${token}`, // Add token to request
            },
          }),
        ]);

        const task = taskRes.data;
        setTitle(task.title);
        setDescription(task.description);
        setDueDate(new Date(task.due_date));
        setPriority(task.priority);
        setCategory(task.category);
        setStatus(task.status);
        setAssignedUsers(task.assigned_users.map((u) => String(u)));
        setUsers(usersRes.data);
      } catch (error) {
        console.error(error);
        setErrorMessage("Failed to load task or users.");
      } finally {
        setLoading(false);
      }
    };

    fetchTaskAndUsers();
  }, [id]);

  const handleAssignedUserChange = (e) => {
    const selected = Array.from(e.target.selectedOptions).map(
      (opt) => opt.value
    );
    setAssignedUsers(selected);
  };

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("due_date", dueDate.toISOString());
    formData.append("priority", priority);
    formData.append("category", category);
    formData.append("status", status);
    assignedUsers.forEach((userId) =>
      formData.append("assigned_users", userId)
    );
    files.forEach((file) => formData.append("files", file));

    try {
      const token = localStorage.getItem("access_token");

      await api.put(`/api/tasks/${id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // Add token here
        },
      });
      setSuccessMessage("Task updated successfully!");
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to update the task.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <p>Loading task...</p>
      </Container>
    );
  }

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
      <Card className="p-4 shadow" style={{ width: "100%", maxWidth: "600px" }}>
        <h3 className="text-center mb-4">Edit Task</h3>

        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="taskTitle">
            <Form.Control
              type="text"
              placeholder="Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="taskDescription" className="mt-3">
            <Form.Control
              as="textarea"
              placeholder="Task Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              required
            />
          </Form.Group>

          <Form.Group controlId="dueDate" className="mt-3">
            <Form.Label>Due Date</Form.Label>
            <DatePicker
              selected={dueDate}
              onChange={(date) => setDueDate(date)}
              className="form-control"
              required
            />
          </Form.Group>

          <Form.Group controlId="taskPriority" className="mt-3">
            <Form.Label>Priority</Form.Label>
            <Form.Select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="taskCategory" className="mt-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="taskStatus" className="mt-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="done">Done</option>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="assignedUsers" className="mt-3">
            <Form.Label>Assigned Users</Form.Label>
            <Form.Select
              multiple
              value={assignedUsers}
              onChange={handleAssignedUserChange}
            >
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name || user.username}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="taskFiles" className="mt-3">
            <Form.Label>Upload Files</Form.Label>
            <Form.Control type="file" multiple onChange={handleFileChange} />
          </Form.Group>

          <div className="d-flex justify-content-between mt-4">
            <Button variant="primary" type="submit" disabled={submitting}>
              {submitting ? "Saving..." : "Update Task"}
            </Button>
            <Button
              variant="outline-secondary"
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default EditTask;
