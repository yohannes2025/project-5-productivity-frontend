// // CreateTask.js
// import React, { useEffect, useState } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { Container, Card, Form, Button, Alert, Spinner } from "react-bootstrap";
// import styles from "../styles/Common.module.css";
// import clsx from "clsx";
// import api from "../services/api"; // Ensure correct path

// const CreateTask = ({ onSubmit, onCancel }) => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [dueDate, setDueDate] = useState(new Date());
//   const [priority, setPriority] = useState("medium");
//   const [category, setCategory] = useState("development");
//   const [status, setStatus] = useState("pending");
//   const [assignedUsers, setAssignedUsers] = useState([]);
//   const [files, setFiles] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Fetch users on mount
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const token = localStorage.getItem("access_token");

//         const usersRes = await api.get("/api/users/", {
//           headers: {
//             Authorization: `Bearer ${token}`, // Add token to request
//           },
//         });

//         setUsers(usersRes.data);
//       } catch (error) {
//         console.error(error);
//         setErrorMessage("Failed to load users.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const handleAssignedUserChange = (e) => {
//     const selected = Array.from(e.target.selectedOptions).map(
//       (opt) => opt.value
//     );
//     setAssignedUsers(selected);
//   };

//   const handleFileChange = (e) => {
//     setFiles(Array.from(e.target.files));
//   };

//   const resetForm = () => {
//     setTitle("");
//     setDescription("");
//     setDueDate(new Date());
//     setPriority("medium");
//     setCategory("development");
//     setStatus("pending");
//     setAssignedUsers([]);
//     setFiles([]);
//     setSuccessMessage("");
//     setErrorMessage("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMessage("");
//     setSuccessMessage("");
//     setIsSubmitting(true);

//     const taskData = {
//       title,
//       description,
//       dueDate,
//       priority,
//       category,
//       status,
//       assignedUsers,
//       files,
//     };

//     try {
//       await onSubmit(taskData);
//       setSuccessMessage("Task created successfully!");
//       setTimeout(() => {
//         resetForm();
//         setSuccessMessage("");
//       }, 3000);
//     } catch (error) {
//       console.error("Task creation failed:", error);
//       setErrorMessage(
//         error?.response?.data?.detail ||
//           error?.message ||
//           "Something went wrong while creating the task."
//       );
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleCancel = () => {
//     resetForm();
//     if (onCancel) {
//       onCancel();
//     }
//   };

//   if (loading) {
//     return (
//       <Container className="text-center mt-5">
//         <Spinner animation="border" />
//         <p>Loading users...</p>
//       </Container>
//     );
//   }

//   return (
//     <Container
//       className={clsx(
//         styles.container,
//         "d-flex",
//         "flex-column",
//         "justify-content-center",
//         "align-items-center",
//         "mt-5 mt-md-3"
//       )}
//     >
//       <Card className="p-4 shadow" style={{ width: "100%", maxWidth: "600px" }}>
//         <h3 className="text-center mb-4">Create Task</h3>

//         {successMessage && (
//           <Alert variant="success" className="mb-3">
//             {successMessage}
//           </Alert>
//         )}
//         {errorMessage && (
//           <Alert variant="danger" className="mb-3">
//             {errorMessage}
//           </Alert>
//         )}

//         <Form onSubmit={handleSubmit}>
//           <Form.Group controlId="taskTitle">
//             <Form.Control
//               type="text"
//               placeholder="Task Title"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               required
//             />
//           </Form.Group>

//           <Form.Group controlId="taskDescription" className="mt-3">
//             <Form.Control
//               as="textarea"
//               placeholder="Task Description"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               rows={3}
//               required
//             />
//           </Form.Group>

//           <Form.Group controlId="dueDate" className="mt-3">
//             <Form.Label>Due Date</Form.Label>
//             <DatePicker
//               selected={dueDate}
//               onChange={(date) => setDueDate(date)}
//               className="form-control"
//               required
//             />
//           </Form.Group>

//           <Form.Group controlId="taskPriority" className="mt-3">
//             <Form.Label>Priority</Form.Label>
//             <Form.Select
//               value={priority}
//               onChange={(e) => setPriority(e.target.value)}
//             >
//               <option value="low">Low</option>
//               <option value="medium">Medium</option>
//               <option value="high">High</option>
//             </Form.Select>
//           </Form.Group>

//           <Form.Group controlId="taskCategory" className="mt-3">
//             <Form.Label>Category</Form.Label>
//             <Form.Select
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//             >
//               <option value="development">Development</option>
//               <option value="design">Design</option>
//               <option value="testing">Testing</option>
//               <option value="documentation">Documentation</option>
//               <option value="other">Other</option>
//             </Form.Select>
//           </Form.Group>

//           <Form.Group controlId="taskStatus" className="mt-3">
//             <Form.Label>Status</Form.Label>
//             <Form.Select
//               value={status}
//               onChange={(e) => setStatus(e.target.value)}
//             >
//               <option value="pending">To Do</option>
//               <option value="in_progress">In Progress</option>
//               <option value="done">Done</option>
//             </Form.Select>
//           </Form.Group>

//           <Form.Group controlId="assignedUsers" className="mt-3">
//             <Form.Label>Assigned Users</Form.Label>
//             <Form.Select
//               multiple
//               value={assignedUsers}
//               onChange={handleAssignedUserChange}
//             >
//               {users.map((user) => (
//                 <option key={user.id} value={user.id}>
//                   {user.username}
//                 </option>
//               ))}
//             </Form.Select>
//             <Form.Text className="text-muted">
//               Select users to assign to this task.
//             </Form.Text>
//           </Form.Group>

//           <Form.Group controlId="taskFiles" className="mt-3">
//             <Form.Label>Upload Files</Form.Label>
//             <Form.Control type="file" multiple onChange={handleFileChange} />
//             {files.length > 0 && (
//               <div className="mt-2">
//                 <p>Selected files:</p>
//                 <ul>
//                   {files.map((file, idx) => (
//                     <li key={idx}>
//                       {file.name} ({Math.round(file.size / 1024)} KB)
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </Form.Group>

//           <div className="d-flex justify-content-between mt-4">
//             <Button variant="primary" type="submit" disabled={isSubmitting}>
//               {isSubmitting ? "Submitting..." : "Create Task"}
//             </Button>
//             <Button
//               variant="outline-secondary"
//               type="button"
//               onClick={handleCancel}
//             >
//               Cancel
//             </Button>
//           </div>
//         </Form>
//       </Card>
//     </Container>
//   );
// };

// export default CreateTask;

import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Container, Card, Form, Button, Alert, Spinner } from "react-bootstrap";
import styles from "../styles/Common.module.css";
import clsx from "clsx";
import api from "../services/api"; // Ensure correct path

const CreateTask = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [priority, setPriority] = useState("medium");

  // Define the category choices
  const CATEGORY_CHOICES = [
    "development",
    "design",
    "testing",
    "documentation",
    "other",
  ];
  const [category, setCategory] = useState(CATEGORY_CHOICES[0]); // Default to the first category

  const [status, setStatus] = useState("pending");
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [files, setFiles] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch users on mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("access_token");

        const usersRes = await api.get("/api/users/", {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to request
          },
        });

        setUsers(usersRes.data);
      } catch (error) {
        console.error(error);
        setErrorMessage("Failed to load users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleAssignedUserChange = (e) => {
    const selected = Array.from(e.target.selectedOptions).map(
      (opt) => opt.value
    );
    setAssignedUsers(selected);
  };

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDueDate(new Date());
    setPriority("medium");
    setCategory(CATEGORY_CHOICES[0]); // Reset to default category
    setStatus("pending");
    setAssignedUsers([]);
    setFiles([]);
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setIsSubmitting(true);

    // Format the due date to 'YYYY-MM-DD'
    const formattedDueDate = dueDate
      ? dueDate.toISOString().split("T")[0]
      : null;

    const taskData = {
      title,
      description,
      due_date: formattedDueDate, // Use the formatted date
      priority,
      category,
      status,
      assigned_users: assignedUsers.map(Number), // Ensure user IDs are numbers
      // Files will be handled separately in the onSubmit prop (likely via FormData)
    };

    // Prepare FormData for file uploads
    const formData = new FormData();
    Object.keys(taskData).forEach((key) => {
      if (key !== "assigned_users" && taskData[key] !== null) {
        formData.append(key, taskData[key]);
      }
    });
    // Append assigned users individually
    taskData.assigned_users.forEach((userId) => {
      formData.append("assigned_users", userId);
    });
    // Append files
    files.forEach((file) => {
      formData.append("upload_files", file);
    });

    try {
      // Pass formData instead of the plain object
      await onSubmit(formData);
      setSuccessMessage("Task created successfully!");
      setTimeout(() => {
        resetForm();
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Task creation failed:", error);
      setErrorMessage(
        error?.response?.data?.detail ||
          error?.message ||
          "Something went wrong while creating the task."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    resetForm();
    if (onCancel) {
      onCancel();
    }
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <p>Loading users...</p>
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
        <h3 className="text-center mb-4">Create Task</h3>

        {successMessage && (
          <Alert variant="success" className="mb-3">
            {successMessage}
          </Alert>
        )}
        {errorMessage && (
          <Alert variant="danger" className="mb-3">
            {errorMessage}
          </Alert>
        )}

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
              dateFormat="yyyy-MM-dd" // Specify date format
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
            <Form.Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {/* Map over the CATEGORY_CHOICES to create options */}
              {CATEGORY_CHOICES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}{" "}
                  {/* Capitalize for display */}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="taskStatus" className="mt-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="pending">To Do</option>
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
                  {user.username}
                </option>
              ))}
            </Form.Select>
            <Form.Text className="text-muted">
              Select users to assign to this task.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="taskFiles" className="mt-3">
            <Form.Label>Upload Files</Form.Label>
            <Form.Control type="file" multiple onChange={handleFileChange} />
            {files.length > 0 && (
              <div className="mt-2">
                <p>Selected files:</p>
                <ul>
                  {files.map((file, idx) => (
                    <li key={idx}>
                      {file.name} ({Math.round(file.size / 1024)} KB)
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Form.Group>

          <div className="d-flex justify-content-between mt-4">
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Create Task"}
            </Button>
            <Button
              variant="outline-secondary"
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default CreateTask;
