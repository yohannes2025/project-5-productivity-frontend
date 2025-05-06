// TaskList.js
import React, { useState, useEffect, useMemo } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Table,
  Spinner,
  Alert,
} from "react-bootstrap";
import styles from "../styles/Common.module.css";
import clsx from "clsx";
import { Link } from "react-router-dom";
import api from "../services/api";

const TASKS_API_ENDPOINT = "/api/tasks/";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filterOptions, setFilterOptions] = useState({
    category: "",
    status: "",
  });
  const [sortOption, setSortOption] = useState("dueDate");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [completingTaskId, setCompletingTaskId] = useState(null);

  const availableCategories = [
    "development",
    "design",
    "testing",
    "documentation",
    "other",
  ];
  const availableStatuses = ["pending", "in_progress", "done"];

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await api.get(TASKS_API_ENDPOINT);
        setTasks(response.data);
      } catch (err) {
        console.error("Failed to load tasks:", err);
        setError(
          err.response?.data?.detail || err.message || "Unable to load tasks."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const filteredAndSortedTasks = useMemo(() => {
    let filteredTasks = tasks;

    if (searchText) {
      const lowerCaseSearchText = searchText.toLowerCase();
      filteredTasks = filteredTasks.filter(
        (task) =>
          task.title.toLowerCase().includes(lowerCaseSearchText) ||
          task.description.toLowerCase().includes(lowerCaseSearchText) ||
          task.category.toLowerCase().includes(lowerCaseSearchText) ||
          task.assigned_users?.some((user) =>
            (typeof user === "string" ? user : user?.name)
              ?.toLowerCase()
              .includes(lowerCaseSearchText)
          )
      );
    }

    if (filterOptions.category) {
      filteredTasks = filteredTasks.filter(
        (task) =>
          task.category.toLowerCase() === filterOptions.category.toLowerCase()
      );
    }

    if (filterOptions.status) {
      filteredTasks = filteredTasks.filter(
        (task) =>
          task.status.toLowerCase() === filterOptions.status.toLowerCase()
      );
    }

    const sortedTasks = [...filteredTasks].sort((a, b) => {
      if (sortOption === "dueDate") {
        const dateA = a.due_date ? new Date(a.due_date) : null;
        const dateB = b.due_date ? new Date(b.due_date) : null;
        if (dateA && dateB) return dateA - dateB;
        if (dateA) return -1;
        if (dateB) return 1;
        return 0;
      } else if (sortOption === "priority") {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return (
          (priorityOrder[b.priority?.toLowerCase()] || 0) -
          (priorityOrder[a.priority?.toLowerCase()] || 0)
        );
      }
      return 0;
    });

    return sortedTasks;
  }, [tasks, searchText, filterOptions, sortOption]);

  const handleTaskClick = (task) => setSelectedTask(task);
  const closeTaskDetails = () => setSelectedTask(null);
  const handleSearch = (e) => setSearchText(e.target.value);
  const handleFilterChange = (option, value) =>
    setFilterOptions((prev) => ({ ...prev, [option]: value }));
  const handleSortChange = (option) => setSortOption(option);

  const markTaskComplete = async (task) => {
    setCompletingTaskId(task.id);
    try {
      await api.patch(`/api/tasks/${task.id}`, { status: "done" });
      const updatedTasks = tasks.map((t) =>
        t.id === task.id ? { ...t, status: "done" } : t
      );
      setTasks(updatedTasks);
      setSelectedTask(null);
      console.log("Task marked complete successfully!");
    } catch (err) {
      console.error("Failed to mark task complete:", err);
      setError("Failed to mark task complete. Please try again.");
    } finally {
      setCompletingTaskId(null);
    }
  };

  return (
    <Container
      className={clsx(
        styles.container,
        "d-flex",
        "flex-column",
        "justify-content-center",
        "align-items-center"
      )}
    >
      <Card className="p-4 shadow w-100" style={{ maxWidth: "960px" }}>
        <h3 className="text-center mb-4">Your Task List</h3>

        <Form className="mb-4">
          <Row className="align-items-end g-3 justify-content-center">
            <Col md={4}>
              <Form.Group controlId="searchTasks">
                <Form.Label>Search</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Search tasks..."
                  value={searchText}
                  onChange={handleSearch}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="categoryFilter">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  value={filterOptions.category}
                  onChange={(e) =>
                    handleFilterChange("category", e.target.value)
                  }
                >
                  <option value="">All Categories</option>
                  {availableCategories.map((category) => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="statusFilter">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  value={filterOptions.status}
                  onChange={(e) => handleFilterChange("status", e.target.value)}
                >
                  <option value="">All Statuses</option>
                  {availableStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status
                        .replace("_", " ")
                        .split(" ")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="sortBy">
                <Form.Label>Sort By</Form.Label>
                <Form.Select
                  value={sortOption}
                  onChange={(e) => handleSortChange(e.target.value)}
                >
                  <option value="dueDate">Due Date</option>
                  <option value="priority">Priority</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Form>

        <Table striped bordered hover responsive className="text-center">
          <thead>
            <tr>
              <th>Title</th>
              <th>Due Date</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Assigned Users</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedTasks.length > 0 ? (
              filteredAndSortedTasks.map((task) => (
                <tr
                  key={task.id}
                  onClick={() => handleTaskClick(task)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{task.title}</td>
                  <td>
                    {task.due_date
                      ? new Date(task.due_date).toLocaleDateString()
                      : "No Due Date"}
                  </td>
                  <td>{task.priority}</td>
                  <td>{task.status}</td>
                  <td>
                    {task.assigned_users && Array.isArray(task.assigned_users)
                      ? task.assigned_users
                          .map((user) =>
                            typeof user === "object" &&
                            user !== null &&
                            user.name
                              ? user.name
                              : user
                          )
                          .join(", ")
                      : "Unassigned"}
                  </td>
                  <td>
                    <Link to={`/edittask/${task.id}`}>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="me-2"
                      >
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="outline-success"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        markTaskComplete(task);
                      }}
                      disabled={
                        task.status?.toLowerCase() === "done" ||
                        completingTaskId === task.id
                      }
                    >
                      {completingTaskId === task.id ? (
                        <Spinner size="sm" animation="border" />
                      ) : (
                        "Complete"
                      )}
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  {tasks.length > 0
                    ? "No tasks match your criteria."
                    : "No tasks available."}
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card>

      {selectedTask && (
        <>
          <div
            className="position-fixed top-0 start-0 w-100 h-100"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1040 }}
            onClick={closeTaskDetails}
          />
          <Card
            className="position-fixed top-50 start-50 translate-middle p-4 shadow"
            style={{ zIndex: 1050, width: "90%", maxWidth: "500px" }}
          >
            <h4>{selectedTask.title}</h4>
            <p>{selectedTask.description}</p>
            <p>
              Due:{" "}
              {selectedTask.due_date
                ? new Date(selectedTask.due_date).toLocaleDateString()
                : "No Due Date"}
            </p>
            <p>Category: {selectedTask.category}</p>
            <p>Priority: {selectedTask.priority}</p>
            <p>Status: {selectedTask.status}</p>
            <p>
              Assigned:{" "}
              {selectedTask.assigned_users &&
              Array.isArray(selectedTask.assigned_users)
                ? selectedTask.assigned_users
                    .map((user) =>
                      typeof user === "object" && user !== null && user.name
                        ? user.name
                        : user
                    )
                    .join(", ")
                : "Unassigned"}
            </p>

            <div className="d-flex justify-content-between mt-3">
              <Button
                variant="success"
                onClick={() => markTaskComplete(selectedTask)}
                disabled={
                  selectedTask.status?.toLowerCase() === "done" ||
                  completingTaskId === selectedTask?.id
                }
              >
                {completingTaskId === selectedTask?.id ? (
                  <Spinner size="sm" animation="border" />
                ) : (
                  "Complete"
                )}
              </Button>
              <Link to={`/edittask/${selectedTask.id}`}>
                <Button variant="warning">Edit</Button>
              </Link>
              <Button variant="secondary" onClick={closeTaskDetails}>
                Close
              </Button>
            </div>
          </Card>
        </>
      )}
      {error && (
        <div
          className="position-fixed bottom-0 end-0 p-3"
          style={{ zIndex: 1060 }}
        >
          <Alert variant="danger" onClose={() => setError("")} dismissible>
            {error}
          </Alert>
        </div>
      )}
    </Container>
  );
};

export default TaskList;
