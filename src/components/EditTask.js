// EditTask.js
import React, { useState } from "react"; // Import React and useState hook
import DatePicker from "react-datepicker"; // Import DatePicker for date selection
import "react-datepicker/dist/react-datepicker.css"; // Import DatePicker styles
import { Container, Card, Form, Button } from "react-bootstrap"; // Import Bootstrap components
import styles from "../styles/Common.module.css"; // Import custom styles
import clsx from "clsx"; // Import clsx for conditional class names

const EditTask = ({ task, users = [], onSubmit, onCancel }) => {
  // Define state variables for the task properties
  const [title, setTitle] = useState(task?.title || ""); // Initialize title
  const [description, setDescription] = useState(task?.description || ""); // Initialize description
  const [dueDate, setDueDate] = useState(
    task?.dueDate ? new Date(task.dueDate) : new Date() // Initialize due date
  );
  const [priority, setPriority] = useState(task?.priority || "low"); // Initialize priority
  const [category, setCategory] = useState(task?.category || ""); // Initialize category
  const [status, setStatus] = useState("Pending"); // Task status with initial value
  const [assignedUsers, setAssignedUsers] = useState(task?.assignedUsers || []); // Initialize assigned users
  const [files, setFiles] = useState([]); // Initialize files

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    onSubmit({
      // Call the onSubmit function passing the updated task details
      ...task,
      title,
      description,
      dueDate,
      priority,
      category,
      status,
      assignedUsers,
      files,
    });
  };

  // Handle changes in assigned users selection
  const handleAssignedUserChange = (e) => {
    const options = e.target.options; // Get selected options
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      // Collect selected user IDs
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setAssignedUsers(selected); // Update the assigned users state
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
        <h3 className="text-center mb-4">Edit Task</h3>{" "}
        {/* Header for the Edit Task form */}
        <Form onSubmit={handleSubmit}>
          {" "}
          {/* Form submit handler */}
          {/* Task Title Input */}
          <Form.Group controlId="taskTitle">
            <Form.Control
              type="text"
              placeholder="Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)} // Update title state
              required
            />
          </Form.Group>
          {/* Task Description Input */}
          <Form.Group controlId="taskDescription" className="mt-3">
            <Form.Control
              as="textarea"
              placeholder="Task Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)} // Update description state
              rows={3}
            />
          </Form.Group>
          {/* Due Date Picker */}
          <Form.Group controlId="taskDueDate" className="mt-3">
            <Form.Label>Due Date</Form.Label>
            <DatePicker
              selected={dueDate}
              onChange={(date) => setDueDate(date)} // Update due date state
              className="form-control"
            />
          </Form.Group>
          {/* Priority Selection */}
          <Form.Group controlId="taskPriority" className="mt-3">
            <Form.Label>Priority</Form.Label>
            <Form.Select
              value={priority}
              onChange={(e) => setPriority(e.target.value)} // Update priority state
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
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)} // Update category state
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
              Edit Task
            </Button>
            <Button
              variant="outline-secondary"
              type="button"
              onClick={onCancel} // Cancel the edit and call provided onCancel prop
            >
              Cancel Edit
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default EditTask; // Export the EditTask component
