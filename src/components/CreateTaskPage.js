// // // // CreateTaskPage.js
// // // import React from "react";
// // // import axios from "axios";
// // // import CreateTask from "./CreateTask";

// // // const CreateTaskPage = () => {
// // //   const handleCreateTask = async (taskData) => {
// // //     const formData = new FormData();
// // //     formData.append("title", taskData.title);
// // //     formData.append("description", taskData.description);
// // //     formData.append("due_date", taskData.dueDate.toISOString().split("T")[0]);
// // //     formData.append("priority", taskData.priority);
// // //     formData.append("category", taskData.category);
// // //     formData.append("status", taskData.status);
// // //     taskData.assignedUsers.forEach((user, i) =>
// // //       formData.append(`assigned_users[${i}]`, user)
// // //     );
// // //     taskData.files.forEach((file) => formData.append("files", file));

// // //     const token = localStorage.getItem("access_token");
// // //     const response = await axios.post(
// // //       "http://localhost:8000/api/tasks/",
// // //       formData,
// // //       {
// // //         headers: {
// // //           Authorization: `Bearer ${token}`,
// // //           "Content-Type": "multipart/form-data",
// // //         },
// // //       }
// // //     );
// // //     return response.data;
// // //   };

// // //   return <CreateTask onSubmit={handleCreateTask} />;
// // // };

// // // export default CreateTaskPage;

// // import React from "react";
// // import axios from "axios";
// // import CreateTask from "./CreateTask";

// // const CreateTaskPage = () => {
// //   const handleCreateTask = async (taskData) => {
// //     try {
// //       const formData = new FormData();
// //       formData.append("title", taskData.title);
// //       formData.append("description", taskData.description);
// //       formData.append("due_date", taskData.dueDate.toISOString().split("T")[0]);
// //       formData.append("priority", taskData.priority);
// //       formData.append("category", taskData.category);
// //       formData.append("status", taskData.status);

// //       taskData.assignedUsers.forEach((user, i) =>
// //         formData.append(`assigned_users[${i}]`, user)
// //       );
// //       taskData.files.forEach((file) => formData.append("files", file));

// //       const token = localStorage.getItem("access_token");

// //       // Send task creation request with Authorization header
// //       const response = await axios.post(
// //         "http://localhost:8000/api/tasks/",
// //         formData,
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`, // Authorization header with JWT token
// //             "Content-Type": "multipart/form-data",
// //           },
// //         }
// //       );
// //       console.log("Task created:", response.data);
// //       return response.data;
// //     } catch (error) {
// //       console.error("Task creation failed:", error);
// //       throw error;
// //     }
// //   };

// //   return <CreateTask onSubmit={handleCreateTask} />;
// // };

// // export default CreateTaskPage;

// // import React from "react";
// // import axios from "axios";
// // import CreateTask from "./CreateTask";

// // const CreateTaskPage = () => {
// //   const handleCreateTask = async (taskData) => {
// //     try {
// //       const formData = new FormData();
// //       formData.append("title", taskData.title);
// //       formData.append("description", taskData.description);
// //       formData.append("due_date", taskData.dueDate.toISOString().split("T")[0]);
// //       formData.append("priority", taskData.priority);
// //       formData.append("category", taskData.category);
// //       formData.append("status", taskData.status);

// //       taskData.assignedUsers.forEach((user, i) =>
// //         formData.append(`assigned_users[${i}]`, user)
// //       );
// //       taskData.files.forEach((file) => formData.append("files", file));

// //       const token = localStorage.getItem("accessToken");

// //       if (!token) {
// //         console.error("No access token found. User might not be logged in.");
// //         return;
// //       }

// //       // Send task creation request with Authorization header
// //       const response = await axios.post(
// //         "http://localhost:8000/api/tasks/",
// //         formData,
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`, // Authorization header with JWT token
// //             "Content-Type": "multipart/form-data",
// //           },
// //         }
// //       );

// //       return response.data;
// //     } catch (error) {
// //       console.error("Task creation failed:", error);
// //       throw error;
// //     }
// //   };

// //   return <CreateTask onSubmit={handleCreateTask} />;
// // };

// // export default CreateTaskPage;

// // CreateTaskPage.js

// import React from "react";
// import axios from "axios";
// import CreateTask from "./CreateTask";

// const CreateTaskPage = () => {
//   const handleCreateTask = async (taskData) => {
//     try {
//       const formData = new FormData();
//       formData.append("title", taskData.title);
//       formData.append("description", taskData.description);
//       formData.append("due_date", taskData.dueDate.toISOString().split("T")[0]);
//       formData.append("priority", taskData.priority);
//       formData.append("category", taskData.category);
//       formData.append("status", taskData.status);

//       taskData.assignedUsers.forEach((userId) => {
//         formData.append("assigned_users", userId);
//       });

//       taskData.files.forEach((file) => formData.append("files", file));

//       const token = localStorage.getItem("accessToken");

//       if (!token) {
//         console.error("No access token found. User might not be logged in.");
//         return;
//       }

//       const response = await axios.post(
//         "http://localhost:8000/api/tasks/",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data", // Let Axios handle this
//           },
//         }
//       );

//       return response.data;
//     } catch (err) {
//       if (err.response) {
//         console.error("Server validation errors:", err.response.data);
//       } else {
//         console.error("Request error:", err.message);
//       }
//     }
//   };

//   return <CreateTask onSubmit={handleCreateTask} />;
// };

// export default CreateTaskPage;

import React from "react";
import axios from "axios";
import CreateTask from "./CreateTask";

const CreateTaskPage = () => {
  const handleCreateTask = async (taskData) => {
    try {
      const formData = new FormData();
      formData.append("title", taskData.title);
      formData.append("description", taskData.description);
      formData.append("due_date", taskData.dueDate.toISOString().split("T")[0]);
      formData.append("priority", taskData.priority);
      formData.append("category", taskData.category);
      formData.append("status", taskData.status.toLowerCase());

      // ✅ Append assigned users correctly
      taskData.assignedUsers.forEach((userId, i) =>
        formData.append(`assigned_users[${i}]`, userId)
      );
      const assignedUserIds = taskData.assignedUsers.map((u) => u.id);

      // ✅ Append files (if any)
      taskData.files.forEach((file) => formData.append("upload_files", file));

      // ✅ Include Authorization token
      const token = localStorage.getItem("access_token");

      const response = await axios.post(
        "http://localhost:8000/api/tasks/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Task created successfully:", response.data);
      return response.data;
    } catch (err) {
      if (err.response) {
        console.error("Server validation errors:", err.response.data); // ✅ Show field-specific errors
        alert("Task creation failed: " + JSON.stringify(err.response.data));
      } else {
        console.error("Network or unknown error:", err.message);
        alert("Network error: " + err.message);
      }
    }
  };

  return <CreateTask onSubmit={handleCreateTask} />;
};

export default CreateTaskPage;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Form, Button, Container, Alert } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";

// const CreateTaskPage = () => {
//   const navigate = useNavigate();
//   const [taskData, setTaskData] = useState({
//     title: "",
//     description: "",
//     due_date: "",
//     priority: "medium",
//     category: "",
//     status: "pending",
//     assignedUsers: [],
//     upload_files: null,
//   });

//   const [users, setUsers] = useState([]);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const token = localStorage.getItem("accessToken");
//         const response = await axios.get("http://localhost:8000/api/users/", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setUsers(response.data);
//       } catch (err) {
//         console.error("Error fetching users:", err);
//       }
//     };
//     fetchUsers();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "upload_files") {
//       setTaskData({ ...taskData, upload_files: files[0] });
//     } else {
//       setTaskData({ ...taskData, [name]: value });
//     }
//   };

//   const handleMultiSelect = (e) => {
//     const options = Array.from(e.target.selectedOptions);
//     const selectedIds = options.map((opt) => parseInt(opt.value));
//     setTaskData({ ...taskData, assignedUsers: selectedIds });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();

//     formData.append("title", taskData.title);
//     formData.append("description", taskData.description);
//     formData.append("due_date", taskData.due_date);
//     formData.append("priority", taskData.priority.toLowerCase());
//     formData.append("category", taskData.category);
//     formData.append("status", taskData.status.toLowerCase());

//     taskData.assignedUsers.forEach((id) =>
//       formData.append("assigned_users", id)
//     );

//     if (taskData.upload_files) {
//       formData.append("upload_files", taskData.upload_files);
//     }

//     try {
//       const token = localStorage.getItem("accessToken");
//       const response = await axios.post(
//         "http://localhost:8000/api/tasks/",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       console.log("Task created:", response.data);
//       navigate("/"); // redirect after success
//     } catch (err) {
//       console.error("Task creation failed:", err);
//       setError(
//         err.response?.data ||
//           "An unexpected error occurred. Please try again later."
//       );
//     }
//   };

//   return (
//     <Container>
//       <h2>Create New Task</h2>
//       {error && (
//         <Alert variant="danger">
//           {typeof error === "object" ? JSON.stringify(error) : error}
//         </Alert>
//       )}
//       <Form onSubmit={handleSubmit} encType="multipart/form-data">
//         <Form.Group controlId="formTitle">
//           <Form.Label>Title</Form.Label>
//           <Form.Control
//             name="title"
//             value={taskData.title}
//             onChange={handleChange}
//             required
//           />
//         </Form.Group>

//         <Form.Group controlId="formDescription">
//           <Form.Label>Description</Form.Label>
//           <Form.Control
//             name="description"
//             value={taskData.description}
//             onChange={handleChange}
//             as="textarea"
//             rows={3}
//             required
//           />
//         </Form.Group>

//         <Form.Group controlId="formDueDate">
//           <Form.Label>Due Date</Form.Label>
//           <Form.Control
//             name="due_date"
//             type="date"
//             value={taskData.due_date}
//             onChange={handleChange}
//             required
//           />
//         </Form.Group>

//         <Form.Group controlId="formPriority">
//           <Form.Label>Priority</Form.Label>
//           <Form.Select
//             name="priority"
//             value={taskData.priority}
//             onChange={handleChange}
//           >
//             <option value="low">Low</option>
//             <option value="medium">Medium</option>
//             <option value="high">High</option>
//           </Form.Select>
//         </Form.Group>

//         <Form.Group controlId="formCategory">
//           <Form.Label>Category</Form.Label>
//           <Form.Control
//             name="category"
//             value={taskData.category}
//             onChange={handleChange}
//           />
//         </Form.Group>

//         <Form.Group controlId="formStatus">
//           <Form.Label>Status</Form.Label>
//           <Form.Select
//             name="status"
//             value={taskData.status}
//             onChange={handleChange}
//           >
//             <option value="pending">Pending</option>
//             <option value="in_progress">In Progress</option>
//             <option value="done">Done</option>
//           </Form.Select>
//         </Form.Group>

//         <Form.Group controlId="formAssignedUsers">
//           <Form.Label>Assign To</Form.Label>
//           <Form.Select
//             multiple
//             onChange={handleMultiSelect}
//             value={taskData.assignedUsers}
//           >
//             {users.map((user) => (
//               <option key={user.id} value={user.id}>
//                 {user.username || user.email}
//               </option>
//             ))}
//           </Form.Select>
//         </Form.Group>

//         <Form.Group controlId="formFile">
//           <Form.Label>File Upload</Form.Label>
//           <Form.Control
//             type="file"
//             name="upload_files"
//             onChange={handleChange}
//           />
//         </Form.Group>

//         <Button type="submit" className="mt-3">
//           Create Task
//         </Button>
//       </Form>
//     </Container>
//   );
// };

// export default CreateTaskPage;
