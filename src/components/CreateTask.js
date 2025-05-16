// // CreateTask.js
// import React, { useEffect, useState } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { Container, Card, Form, Button, Alert, Spinner } from "react-bootstrap";
// import styles from "../styles/Common.module.css";
// import clsx from "clsx";
// import api from "../services/api";

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
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         setUsers(usersRes.data);
//       } catch (error) {
//         // console.error(error);
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
//       // console.error("Task creation failed:", error);
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
//     if (onCancel) onCancel();
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
//         "mt-5"
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

//           {/* <Form.Group controlId="dueDate" className="mt-3">
//             <Form.Label>Due Date</Form.Label>
//             <DatePicker
//               selected={dueDate}
//               onChange={(date) => setDueDate(date)}
//               className="form-control"
//               required
//             />
//           </Form.Group> */}
//           <DatePicker
//             id="dueDate"
//             name="dueDate"
//             selected={
//               dueDate && dueDate instanceof Date && !isNaN(dueDate)
//                 ? dueDate
//                 : new Date()
//             }
//             onChange={(date) => setDueDate(date)}
//             className="form-control"
//             required
//             dateFormat="yyyy-MM-dd"
//           />

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

// CreateTask.js
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Container, Card, Form, Button, Alert, Spinner } from "react-bootstrap";
import styles from "../styles/Common.module.css";
import clsx from "clsx";
import api from "../services/api";

const CreateTask = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [priority, setPriority] = useState("medium");
  const [category, setCategory] = useState("development");
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
            Authorization: `Bearer ${token}`,
          },
        });

        setUsers(usersRes.data);
      } catch (error) {
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
    setCategory("development");
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

    // Prepare form data for submission (handle files with FormData)
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("due_date", dueDate.toISOString().split("T")[0]); // format as YYYY-MM-DD
    formData.append("priority", priority);
    formData.append("category", category);
    formData.append("status", status);
    assignedUsers.forEach((userId) =>
      formData.append("assigned_users", userId)
    );
    files.forEach((file) => formData.append("files", file));

    try {
      // onSubmit should handle formData now
      await onSubmit(formData);
      setSuccessMessage("Task created successfully!");
      setTimeout(() => {
        resetForm();
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
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
    if (onCancel) onCancel();
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
        "mt-5"
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
              maxLength={255}
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
              maxLength={1000}
            />
          </Form.Group>

          <Form.Group controlId="dueDate" className="mt-3">
            <Form.Label>Due Date</Form.Label>
            <DatePicker
              selected={
                dueDate && dueDate instanceof Date && !isNaN(dueDate)
                  ? dueDate
                  : new Date()
              }
              onChange={(date) => setDueDate(date)}
              className="form-control"
              required
              dateFormat="yyyy-MM-dd"
              minDate={new Date()}
            />
          </Form.Group>

          <Form.Group controlId="taskPriority" className="mt-3">
            <Form.Label>Priority</Form.Label>
            <Form.Select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              required
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
              required
            >
              <option value="development">Development</option>
              <option value="design">Design</option>
              <option value="testing">Testing</option>
              <option value="documentation">Documentation</option>
              <option value="other">Other</option>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="taskStatus" className="mt-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
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
              aria-label="Select assigned users"
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
              {isSubmitting ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />{" "}
                  Submitting...
                </>
              ) : (
                "Create Task"
              )}
            </Button>
            <Button
              variant="outline-secondary"
              type="button"
              onClick={handleCancel}
              disabled={isSubmitting}
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
