//CreateTask.js
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Container, Card, Form, Button, Alert } from "react-bootstrap"; // Added Alert for success message
import styles from "../styles/Common.module.css";
import clsx from "clsx";

const CreateTask = ({ users = [], onSubmit, onCancel }) => {
  // State variables for task properties
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [priority, setPriority] = useState("low");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("Pending");
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [files, setFiles] = useState([]);
  const [successMessage, setSuccessMessage] = useState(""); // State for success message

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form behavior

    // Call the onSubmit prop with the task data
    onSubmit({
      title,
      description,
      dueDate,
      priority,
      category,
      status,
      assignedUsers,
      files,
    });

    setSuccessMessage("Task submitted successfully!");

    // Delay reset so message can appear first
    setTimeout(() => {
      resetForm();
      setSuccessMessage(""); // optional: auto clear after reset
    }, 3000); // 3 seconds delay
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDueDate(new Date());
    setPriority("low");
    setCategory("");
    setStatus("Pending");
    setAssignedUsers([]);
    setFiles([]);
    setSuccessMessage(""); // Clear success message
  };

  // Handle changes to the assigned users selection
  const handleAssignedUserChange = (e) => {
    const options = e.target.options;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setAssignedUsers(selected);
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
        <h3 className="text-center mb-4">Create Task</h3>

        {successMessage && ( // Conditionally render the success message
          <Alert variant="success">{successMessage}</Alert>
        )}

        <Form onSubmit={handleSubmit}>
          {/* Task Title Input */}
          <Form.Group controlId="taskTitle">
            <Form.Control
              type="text"
              placeholder="Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>
          {/* Task Description Input */}
          <Form.Group controlId="taskDescription" className="mt-3">
            <Form.Control
              as="textarea"
              placeholder="Task Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </Form.Group>
          {/* Due Date Picker */}
          <Form.Group controlId="taskDueDate" className="mt-3">
            <Form.Label>Due Date</Form.Label>
            <DatePicker
              selected={dueDate}
              onChange={(date) => setDueDate(date)}
              className="form-control"
            />
          </Form.Group>
          {/* Priority Selection */}
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
          {/* Category Input */}
          <Form.Group controlId="taskCategory" className="mt-3">
            <Form.Control
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </Form.Group>
          {/* Task Status Selection */}
          <Form.Group controlId="taskStatus" className="mt-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
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
              onChange={handleAssignedUserChange}
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
              onChange={(e) => setFiles(Array.from(e.target.files))}
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
              onClick={onCancel}
            >
              Cancel Creation
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default CreateTask;
