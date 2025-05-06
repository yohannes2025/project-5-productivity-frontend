// // // TaskList.js
// // import React, { useState } from "react";
// // import {
// //   Container,
// //   Row,
// //   Col,
// //   Form,
// //   Button,
// //   Card,
// //   Table,
// // } from "react-bootstrap";
// // import styles from "../styles/Common.module.css";
// // import clsx from "clsx";

// // const TaskList = () => {
// //   // State to manage the list of tasks, selected task, search text, filter options, and sort option
// //   const [tasks] = useState([]); // Example tasks array (to be populated)
// //   const [selectedTask, setSelectedTask] = useState(null); // Task currently selected for details
// //   const [searchText, setSearchText] = useState(""); // Text for searching tasks
// //   const [filterOptions, setFilterOptions] = useState({
// //     category: "",
// //     status: "",
// //     dueDate: "",
// //     assignedUsers: [],
// //   }); // Current filter options for tasks
// //   const [sortOption, setSortOption] = useState("dueDate"); // Current sorting option

// //   // Function to handle task selection
// //   const handleTaskClick = (task) => setSelectedTask(task);
// //   // Function to close the task details
// //   const closeTaskDetails = () => setSelectedTask(null);
// //   // Function to handle search input change
// //   const handleSearch = (e) => setSearchText(e.target.value);
// //   // Function to handle filter option changes
// //   const handleFilterChange = (option, value) => {
// //     setFilterOptions((prev) => ({ ...prev, [option]: value }));
// //   };
// //   // Function to handle sort option changes
// //   const handleSortChange = (option) => setSortOption(option);

// //   // Placeholder functions for task actions
// //   const markTaskComplete = (task) => console.log("Mark complete:", task);
// //   const editTask = (task) => console.log("Edit task:", task);

// //   return (
// //     <Container
// //       className={clsx(
// //         styles.container,
// //         "d-flex",
// //         "flex-column",
// //         "justify-content-center",
// //         "align-items-center"
// //       )}
// //     >
// //       <Card className="p-4 shadow w-100" style={{ maxWidth: "960px" }}>
// //         <h3 className="text-center mb-4">Your Task List</h3>
// //         {/* Search and Filter Controls */}
// //         <Form className="mb-4">
// //           <Row className="align-items-end g-3 justify-content-center">
// //             <Col md={4}>
// //               <Form.Group controlId="searchTasks">
// //                 <Form.Label>Search</Form.Label>
// //                 <Form.Control
// //                   type="text"
// //                   placeholder="Search tasks..."
// //                   value={searchText}
// //                   onChange={handleSearch} // Handle search input change
// //                 />
// //               </Form.Group>
// //             </Col>

// //             <Col md={4}>
// //               <Form.Group controlId="categoryFilter">
// //                 <Form.Label>Category</Form.Label>
// //                 <Form.Select
// //                   value={filterOptions.category}
// //                   onChange={
// //                     (e) => handleFilterChange("category", e.target.value) // Handle category filter change
// //                   }
// //                 >
// //                   <option value="">All</option>
// //                   {/* Additional category options can be added dynamically here */}
// //                 </Form.Select>
// //               </Form.Group>
// //             </Col>

// //             <Col md={4}>
// //               <Form.Group controlId="sortBy">
// //                 <Form.Label>Sort By</Form.Label>
// //                 <Form.Select
// //                   value={sortOption}
// //                   onChange={(e) => handleSortChange(e.target.value)} // Handle sort option change
// //                 >
// //                   <option value="dueDate">Due Date</option>
// //                   <option value="priority">Priority</option>
// //                 </Form.Select>
// //               </Form.Group>
// //             </Col>
// //           </Row>
// //         </Form>

// //         {/* Task Table */}
// //         <Table striped bordered hover responsive className="text-center">
// //           <thead>
// //             <tr>
// //               <th>Title</th>
// //               <th>Due Date</th>
// //               <th>Priority</th>
// //               <th>Status</th>
// //               <th>Assigned Users</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {tasks.length > 0 ? (
// //               tasks.map((task) => (
// //                 <tr
// //                   key={task.id} // Unique key for each task
// //                   onClick={() => handleTaskClick(task)} // Open task details on click
// //                   style={{ cursor: "pointer" }}
// //                 >
// //                   <td>{task.title}</td>
// //                   <td>{new Date(task.dueDate).toLocaleDateString()}</td>
// //                   <td>{task.priority}</td>
// //                   <td>{task.status}</td>
// //                   <td>{task.assignedUsers?.join(", ")}</td>
// //                 </tr>
// //               ))
// //             ) : (
// //               <tr>
// //                 <td colSpan="5" className="text-center">
// //                   No tasks available
// //                 </td>
// //               </tr>
// //             )}
// //           </tbody>
// //         </Table>
// //       </Card>

// //       {/* Task Details Popup */}
// //       {selectedTask && (
// //         <>
// //           <div
// //             className="position-fixed top-0 start-0 w-100 h-100"
// //             style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1040 }}
// //             onClick={closeTaskDetails} // Close details on backdrop click
// //           />
// //           <Card
// //             className="position-fixed top-50 start-50 translate-middle p-4 shadow"
// //             style={{ zIndex: 1050, width: "90%", maxWidth: "500px" }}
// //           >
// //             <h4>{selectedTask.title}</h4>
// //             <p>{selectedTask.description}</p>
// //             <p>Due: {new Date(selectedTask.dueDate).toLocaleDateString()}</p>
// //             <p>Category: {selectedTask.category}</p>
// //             <p>Priority: {selectedTask.priority}</p>
// //             <p>Status: {selectedTask.status}</p>

// //             <div className="d-flex justify-content-between mt-3">
// //               <Button
// //                 variant="success"
// //                 onClick={() => markTaskComplete(selectedTask)} // Mark task as complete
// //               >
// //                 Complete
// //               </Button>
// //               <Button variant="warning" onClick={() => editTask(selectedTask)}>
// //                 {" "}
// //                 {/* Edit task details */}
// //               </Button>
// //               <Button variant="secondary" onClick={closeTaskDetails}>
// //                 {" "}
// //                 {/* Close details */}
// //               </Button>
// //             </div>
// //           </Card>
// //         </>
// //       )}
// //     </Container>
// //   );
// // };

// // export default TaskList;

// // TaskList.js
// import React, { useState, useEffect, useMemo } from "react"; // Import useMemo
// import {
//   Container,
//   Row,
//   Col,
//   Form,
//   Button,
//   Card,
//   Table,
//   Spinner,
//   Alert,
// } from "react-bootstrap";
// import styles from "../styles/Common.module.css";
// import clsx from "clsx";
// import { Link } from "react-router-dom";
// import api from "../services/api"; // Assuming your api.js is correctly configured

// // Define the API endpoint (can be moved to api.js or config)
// const TASKS_API_ENDPOINT = "/api/tasks/";

// const TaskList = () => {
//   const [tasks, setTasks] = useState([]);
//   const [selectedTask, setSelectedTask] = useState(null);
//   const [searchText, setSearchText] = useState("");
//   const [filterOptions, setFilterOptions] = useState({
//     category: "",
//     status: "",
//     // dueDate: "", // Removed unused filter
//     // assignedUsers: [], // Removed unused filter
//   });
//   const [sortOption, setSortOption] = useState("due_date"); // Match backend field name
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // Placeholder for available categories - replace with fetching from API if needed
//   const availableCategories = [
//     "development",
//     "design",
//     "testing",
//     "documentation",
//     "other",
//   ];
//   // Placeholder for available statuses - replace with fetching from API if needed
//   const availableStatuses = ["pending", "in_progress", "done"];

//   // Fetch tasks from the API
//   useEffect(() => {
//     const fetchTasks = async () => {
//       setLoading(true);
//       setError("");
//       try {
//         // Assuming your api.js handles adding the token automatically
//         const response = await api.get(TASKS_API_ENDPOINT);
//         // Assuming the backend returns task objects directly in the response data
//         setTasks(response.data);
//       } catch (err) {
//         console.error("Failed to load tasks:", err);
//         // Access error details safely
//         setError(
//           err.response?.data?.detail || err.message || "Unable to load tasks."
//         );
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchTasks();
//   }, []); // Empty dependency array means this runs once on mount

//   // Memoize filtered and sorted tasks to avoid recalculation on every render
//   const filteredAndSortedTasks = useMemo(() => {
//     let filteredTasks = tasks;

//     // 1. Apply Search Text Filter
//     if (searchText) {
//       const lowerCaseSearchText = searchText.toLowerCase();
//       filteredTasks = filteredTasks.filter(
//         (task) =>
//           task.title.toLowerCase().includes(lowerCaseSearchText) ||
//           task.description.toLowerCase().includes(lowerCaseSearchText) ||
//           task.category.toLowerCase().includes(lowerCaseSearchText) ||
//           task.assigned_users?.some(
//             (
//               user // Assuming assigned_users is array of strings/user objects with name
//             ) => user.toLowerCase().includes(lowerCaseSearchText)
//           )
//       );
//     }

//     // 2. Apply Category Filter
//     if (filterOptions.category) {
//       filteredTasks = filteredTasks.filter(
//         (task) => task.category === filterOptions.category
//       );
//     }

//     // 3. Apply Status Filter
//     if (filterOptions.status) {
//       filteredTasks = filteredTasks.filter(
//         (task) => task.status === filterOptions.status
//       );
//     }

//     // 4. Apply Sorting
//     const sortedTasks = [...filteredTasks].sort((a, b) => {
//       if (sortOption === "due_date") {
//         // Compare dates
//         const dateA = new Date(a.due_date);
//         const dateB = new Date(b.due_date);
//         return dateA - dateB;
//       } else if (sortOption === "priority") {
//         // Define a priority order
//         const priorityOrder = { high: 3, medium: 2, low: 1 };
//         return priorityOrder[b.priority] - priorityOrder[a.priority];
//       }
//       return 0; // Default no sort
//     });

//     return sortedTasks;
//   }, [tasks, searchText, filterOptions, sortOption]); // Dependencies for memoization

//   const handleTaskClick = (task) => setSelectedTask(task);
//   const closeTaskDetails = () => setSelectedTask(null);
//   const handleSearch = (e) => setSearchText(e.target.value);
//   const handleFilterChange = (option, value) =>
//     setFilterOptions((prev) => ({ ...prev, [option]: value }));
//   const handleSortChange = (option) => setSortOption(option);

//   // Placeholder function for marking task complete
//   const markTaskComplete = async (task) => {
//     console.log("Attempting to mark complete:", task);
//     // Example API call to update status - replace with your actual endpoint and method
//     // try {
//     //   await api.put(`/api/tasks/${task.id}/complete`); // Or a generic update endpoint
//     //   // Refresh tasks or update state locally
//     //   const updatedTasks = tasks.map(t =>
//     //     t.id === task.id ? { ...t, status: 'done' } : t
//     //   );
//     //   setTasks(updatedTasks);
//     //   setSelectedTask(null); // Close details after action
//     //   console.log("Task marked complete successfully!");
//     // } catch (err) {
//     //   console.error("Failed to mark task complete:", err);
//     //   alert("Failed to mark task complete."); // Simple error feedback
//     // }
//   };

//   if (loading) {
//     return (
//       <Container className="text-center mt-5">
//         <Spinner animation="border" />
//         <p>Loading tasks...</p>
//       </Container>
//     );
//   }

//   if (error) {
//     return (
//       <Container className="mt-5">
//         <Alert variant="danger">{error}</Alert>
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
//         "align-items-center"
//       )}
//     >
//       <Card className="p-4 shadow w-100" style={{ maxWidth: "960px" }}>
//         <h3 className="text-center mb-4">Your Task List</h3>

//         {/* Search and Filter Controls */}
//         <Form className="mb-4">
//           <Row className="align-items-end g-3 justify-content-center">
//             <Col md={4}>
//               <Form.Group controlId="searchTasks">
//                 <Form.Label>Search</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Search tasks..."
//                   value={searchText}
//                   onChange={handleSearch}
//                 />
//               </Form.Group>
//             </Col>
//             <Col md={4}>
//               <Form.Group controlId="categoryFilter">
//                 <Form.Label>Category</Form.Label>
//                 <Form.Select
//                   value={filterOptions.category}
//                   onChange={(e) =>
//                     handleFilterChange("category", e.target.value)
//                   }
//                 >
//                   <option value="">All Categories</option>
//                   {availableCategories.map((category) => (
//                     <option key={category} value={category}>
//                       {category.charAt(0).toUpperCase() + category.slice(1)}{" "}
//                       {/* Capitalize */}
//                     </option>
//                   ))}
//                 </Form.Select>
//               </Form.Group>
//             </Col>
//             <Col md={4}>
//               <Form.Group controlId="statusFilter">
//                 <Form.Label>Status</Form.Label>
//                 <Form.Select
//                   value={filterOptions.status}
//                   onChange={(e) => handleFilterChange("status", e.target.value)}
//                 >
//                   <option value="">All Statuses</option>
//                   {availableStatuses.map((status) => (
//                     <option key={status} value={status}>
//                       {status
//                         .replace("_", " ")
//                         .split(" ")
//                         .map(
//                           (word) => word.charAt(0).toUpperCase() + word.slice(1)
//                         )
//                         .join(" ")}{" "}
//                       {/* Capitalize and replace underscore */}
//                     </option>
//                   ))}
//                 </Form.Select>
//               </Form.Group>
//             </Col>
//             <Col md={4}>
//               <Form.Group controlId="sortBy">
//                 <Form.Label>Sort By</Form.Label>
//                 <Form.Select
//                   value={sortOption}
//                   onChange={(e) => handleSortChange(e.target.value)}
//                 >
//                   <option value="due_date">Due Date</option>{" "}
//                   {/* Match backend field name */}
//                   <option value="priority">Priority</option>
//                 </Form.Select>
//               </Form.Group>
//             </Col>
//             {/* You could add columns for Date and Assigned Users filters here if needed */}
//           </Row>
//         </Form>

//         {/* Task Table */}
//         <Table striped bordered hover responsive className="text-center">
//           <thead>
//             <tr>
//               <th>Title</th>
//               <th>Due Date</th>
//               <th>Priority</th>
//               <th>Status</th>
//               <th>Assigned Users</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {/* Use filteredAndSortedTasks */}
//             {filteredAndSortedTasks.length > 0 ? (
//               filteredAndSortedTasks.map((task) => (
//                 <tr
//                   key={task.id}
//                   onClick={() => handleTaskClick(task)}
//                   style={{ cursor: "pointer" }}
//                 >
//                   {" "}
//                   {/* Make row clickable */}
//                   <td>{task.title}</td>
//                   <td>
//                     {task.due_date
//                       ? new Date(task.due_date).toLocaleDateString()
//                       : "No Due Date"}
//                   </td>{" "}
//                   {/* Handle potential missing due_date */}
//                   <td>{task.priority}</td>
//                   <td>{task.status}</td>
//                   <td>
//                     {/* Assuming assigned_users is an array of strings or objects with a property to display */}
//                     {task.assigned_users && Array.isArray(task.assigned_users)
//                       ? task.assigned_users
//                           .map((user) =>
//                             typeof user === "object" &&
//                             user !== null &&
//                             user.name
//                               ? user.name
//                               : user
//                           )
//                           .join(", ")
//                       : "Unassigned"}{" "}
//                     {/* Handle different structures */}
//                   </td>
//                   <td>
//                     {/* Using a Link component for navigation */}
//                     <Link to={`/edittask/${task.id}`}>
//                       <Button
//                         variant="outline-primary"
//                         size="sm"
//                         className="me-2"
//                       >
//                         Edit
//                       </Button>
//                     </Link>
//                     {/* Example button for mark complete - needs implementation */}
//                     <Button
//                       variant="outline-success"
//                       size="sm"
//                       onClick={(e) => {
//                         e.stopPropagation(); // Prevent row click when button is clicked
//                         markTaskComplete(task);
//                       }}
//                       disabled={task.status === "done"} // Disable if already done
//                     >
//                       Complete
//                     </Button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="6" className="text-center">
//                   {/* More specific message based on filtering */}
//                   {tasks.length > 0
//                     ? "No tasks match your criteria."
//                     : "No tasks available."}
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </Table>
//       </Card>

//       {/* Task Details Popup */}
//       {selectedTask && (
//         <>
//           {/* Overlay */}
//           <div
//             className="position-fixed top-0 start-0 w-100 h-100"
//             style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1040 }}
//             onClick={closeTaskDetails}
//           />
//           {/* Modal Card */}
//           <Card
//             className="position-fixed top-50 start-50 translate-middle p-4 shadow"
//             style={{ zIndex: 1050, width: "90%", maxWidth: "500px" }}
//           >
//             <h4>{selectedTask.title}</h4>
//             <p>{selectedTask.description}</p>
//             <p>
//               Due:{" "}
//               {selectedTask.due_date
//                 ? new Date(selectedTask.due_date).toLocaleDateString()
//                 : "No Due Date"}
//             </p>
//             <p>Category: {selectedTask.category}</p>
//             <p>Priority: {selectedTask.priority}</p>
//             <p>Status: {selectedTask.status}</p>
//             <p>
//               Assigned:{" "}
//               {selectedTask.assigned_users &&
//               Array.isArray(selectedTask.assigned_users)
//                 ? selectedTask.assigned_users
//                     .map((user) =>
//                       typeof user === "object" && user !== null && user.name
//                         ? user.name
//                         : user
//                     )
//                     .join(", ")
//                 : "Unassigned"}
//             </p>

//             <div className="d-flex justify-content-between mt-3">
//               <Button
//                 variant="success"
//                 onClick={() => markTaskComplete(selectedTask)}
//                 disabled={selectedTask.status === "done"} // Disable if already done
//               >
//                 Complete
//               </Button>
//               <Link to={`/edittask/${selectedTask.id}`}>
//                 <Button variant="warning">Edit</Button>
//               </Link>
//               <Button variant="secondary" onClick={closeTaskDetails}>
//                 Close
//               </Button>
//             </div>
//           </Card>
//         </>
//       )}
//     </Container>
//   );
// };

// export default TaskList;

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
