// // CreateTask.js
// import React, { useState } from "react"; // Import React and useState hook
// import DatePicker from "react-datepicker"; // Import DatePicker for date selection
// import "react-datepicker/dist/react-datepicker.css"; // Import DatePicker styles
// import { Container, Card, Form, Button } from "react-bootstrap"; // Import Bootstrap components
// import styles from "../styles/Common.module.css"; // Import custom styles
// import clsx from "clsx"; // Import clsx for conditional class names

// const CreateTask = ({ users = [], onSubmit, onCancel }) => {
//   // State variables for managing task properties
//   const [title, setTitle] = useState(""); // Task title
//   const [description, setDescription] = useState(""); // Task description
//   const [dueDate, setDueDate] = useState(new Date()); // Task due date initialized to current date
//   const [priority, setPriority] = useState("low"); // Task priority
//   const [category, setCategory] = useState(""); // Task category
//   const [assignedUsers, setAssignedUsers] = useState([]); // Users assigned to the task
//   const [files, setFiles] = useState([]); // Files to be uploaded

//   // Handle form submission
//   const handleSubmit = (event) => {
//     event.preventDefault(); // Prevent the default form behavior
//     onSubmit({
//       // Pass the form data to the onSubmit prop function
//       title,
//       description,
//       dueDate,
//       priority,
//       category,
//       assignedUsers,
//       files,
//     });
//   };

//   // Handle changes in assigned users selection
//   const handleAssignedUserChange = (e) => {
//     const options = e.target.options; // Get the options (users) from selected dropdown
//     const selected = []; // Initialize an array to store selected user ids
//     for (let i = 0; i < options.length; i++) {
//       // Loop through all options
//       if (options[i].selected) {
//         // Check if the option is selected
//         selected.push(options[i].value); // If selected, add to the array
//       }
//     }
//     setAssignedUsers(selected); // Update the state with the selected users
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
//         <h3 className="text-center mb-4">Create Task</h3>{" "}
//         {/* Header for the task creation form */}
//         <Form onSubmit={handleSubmit}>
//           {" "}
//           {/* Form element with submit handler */}
//           {/* Task Title Input */}
//           <Form.Group controlId="taskTitle">
//             <Form.Control
//               type="text"
//               placeholder="Task Title" // Placeholder for title input
//               value={title}
//               onChange={(e) => setTitle(e.target.value)} // Update title state on input change
//               required // Title is a required field
//             />
//           </Form.Group>
//           {/* Task Description Input */}
//           <Form.Group controlId="taskDescription" className="mt-3">
//             <Form.Control
//               as="textarea"
//               placeholder="Task Description" // Placeholder for description text area
//               value={description}
//               onChange={(e) => setDescription(e.target.value)} // Update description state on input change
//               rows={3}
//             />
//           </Form.Group>
//           {/* Due Date Picker */}
//           <Form.Group controlId="taskDueDate" className="mt-3">
//             <Form.Label>Due Date</Form.Label>
//             <DatePicker
//               selected={dueDate}
//               onChange={(date) => setDueDate(date)} // Update due date state on date selection
//               className="form-control"
//             />
//           </Form.Group>
//           {/* Priority Selection */}
//           <Form.Group controlId="taskPriority" className="mt-3">
//             <Form.Label>Priority</Form.Label>
//             <Form.Select
//               value={priority}
//               onChange={(e) => setPriority(e.target.value)} // Update priority state on selection
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
//               placeholder="Category" // Placeholder for category input
//               value={category}
//               onChange={(e) => setCategory(e.target.value)} // Update category state on input change
//             />
//           </Form.Group>
//           {/* Assigned Users Selection */}
//           <Form.Group controlId="assignedUsers" className="mt-3">
//             <Form.Label>Assigned Users:</Form.Label>
//             <Form.Select
//               multiple
//               value={assignedUsers}
//               onChange={handleAssignedUserChange} // Handle multi-select for assigned users
//             >
//               {users.map(
//                 (
//                   user // Map through users to create options
//                 ) => (
//                   <option key={user.id} value={user.id}>
//                     {user.name}
//                   </option>
//                 )
//               )}
//             </Form.Select>
//           </Form.Group>
//           {/* File Upload Input */}
//           <Form.Group controlId="taskFiles" className="mt-3">
//             <Form.Label>Upload Files</Form.Label>
//             <Form.Control
//               type="file"
//               multiple
//               onChange={(e) => setFiles(Array.from(e.target.files))} // Update files state with selected files
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
//               onClick={onCancel} // Cancel the creation and call the provided onCancel prop
//             >
//               Cancel Creation
//             </Button>
//           </div>
//         </Form>
//       </Card>
//     </Container>
//   );
// };

// export default CreateTask; // Export the CreateTask component

import React, { useState } from "react"; // Import React and useState hook
import DatePicker from "react-datepicker"; // Import DatePicker for date selection
import "react-datepicker/dist/react-datepicker.css"; // Import DatePicker styles
import { Container, Card, Form, Button } from "react-bootstrap"; // Import Bootstrap components
import styles from "../styles/Common.module.css"; // Import custom styles
import clsx from "clsx"; // Import clsx for conditional class names

const CreateTask = ({ users = [], onSubmit, onCancel }) => {
  // State variables for managing task properties
  const [title, setTitle] = useState(""); // Task title
  const [description, setDescription] = useState(""); // Task description
  const [dueDate, setDueDate] = useState(new Date()); // Task due date initialized to current date
  const [priority, setPriority] = useState("low"); // Task priority
  const [category, setCategory] = useState(""); // Task category
  const [assignedUsers, setAssignedUsers] = useState([]); // Users assigned to the task
  const [files, setFiles] = useState([]); // Files to be uploaded
  const [status, setStatus] = useState("Pending"); // Task status with initial value

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form behavior
    onSubmit({
      // Pass the form data to the onSubmit prop function
      title,
      description,
      dueDate,
      priority,
      category,
      assignedUsers,
      files,
      status, // Include status in the submitted form data
    });
  };

  // Handle changes in assigned users selection
  const handleAssignedUserChange = (e) => {
    const options = e.target.options; // Get the options (users) from selected dropdown
    const selected = []; // Initialize an array to store selected user ids
    for (let i = 0; i < options.length; i++) {
      // Loop through all options
      if (options[i].selected) {
        // Check if the option is selected
        selected.push(options[i].value); // If selected, add to the array
      }
    }
    setAssignedUsers(selected); // Update the state with the selected users
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
      <Card className="p-4 shadow" style={{ width: "100%", maxWidth: "600px" }}>
        <h3 className="text-center mb-4">Create Task</h3>{" "}
        {/* Header for the task creation form */}
        <Form onSubmit={handleSubmit}>
          {/* Task Title Input */}
          <Form.Group controlId="taskTitle">
            <Form.Control
              type="text"
              placeholder="Task Title" // Placeholder for title input
              value={title}
              onChange={(e) => setTitle(e.target.value)} // Update title state on input change
              required // Title is a required field
            />
          </Form.Group>
          {/* Task Description Input */}
          <Form.Group controlId="taskDescription" className="mt-3">
            <Form.Control
              as="textarea"
              placeholder="Task Description" // Placeholder for description text area
              value={description}
              onChange={(e) => setDescription(e.target.value)} // Update description state on input change
              rows={3}
            />
          </Form.Group>
          {/* Due Date Picker */}
          <Form.Group controlId="taskDueDate" className="mt-3">
            <Form.Label>Due Date</Form.Label>
            <DatePicker
              selected={dueDate}
              onChange={(date) => setDueDate(date)} // Update due date state on date selection
              className="form-control"
            />
          </Form.Group>
          {/* Priority Selection */}
          <Form.Group controlId="taskPriority" className="mt-3">
            <Form.Label>Priority</Form.Label>
            <Form.Select
              value={priority}
              onChange={(e) => setPriority(e.target.value)} // Update priority state on selection
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </Form.Select>
          </Form.Group>
          {/* Category Input */}
          <Form.Group controlId="taskCategory" className="mt-3">
            <Form.Control
              type="text"
              placeholder="Category" // Placeholder for category input
              value={category}
              onChange={(e) => setCategory(e.target.value)} // Update category state on input change
            />
          </Form.Group>
          {/* Task Status Selection */}
          <Form.Group controlId="taskStatus" className="mt-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={status}
              onChange={(e) => setStatus(e.target.value)} // Update status state on selection
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </Form.Select>
          </Form.Group>
          {/* Assigned Users Selection */}
          <Form.Group controlId="assignedUsers" className="mt-3">
            <Form.Label>Assigned Users:</Form.Label>
            <Form.Select
              multiple
              value={assignedUsers}
              onChange={handleAssignedUserChange} // Handle multi-select for assigned users
            >
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          {/* File Upload Input */}
          <Form.Group controlId="taskFiles" className="mt-3">
            <Form.Label>Upload Files</Form.Label>
            <Form.Control
              type="file"
              multiple
              onChange={(e) => setFiles(Array.from(e.target.files))} // Update files state with selected files
            />
          </Form.Group>
          {/* Action Buttons */}
          <div className="d-flex justify-content-between mt-3">
            <Button variant="primary" type="submit">
              Create Task
            </Button>
            <Button
              variant="outline-secondary"
              type="button"
              onClick={onCancel} // Cancel the creation and call the provided onCancel prop
            >
              Cancel Creation
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default CreateTask; // Export the CreateTask component
