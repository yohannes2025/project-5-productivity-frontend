// TaskList.js
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Table,
} from "react-bootstrap";
import styles from "../styles/Common.module.css";
import clsx from "clsx";

const TaskList = () => {
  // State to manage the list of tasks, selected task, search text, filter options, and sort option
  const [tasks] = useState([]); // Example tasks array (to be populated)
  const [selectedTask, setSelectedTask] = useState(null); // Task currently selected for details
  const [searchText, setSearchText] = useState(""); // Text for searching tasks
  const [filterOptions, setFilterOptions] = useState({
    category: "",
    status: "",
    dueDate: "",
    assignedUsers: [],
  }); // Current filter options for tasks
  const [sortOption, setSortOption] = useState("dueDate"); // Current sorting option

  // Function to handle task selection
  const handleTaskClick = (task) => setSelectedTask(task);
  // Function to close the task details
  const closeTaskDetails = () => setSelectedTask(null);
  // Function to handle search input change
  const handleSearch = (e) => setSearchText(e.target.value);
  // Function to handle filter option changes
  const handleFilterChange = (option, value) => {
    setFilterOptions((prev) => ({ ...prev, [option]: value }));
  };
  // Function to handle sort option changes
  const handleSortChange = (option) => setSortOption(option);

  // Placeholder functions for task actions
  const markTaskComplete = (task) => console.log("Mark complete:", task);
  const editTask = (task) => console.log("Edit task:", task);

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
        {/* Search and Filter Controls */}
        <Form className="mb-4">
          <Row className="align-items-end g-3 justify-content-center">
            <Col md={4}>
              <Form.Group controlId="searchTasks">
                <Form.Label>Search</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Search tasks..."
                  value={searchText}
                  onChange={handleSearch} // Handle search input change
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group controlId="categoryFilter">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  value={filterOptions.category}
                  onChange={
                    (e) => handleFilterChange("category", e.target.value) // Handle category filter change
                  }
                >
                  <option value="">All</option>
                  {/* Additional category options can be added dynamically here */}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group controlId="sortBy">
                <Form.Label>Sort By</Form.Label>
                <Form.Select
                  value={sortOption}
                  onChange={(e) => handleSortChange(e.target.value)} // Handle sort option change
                >
                  <option value="dueDate">Due Date</option>
                  <option value="priority">Priority</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Form>

        {/* Task Table */}
        <Table striped bordered hover responsive className="text-center">
          <thead>
            <tr>
              <th>Title</th>
              <th>Due Date</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Assigned Users</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <tr
                  key={task.id} // Unique key for each task
                  onClick={() => handleTaskClick(task)} // Open task details on click
                  style={{ cursor: "pointer" }}
                >
                  <td>{task.title}</td>
                  <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                  <td>{task.priority}</td>
                  <td>{task.status}</td>
                  <td>{task.assignedUsers?.join(", ")}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No tasks available
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card>

      {/* Task Details Popup */}
      {selectedTask && (
        <>
          <div
            className="position-fixed top-0 start-0 w-100 h-100"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1040 }}
            onClick={closeTaskDetails} // Close details on backdrop click
          />
          <Card
            className="position-fixed top-50 start-50 translate-middle p-4 shadow"
            style={{ zIndex: 1050, width: "90%", maxWidth: "500px" }}
          >
            <h4>{selectedTask.title}</h4>
            <p>{selectedTask.description}</p>
            <p>Due: {new Date(selectedTask.dueDate).toLocaleDateString()}</p>
            <p>Category: {selectedTask.category}</p>
            <p>Priority: {selectedTask.priority}</p>
            <p>Status: {selectedTask.status}</p>

            <div className="d-flex justify-content-between mt-3">
              <Button
                variant="success"
                onClick={() => markTaskComplete(selectedTask)} // Mark task as complete
              >
                Complete
              </Button>
              <Button variant="warning" onClick={() => editTask(selectedTask)}>
                {" "}
                {/* Edit task details */}
              </Button>
              <Button variant="secondary" onClick={closeTaskDetails}>
                {" "}
                {/* Close details */}
              </Button>
            </div>
          </Card>
        </>
      )}
    </Container>
  );
};

export default TaskList;
