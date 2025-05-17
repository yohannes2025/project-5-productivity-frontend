// src/components/EditTask.js
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Container, Card, Form, Button, Alert, Spinner } from "react-bootstrap";
import styles from "../styles/Common.module.css";
import clsx from "clsx";
import api from "../services/api";

const EditTask = ({ taskId, initialData, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [dueDate, setDueDate] = useState(() =>
    initialData?.dueDate ? new Date(initialData.dueDate) : new Date()
  );
  const [priority, setPriority] = useState(initialData?.priority || "medium");
  const [category, setCategory] = useState(
    initialData?.category || "development"
  );
  const [status, setStatus] = useState(initialData?.status || "pending");
  const [assignedUsers, setAssignedUsers] = useState(
    initialData?.assignedUsers || []
  );
  const [files, setFiles] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch user list on mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const res = await api.get("/api/users/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      await onSubmit(taskId, taskData);
      setSuccessMessage("Task updated successfully!");
      setTimeout(() => {
        setSuccessMessage("");
        if (onCancel) onCancel(); // Optionally close modal or go back
      }, 3000);
    } catch (error) {
      setErrorMessage(
        error?.response?.data?.detail ||
          error?.message ||
          "Failed to update task."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
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
        <h3 className="text-center mb-4">Edit Task</h3>

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
              selected={
                dueDate && dueDate instanceof Date && !isNaN(dueDate.getTime())
                  ? dueDate
                  : new Date()
              }
              onChange={(date) => setDueDate(date)}
              className="form-control"
              dateFormat="yyyy-MM-dd"
              minDate={new Date()}
              openToDate={
                dueDate && dueDate instanceof Date && !isNaN(dueDate.getTime())
                  ? dueDate
                  : new Date()
              }
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
          </Form.Group>

          <Form.Group controlId="taskFiles" className="mt-3">
            <Form.Label>Upload New Files (Optional)</Form.Label>
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
              {isSubmitting ? "Updating..." : "Update Task"}
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

export default EditTask;
