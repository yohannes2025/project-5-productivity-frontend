// // //CreateTask.js
// // import React, { useState } from "react";
// // import DatePicker from "react-datepicker";
// // import "react-datepicker/dist/react-datepicker.css";
// // import { Container, Card, Form, Button, Alert } from "react-bootstrap"; // Added Alert for success message
// // import styles from "../styles/Common.module.css";
// // import clsx from "clsx";

// // const CreateTask = ({ users = [], onSubmit, onCancel }) => {
// //   // State variables for task properties
// //   const [title, setTitle] = useState("");
// //   const [description, setDescription] = useState("");
// //   const [dueDate, setDueDate] = useState(new Date());
// //   const [priority, setPriority] = useState("low");
// //   const [category, setCategory] = useState("");
// //   const [status, setStatus] = useState("Pending");
// //   const [assignedUsers, setAssignedUsers] = useState([]);
// //   const [files, setFiles] = useState([]);
// //   const [successMessage, setSuccessMessage] = useState(""); // State for success message

// //   // Handle form submission
// //   const handleSubmit = (event) => {
// //     event.preventDefault(); // Prevent default form behavior

// //     // Call the onSubmit prop with the task data
// //     onSubmit({
// //       title,
// //       description,
// //       dueDate,
// //       priority,
// //       category,
// //       status,
// //       assignedUsers,
// //       files,
// //     });

// //     setSuccessMessage("Task submitted successfully!");

// //     // Delay reset so message can appear first
// //     setTimeout(() => {
// //       resetForm();
// //       setSuccessMessage(""); // optional: auto clear after reset
// //     }, 3000); // 3 seconds delay
// //   };

// //   const resetForm = () => {
// //     setTitle("");
// //     setDescription("");
// //     setDueDate(new Date());
// //     setPriority("low");
// //     setCategory("");
// //     setStatus("Pending");
// //     setAssignedUsers([]);
// //     setFiles([]);
// //     setSuccessMessage(""); // Clear success message
// //   };

// //   // Handle changes to the assigned users selection
// //   const handleAssignedUserChange = (e) => {
// //     const options = e.target.options;
// //     const selected = [];
// //     for (let i = 0; i < options.length; i++) {
// //       if (options[i].selected) {
// //         selected.push(options[i].value);
// //       }
// //     }
// //     setAssignedUsers(selected);
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
// //         <h3 className="text-center mb-4">Create Task</h3>

// //         {successMessage && ( // Conditionally render the success message
// //           <Alert variant="success">{successMessage}</Alert>
// //         )}

// //         <Form onSubmit={handleSubmit}>
// //           {/* Task Title Input */}
// //           <Form.Group controlId="taskTitle">
// //             <Form.Control
// //               type="text"
// //               placeholder="Task Title"
// //               value={title}
// //               onChange={(e) => setTitle(e.target.value)}
// //               required
// //             />
// //           </Form.Group>
// //           {/* Task Description Input */}
// //           <Form.Group controlId="taskDescription" className="mt-3">
// //             <Form.Control
// //               as="textarea"
// //               placeholder="Task Description"
// //               value={description}
// //               onChange={(e) => setDescription(e.target.value)}
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
// //               id="dueDate" // Add the id attribute here
// //             />
// //           </Form.Group>
// //           {/* Priority Selection */}
// //           <Form.Group controlId="taskPriority" className="mt-3">
// //             <Form.Label>Priority</Form.Label>
// //             <Form.Select
// //               value={priority}
// //               onChange={(e) => setPriority(e.target.value)}
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
// //               onChange={(e) => setCategory(e.target.value)}
// //             />
// //           </Form.Group>
// //           {/* Task Status Selection */}
// //           <Form.Group controlId="taskStatus" className="mt-3">
// //             <Form.Label>Status</Form.Label>
// //             <Form.Select
// //               value={status}
// //               onChange={(e) => setStatus(e.target.value)}
// //             >
// //               <option value="Pending">Pending</option>
// //               <option value="In Progress">In Progress</option>
// //               <option value="Done">Done</option>
// //             </Form.Select>
// //           </Form.Group>
// //           {/* Assigned Users Selection */}
// //           <Form.Group controlId="assignedUsers" className="mt-3">
// //             <Form.Label>Assigned Users:</Form.Label>
// //             <Form.Select
// //               multiple
// //               value={assignedUsers}
// //               onChange={handleAssignedUserChange}
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
// //               onChange={(e) => setFiles(Array.from(e.target.files))}
// //             />
// //           </Form.Group>
// //           {/* Action Buttons */}
// //           <div className="d-flex justify-content-between mt-3">
// //             <Button variant="primary" type="submit">
// //               Create Task
// //             </Button>
// //             <Button
// //               variant="outline-secondary"
// //               type="button"
// //               onClick={onCancel}
// //             >
// //               Cancel Creation
// //             </Button>
// //           </div>
// //         </Form>
// //       </Card>
// //     </Container>
// //   );
// // };

// // export default CreateTask;

// //CreateTask.js
// import React, { useState } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { Container, Card, Form, Button, Alert } from "react-bootstrap";
// import styles from "../styles/Common.module.css";
// import clsx from "clsx";

// const CreateTask = ({ users = [], onSubmit, onCancel }) => {
//   // State variables for task properties
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [dueDate, setDueDate] = useState(new Date());
//   const [priority, setPriority] = useState("low");
//   const [category, setCategory] = useState("");
//   const [status, setStatus] = useState("Pending");
//   const [assignedUsers, setAssignedUsers] = useState([]);
//   const [files, setFiles] = useState([]);
//   const [successMessage, setSuccessMessage] = useState("");

//   // Handle form submission
//   const handleSubmit = (event) => {
//     event.preventDefault();

//     // Convert the dueDate to "YYYY-MM-DD" format before submitting
//     const formattedDueDate = dueDate.toISOString().split("T")[0];

//     onSubmit({
//       title,
//       description,
//       dueDate,
//       priority,
//       category,
//       status,
//       assignedUsers,
//       files,
//     });

//     setSuccessMessage("Task submitted successfully!");

//     setTimeout(() => {
//       resetForm();
//       setSuccessMessage("");
//     }, 3000);
//   };

//   const resetForm = () => {
//     setTitle("");
//     setDescription("");
//     setDueDate(new Date());
//     setPriority("low");
//     setCategory("");
//     setStatus("Pending");
//     setAssignedUsers([]);
//     setFiles([]);
//     setSuccessMessage("");
//   };

//   // Handle changes to the assigned users selection
//   const handleAssignedUserChange = (e) => {
//     const options = e.target.options;
//     const selected = [];
//     for (let i = 0; i < options.length; i++) {
//       if (options[i].selected) {
//         selected.push(options[i].value);
//       }
//     }
//     setAssignedUsers(selected);
//   };

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

//         {successMessage && <Alert variant="success">{successMessage}</Alert>}

//         <Form onSubmit={handleSubmit}>
//           {/* Task Title Input */}
//           <Form.Group controlId="taskTitle">
//             <Form.Control
//               type="text"
//               placeholder="Task Title"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               required
//               id="taskTitle" // Added id
//             />
//           </Form.Group>
//           {/* Task Description Input */}
//           <Form.Group controlId="taskDescription" className="mt-3">
//             <Form.Control
//               as="textarea"
//               placeholder="Task Description"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               rows={3}
//               id="taskDescription" // Added id
//             />
//           </Form.Group>
//           {/* Due Date Picker */}
//           <Form.Group controlId="dueDate" className="mt-3">
//             <Form.Label>Due Date</Form.Label>
//             <DatePicker
//               selected={dueDate}
//               onChange={(date) => setDueDate(date)}
//               className="form-control"
//               id="dueDate" // Added id
//             />
//           </Form.Group>
//           {/* Priority Selection */}
//           <Form.Group controlId="taskPriority" className="mt-3">
//             <Form.Label>Priority</Form.Label>
//             <Form.Select
//               value={priority}
//               onChange={(e) => setPriority(e.target.value)}
//               id="taskPriority" // Added id
//             >
//               <option value="low">Low</option>
//               <option value="medium">Medium</option>
//               <option value="high">High</option>
//             </Form.Select>
//           </Form.Group>
//           {/* Category Input */}
//           <Form.Group controlId="taskCategory" className="mt-3">
//             <Form.Control
//               type="text"
//               placeholder="Category"
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               id="taskCategory" // Added id
//             />
//           </Form.Group>
//           {/* Task Status Selection */}
//           <Form.Group controlId="taskStatus" className="mt-3">
//             <Form.Label>Status</Form.Label>
//             <Form.Select
//               value={status}
//               onChange={(e) => setStatus(e.target.value)}
//               id="taskStatus" // Added id
//             >
//               <option value="Pending">Pending</option>
//               <option value="In Progress">In Progress</option>
//               <option value="Done">Done</option>
//             </Form.Select>
//           </Form.Group>
//           {/* Assigned Users Selection */}
//           <Form.Group controlId="assignedUsers" className="mt-3">
//             <Form.Label>Assigned Users:</Form.Label>
//             <Form.Select
//               multiple
//               value={assignedUsers}
//               onChange={handleAssignedUserChange}
//               id="assignedUsers" // Added id
//             >
//               {users.map((user) => (
//                 <option key={user.id} value={user.id}>
//                   {user.name}
//                 </option>
//               ))}
//             </Form.Select>
//           </Form.Group>
//           {/* File Upload Input */}
//           <Form.Group controlId="taskFiles" className="mt-3">
//             <Form.Label>Upload Files</Form.Label>
//             <Form.Control
//               type="file"
//               multiple
//               onChange={(e) => setFiles(Array.from(e.target.files))}
//               id="taskFiles" // Added id
//             />
//           </Form.Group>
//           {/* Action Buttons */}
//           <div className="d-flex justify-content-between mt-3">
//             <Button variant="primary" type="submit">
//               Create Task
//             </Button>
//             <Button
//               variant="outline-secondary"
//               type="button"
//               onClick={onCancel}
//             >
//               Cancel Creation
//             </Button>
//           </div>
//         </Form>
//       </Card>
//     </Container>
//   );
// };

// export default CreateTask;

// import React, { useState } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import styles from "../styles/Common.module.css";

// const CreateTask = ({ onSubmit }) => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [dueDate, setDueDate] = useState(new Date()); // Initialize with current date
//   const [priority, setPriority] = useState("medium");
//   const [category, setCategory] = useState("development");
//   const [status, setStatus] = useState("pending");
//   const [assignedUsers, setAssignedUsers] = useState([]); // Assuming an array of user IDs or names
//   const [files, setFiles] = useState([]); // State to hold selected files
//   const [successMessage, setSuccessMessage] = useState("");

//   const handleFileChange = (event) => {
//     // event.target.files is a FileList object, convert it to an array
//     setFiles(Array.from(event.target.files));
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
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     // Prepare the task data object
//     const taskData = {
//       title,
//       description,
//       dueDate, // Passing the Date object directly. Conversion to YYYY-MM-DD
//       // or ISO string should happen in the parent component's onSubmit handler
//       priority,
//       category,
//       status,
//       assignedUsers,
//       files, // Passing the array of File objects
//     };

//     // Call the onSubmit prop with the task data
//     onSubmit(taskData);

//     setSuccessMessage("Task submitted successfully!");

//     // Reset form and clear success message after a delay
//     setTimeout(() => {
//       resetForm();
//       setSuccessMessage("");
//     }, 3000); // Clear message after 3 seconds
//   };

//   return (
//     <div className="create-task-container">
//       <h2>Create New Task</h2>
//       {successMessage && (
//         <div className="success-message">{successMessage}</div>
//       )}
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="title">Title:</label>
//           <input
//             type="text"
//             id="title" // Added id
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="description">Description:</label>
//           <textarea
//             id="description" // Added id
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//           ></textarea>
//         </div>

//         <div className="form-group">
//           <label htmlFor="dueDate">Due Date:</label>
//           {/* react-datepicker handles date objects internally */}
//           <DatePicker
//             id="dueDate" // Added id
//             selected={dueDate}
//             onChange={(date) => setDueDate(date)}
//             dateFormat="yyyy/MM/dd" // Display format in the input
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="priority">Priority:</label>
//           <select
//             id="priority" // Added id
//             value={priority}
//             onChange={(e) => setPriority(e.target.value)}
//             required
//           >
//             <option value="low">Low</option>
//             <option value="medium">Medium</option>
//             <option value="high">High</option>
//           </select>
//         </div>

//         <div className="form-group">
//           <label htmlFor="category">Category:</label>
//           <select
//             id="category" // Added id
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             required
//           >
//             <option value="development">Development</option>
//             <option value="design">Design</option>
//             <option value="testing">Testing</option>
//             <option value="documentation">Documentation</option>
//             <option value="other">Other</option>
//           </select>
//         </div>

//         <div className="form-group">
//           <label htmlFor="status">Status:</label>
//           <select
//             id="status" // Added id
//             value={status}
//             onChange={(e) => setStatus(e.target.value)}
//             required
//           >
//             <option value="pending">To Do</option>
//             <option value="in-progress">In Progress</option>
//             <option value="done">Done</option>
//           </select>
//         </div>

//         {/* Example for assigned users - replace with a proper user selection component */}
//         <div className="form-group">
//           <label htmlFor="assignedUsers">
//             Assigned Users (comma separated):
//           </label>
//           <input
//             type="text"
//             id="assignedUsers" // Added id
//             value={assignedUsers.join(", ")} // Display as comma separated string
//             onChange={(e) =>
//               setAssignedUsers(
//                 e.target.value.split(",").map((user) => user.trim())
//               )
//             }
//             // Not required, as a task might not be assigned initially
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="files">Attach Files:</label>
//           <input
//             type="file"
//             id="files" // Added id
//             multiple // Allow multiple file selection
//             onChange={handleFileChange}
//           />
//           {files.length > 0 && (
//             <div className="file-list">
//               <p>Selected files:</p>
//               <ul>
//                 {files.map((file, index) => (
//                   <li key={index}>
//                     {file.name} ({Math.round(file.size / 1024)} KB)
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>

//         <button type="submit">Create Task</button>
//       </form>
//     </div>
//   );
// };

// export default CreateTask;

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import styles from "../styles/Common.module.css";

const CreateTask = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [priority, setPriority] = useState("medium");
  const [category, setCategory] = useState("development");
  const [status, setStatus] = useState("pending");
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [files, setFiles] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (event) => {
    setFiles(Array.from(event.target.files));
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
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setIsSubmitting(true);

    const taskData = {
      title,
      description,
      dueDate,
      priority,
      category,
      status,
      assignedUsers,
      files,
    };

    try {
      await onSubmit(taskData); // Expecting onSubmit to be async
      setSuccessMessage("Task submitted successfully!");
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

  return (
    <div className="create-task-container" style={{ marginTop: "100px" }}>
      <h2>Create New Task</h2>

      {successMessage && (
        <div
          className="success-message"
          style={{ color: "green", marginBottom: "1rem" }}
        >
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div
          className="error-message"
          style={{ color: "red", marginBottom: "1rem" }}
        >
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="dueDate">Due Date:</label>
          <DatePicker
            id="dueDate"
            selected={dueDate}
            onChange={(date) => setDueDate(date)}
            dateFormat="yyyy/MM/dd"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="priority">Priority:</label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            required
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="development">Development</option>
            <option value="design">Design</option>
            <option value="testing">Testing</option>
            <option value="documentation">Documentation</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="pending">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="assignedUsers">
            Assigned Users (comma separated):
          </label>
          <input
            type="text"
            id="assignedUsers"
            value={assignedUsers.join(", ")}
            onChange={(e) =>
              setAssignedUsers(
                e.target.value.split(",").map((user) => user.trim())
              )
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="files">Attach Files:</label>
          <input type="file" id="files" multiple onChange={handleFileChange} />
          {files.length > 0 && (
            <div className="file-list">
              <p>Selected files:</p>
              <ul>
                {files.map((file, index) => (
                  <li key={index}>
                    {file.name} ({Math.round(file.size / 1024)} KB)
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Create Task"}
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
