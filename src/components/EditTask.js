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
