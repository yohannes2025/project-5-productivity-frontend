// // TaskList.js
// import React, { useState, useEffect, useMemo } from "react";
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
//   Modal, // Import Modal for confirmation
// } from "react-bootstrap";
// import styles from "../styles/Common.module.css";
// import clsx from "clsx";
// import { Link } from "react-router-dom";
// import api from "../services/api"; // Assuming your api service handles auth headers

// const TASKS_API_ENDPOINT = "/api/tasks/";

// const TaskList = () => {
//   const [tasks, setTasks] = useState([]);
//   const [selectedTask, setSelectedTask] = useState(null);
//   const [searchText, setSearchText] = useState("");
//   const [filterOptions, setFilterOptions] = useState({
//     category: "",
//     status: "",
//   });
//   const [sortOption, setSortOption] = useState("dueDate");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [completingTaskId, setCompletingTaskId] = useState(null);
//   const [deletingTaskId, setDeletingTaskId] = useState(null); // State for task being deleted
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // State for delete confirmation modal
//   const [taskToDelete, setTaskToDelete] = useState(null); // State to hold the task to be deleted

//   const availableCategories = [
//     "development",
//     "design",
//     "testing",
//     "documentation",
//     "other",
//   ];
//   const availableStatuses = ["pending", "in_progress", "done"];

//   useEffect(() => {
//     const fetchTasks = async () => {
//       setLoading(true);
//       setError("");
//       try {
//         const response = await api.get(TASKS_API_ENDPOINT);
//         setTasks(response.data);
//       } catch (err) {
//         console.error("Failed to load tasks:", err);
//         setError(
//           err.response?.data?.detail || err.message || "Unable to load tasks."
//         );
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchTasks();
//   }, []);

//   const filteredAndSortedTasks = useMemo(() => {
//     let filteredTasks = tasks;

//     if (searchText) {
//       const lowerCaseSearchText = searchText.toLowerCase();
//       filteredTasks = filteredTasks.filter(
//         (task) =>
//           task.title.toLowerCase().includes(lowerCaseSearchText) ||
//           task.description.toLowerCase().includes(lowerCaseSearchText) ||
//           task.category.toLowerCase().includes(lowerCaseSearchText) ||
//           task.assigned_users?.some((user) =>
//             // Handle both object (with name) and plain ID scenarios
//             typeof user === "object" && user !== null && user.name
//               ? user.name.toLowerCase().includes(lowerCaseSearchText)
//               : typeof user === "string" || typeof user === "number" // Also check if it's just an ID
//               ? String(user).toLowerCase().includes(lowerCaseSearchText)
//               : false
//           )
//       );
//     }

//     if (filterOptions.category) {
//       filteredTasks = filteredTasks.filter(
//         (task) =>
//           task.category.toLowerCase() === filterOptions.category.toLowerCase()
//       );
//     }

//     if (filterOptions.status) {
//       filteredTasks = filteredTasks.filter(
//         (task) =>
//           task.status.toLowerCase() === filterOptions.status.toLowerCase()
//       );
//     }

//     const sortedTasks = [...filteredTasks].sort((a, b) => {
//       if (sortOption === "dueDate") {
//         const dateA = a.due_date ? new Date(a.due_date) : null;
//         const dateB = b.due_date ? new Date(b.due_date) : null;
//         if (dateA && dateB) return dateA - dateB;
//         if (dateA) return -1; // Tasks with due dates come first
//         if (dateB) return 1; // Tasks with due dates come first
//         return 0; // Both null or invalid dates
//       } else if (sortOption === "priority") {
//         const priorityOrder = { high: 3, medium: 2, low: 1 };
//         // Handle cases where priority might be missing or unexpected
//         const priorityA = priorityOrder[a.priority?.toLowerCase()] || 0;
//         const priorityB = priorityOrder[b.priority?.toLowerCase()] || 0;
//         return priorityB - priorityA; // High to Low
//       }
//       return 0;
//     });

//     return sortedTasks;
//   }, [tasks, searchText, filterOptions, sortOption]);

//   const handleTaskClick = (task) => setSelectedTask(task);
//   const closeTaskDetails = () => setSelectedTask(null);
//   const handleSearch = (e) => setSearchText(e.target.value);
//   const handleFilterChange = (option, value) =>
//     setFilterOptions((prev) => ({ ...prev, [option]: value }));
//   const handleSortChange = (option) => setSortOption(option);

//   const markTaskComplete = async (task) => {
//     setCompletingTaskId(task.id);
//     try {
//       await api.patch(`/api/tasks/${task.id}/`, { status: "done" }); // Added trailing slash
//       const updatedTasks = tasks.map((t) =>
//         t.id === task.id ? { ...t, status: "done" } : t
//       );
//       setTasks(updatedTasks);
//       // If the completed task is the selected task, update the selected task
//       if (selectedTask && selectedTask.id === task.id) {
//         setSelectedTask((prevSelected) => ({
//           ...prevSelected,
//           status: "done",
//         }));
//       }
//       console.log("Task marked complete successfully!");
//     } catch (err) {
//       console.error("Failed to mark task complete:", err);
//       setError("Failed to mark task complete. Please try again.");
//     } finally {
//       setCompletingTaskId(null);
//     }
//   };

//   // Function to initiate the delete process (show confirmation modal)
//   const handleDeleteClick = (task, event) => {
//     // Prevent the row click event from firing
//     event.stopPropagation();
//     setTaskToDelete(task);
//     setShowDeleteConfirm(true);
//   };

//   // Function to handle the actual deletion after confirmation
//   const confirmDelete = async () => {
//     if (!taskToDelete) return;

//     setDeletingTaskId(taskToDelete.id);
//     setShowDeleteConfirm(false); // Close the modal
//     setError(""); // Clear previous errors

//     try {
//       await api.delete(`/api/tasks/${taskToDelete.id}/`); // Added trailing slash
//       // Remove the deleted task from the state
//       setTasks(tasks.filter((task) => task.id !== taskToDelete.id));
//       // If the deleted task was the selected one, close the details view
//       if (selectedTask && selectedTask.id === taskToDelete.id) {
//         setSelectedTask(null);
//       }
//       console.log(`Task ${taskToDelete.id} deleted successfully!`);
//     } catch (err) {
//       console.error("Failed to delete task:", err);
//       setError(
//         err.response?.data?.detail ||
//           err.message ||
//           "Failed to delete task. Please try again."
//       );
//     } finally {
//       setDeletingTaskId(null);
//       setTaskToDelete(null); // Clear the task to delete state
//     }
//   };

//   // Function to close the delete confirmation modal
//   const cancelDelete = () => {
//     setShowDeleteConfirm(false);
//     setTaskToDelete(null);
//   };

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
//                       {category.charAt(0).toUpperCase() + category.slice(1)}
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
//                         .join(" ")}
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
//                   <option value="dueDate">Due Date</option>
//                   <option value="priority">Priority</option>
//                 </Form.Select>
//               </Form.Group>
//             </Col>
//           </Row>
//         </Form>

//         {loading ? (
//           <div className="text-center">
//             <Spinner animation="border" role="status">
//               <span className="visually-hidden">Loading Tasks...</span>
//             </Spinner>
//           </div>
//         ) : error ? (
//           <Alert variant="danger">{error}</Alert>
//         ) : (
//           <Table striped bordered hover responsive className="text-center">
//             <thead>
//               <tr>
//                 <th>Title</th>
//                 <th>Due Date</th>
//                 <th>Priority</th>
//                 <th>Status</th>
//                 <th>Assigned Users</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredAndSortedTasks.length > 0 ? (
//                 filteredAndSortedTasks.map((task) => (
//                   <tr
//                     key={task.id}
//                     onClick={() => handleTaskClick(task)}
//                     style={{ cursor: "pointer" }}
//                   >
//                     <td>{task.title}</td>
//                     <td>
//                       {task.due_date
//                         ? new Date(task.due_date).toLocaleDateString()
//                         : "No Due Date"}
//                     </td>
//                     <td>{task.priority}</td>
//                     <td>{task.status}</td>
//                     <td>
//                       {task.assigned_users && Array.isArray(task.assigned_users)
//                         ? task.assigned_users
//                             .map((user) =>
//                               // Handle both object (with name) and plain ID scenarios
//                               typeof user === "object" &&
//                               user !== null &&
//                               user.name
//                                 ? user.name
//                                 : user
//                             )
//                             .join(", ")
//                         : "Unassigned"}
//                     </td>
//                     <td>
//                       {/* Edit Button */}
//                       <Link to={`/edittask/${task.id}`}>
//                         <Button
//                           variant="outline-primary"
//                           size="sm"
//                           className="me-2"
//                           onClick={(e) => e.stopPropagation()} // Prevent row click
//                         >
//                           Edit
//                         </Button>
//                       </Link>
//                       {/* Complete Button */}
//                       <Button
//                         variant="outline-success"
//                         size="sm"
//                         className="me-2" // Added margin
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           markTaskComplete(task);
//                         }}
//                         disabled={
//                           task.status?.toLowerCase() === "done" ||
//                           completingTaskId === task.id
//                         }
//                       >
//                         {completingTaskId === task.id ? (
//                           <Spinner size="sm" animation="border" />
//                         ) : (
//                           "Complete"
//                         )}
//                       </Button>
//                       {/* Delete Button */}
//                       <Button
//                         variant="outline-danger"
//                         size="sm"
//                         onClick={(e) => handleDeleteClick(task, e)} // Pass event to prevent row click
//                         disabled={deletingTaskId === task.id}
//                       >
//                         {deletingTaskId === task.id ? (
//                           <Spinner size="sm" animation="border" />
//                         ) : (
//                           "Delete"
//                         )}
//                       </Button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="6" className="text-center">
//                     {tasks.length > 0
//                       ? "No tasks match your criteria."
//                       : "No tasks available."}
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </Table>
//         )}
//       </Card>

//       {/* Task Details Modal (using Card for styling) */}
//       {selectedTask && (
//         <>
//           <div
//             className="position-fixed top-0 start-0 w-100 h-100"
//             style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1040 }}
//             onClick={closeTaskDetails}
//           />
//           <Card
//             className="position-fixed top-50 start-50 translate-middle p-4 shadow"
//             style={{ zIndex: 1050, width: "90%", maxWidth: "500px" }}
//           >
//             <h4>{selectedTask.title}</h4>
//             <p>
//               <strong>Description:</strong> {selectedTask.description}
//             </p>
//             <p>
//               <strong>Due:</strong>{" "}
//               {selectedTask.due_date
//                 ? new Date(selectedTask.due_date).toLocaleDateString()
//                 : "No Due Date"}
//             </p>
//             <p>
//               <strong>Category:</strong> {selectedTask.category}
//             </p>
//             <p>
//               <strong>Priority:</strong> {selectedTask.priority}
//             </p>
//             <p>
//               <strong>Status:</strong> {selectedTask.status}
//             </p>
//             <p>
//               <strong>Assigned:</strong>{" "}
//               {selectedTask.assigned_users &&
//               Array.isArray(selectedTask.assigned_users)
//                 ? selectedTask.assigned_users
//                     .map((user) =>
//                       // Handle both object (with name) and plain ID scenarios
//                       typeof user === "object" && user !== null && user.name
//                         ? user.name
//                         : user
//                     )
//                     .join(", ")
//                 : "Unassigned"}
//             </p>

//             {/* Display files if any */}
//             {selectedTask.upload_files &&
//               selectedTask.upload_files.length > 0 && (
//                 <div className="mt-3">
//                   <strong>Attached Files:</strong>
//                   <ul>
//                     {selectedTask.upload_files.map((file) => (
//                       <li key={file.id}>
//                         <a
//                           href={file.file}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                         >
//                           {file.file.split("/").pop()} {/* Display filename */}
//                         </a>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}

//             <div className="d-flex justify-content-between mt-3">
//               <Button
//                 variant="success"
//                 onClick={() => markTaskComplete(selectedTask)}
//                 disabled={
//                   selectedTask.status?.toLowerCase() === "done" ||
//                   completingTaskId === selectedTask?.id
//                 }
//               >
//                 {completingTaskId === selectedTask?.id ? (
//                   <Spinner size="sm" animation="border" />
//                 ) : (
//                   "Complete"
//                 )}
//               </Button>
//               <Link to={`/edittask/${selectedTask.id}`}>
//                 <Button variant="warning">Edit</Button>
//               </Link>
//               {/* Delete Button in Modal */}
//               <Button
//                 variant="danger"
//                 onClick={(e) => handleDeleteClick(selectedTask, e)} // Use handleDeleteClick
//                 disabled={deletingTaskId === selectedTask?.id}
//               >
//                 {deletingTaskId === selectedTask?.id ? (
//                   <Spinner size="sm" animation="border" />
//                 ) : (
//                   "Delete"
//                 )}
//               </Button>
//               <Button variant="secondary" onClick={closeTaskDetails}>
//                 Close
//               </Button>
//             </div>
//           </Card>
//         </>
//       )}

//       {/* Delete Confirmation Modal */}
//       <Modal show={showDeleteConfirm} onHide={cancelDelete}>
//         <Modal.Header closeButton>
//           <Modal.Title>Confirm Deletion</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           Are you sure you want to delete the task "{taskToDelete?.title}"?
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={cancelDelete}>
//             Cancel
//           </Button>
//           <Button
//             variant="danger"
//             onClick={confirmDelete}
//             disabled={deletingTaskId !== null}
//           >
//             {deletingTaskId === taskToDelete?.id ? (
//               <Spinner size="sm" animation="border" />
//             ) : (
//               "Delete"
//             )}
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {/* Error Alert */}
//       {error && (
//         <div
//           className="position-fixed bottom-0 end-0 p-3"
//           style={{ zIndex: 1060 }}
//         >
//           <Alert variant="danger" onClose={() => setError("")} dismissible>
//             {error}
//           </Alert>
//         </div>
//       )}
//     </Container>
//   );
// };

// export default TaskList;

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
  Modal, // Import Modal for confirmation
} from "react-bootstrap";
import styles from "../styles/Common.module.css";
import clsx from "clsx";
// Import useNavigate from react-router-dom
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api"; // Assuming your api service handles auth headers

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
  const [deletingTaskId, setDeletingTaskId] = useState(null); // State for task being deleted
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // State for delete confirmation modal
  const [taskToDelete, setTaskToDelete] = useState(null); // State to hold the task to be deleted

  // Initialize useNavigate hook
  const navigate = useNavigate();

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
            // Handle both object (with name) and plain ID scenarios
            typeof user === "object" && user !== null && user.name
              ? user.name.toLowerCase().includes(lowerCaseSearchText)
              : typeof user === "string" || typeof user === "number" // Also check if it's just an ID
              ? String(user).toLowerCase().includes(lowerCaseSearchText)
              : false
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
        if (dateA) return -1; // Tasks with due dates come first
        if (dateB) return 1; // Tasks with due dates come first
        return 0; // Both null or invalid dates
      } else if (sortOption === "priority") {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        // Handle cases where priority might be missing or unexpected
        const priorityA = priorityOrder[a.priority?.toLowerCase()] || 0;
        const priorityB = priorityOrder[b.priority?.toLowerCase()] || 0;
        return priorityB - priorityA; // High to Low
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
      await api.patch(`/api/tasks/${task.id}/`, { status: "done" }); // Added trailing slash
      const updatedTasks = tasks.map((t) =>
        t.id === task.id ? { ...t, status: "done" } : t
      );
      setTasks(updatedTasks);
      // If the completed task is the selected task, update the selected task
      if (selectedTask && selectedTask.id === task.id) {
        setSelectedTask((prevSelected) => ({
          ...prevSelected,
          status: "done",
        }));
      }
      console.log("Task marked complete successfully!");
    } catch (err) {
      console.error("Failed to mark task complete:", err);
      setError("Failed to mark task complete. Please try again.");
    } finally {
      setCompletingTaskId(null);
    }
  };

  // Function to initiate the delete process (show confirmation modal)
  const handleDeleteClick = (task, event) => {
    // Prevent the row click event from firing
    event.stopPropagation();
    setTaskToDelete(task);
    setShowDeleteConfirm(true);
  };

  // Function to handle the actual deletion after confirmation
  const confirmDelete = async () => {
    if (!taskToDelete) return;

    setDeletingTaskId(taskToDelete.id);
    setShowDeleteConfirm(false); // Close the modal
    setError(""); // Clear previous errors

    try {
      await api.delete(`/api/tasks/${taskToDelete.id}/`); // Added trailing slash
      // Remove the deleted task from the state
      setTasks(tasks.filter((task) => task.id !== taskToDelete.id));
      // If the deleted task was the selected one, close the details view
      if (selectedTask && selectedTask.id === taskToDelete.id) {
        setSelectedTask(null);
      }
      console.log(`Task ${taskToDelete.id} deleted successfully!`);
    } catch (err) {
      console.error("Failed to delete task:", err);
      setError(
        err.response?.data?.detail ||
          err.message ||
          "Failed to delete task. Please try again."
      );
    } finally {
      setDeletingTaskId(null);
      setTaskToDelete(null); // Clear the task to delete state
    }
  };

  // Function to close the delete confirmation modal
  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setTaskToDelete(null);
  };

  // Function to handle the Edit button click in the modal
  const handleEditClick = (taskId, event) => {
    // Prevent the click event from propagating to the modal's background (which would close it)
    event.stopPropagation();
    // Close the task details modal
    closeTaskDetails();
    // Navigate to the edit task page
    navigate(`/edittask/${taskId}`);
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

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading Tasks...</span>
            </Spinner>
          </div>
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : (
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
                              // Handle both object (with name) and plain ID scenarios
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
                      {/* Edit Button (Table Row) */}
                      <Link
                        to={`/edittask/${task.id}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="me-2"
                        >
                          Edit
                        </Button>
                      </Link>
                      {/* Complete Button */}
                      <Button
                        variant="outline-success"
                        size="sm"
                        className="me-2" // Added margin
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
                      {/* Delete Button */}
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={(e) => handleDeleteClick(task, e)} // Pass event to prevent row click
                        disabled={deletingTaskId === task.id}
                      >
                        {deletingTaskId === task.id ? (
                          <Spinner size="sm" animation="border" />
                        ) : (
                          "Delete"
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
        )}
      </Card>

      {/* Task Details Modal (using Card for styling) */}
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
            <p>
              <strong>Description:</strong> {selectedTask.description}
            </p>
            <p>
              <strong>Due:</strong>{" "}
              {selectedTask.due_date
                ? new Date(selectedTask.due_date).toLocaleDateString()
                : "No Due Date"}
            </p>
            <p>
              <strong>Category:</strong> {selectedTask.category}
            </p>
            <p>
              <strong>Priority:</strong> {selectedTask.priority}
            </p>
            <p>
              <strong>Status:</strong> {selectedTask.status}
            </p>
            <p>
              <strong>Assigned:</strong>{" "}
              {selectedTask.assigned_users &&
              Array.isArray(selectedTask.assigned_users)
                ? selectedTask.assigned_users
                    .map((user) =>
                      // Handle both object (with name) and plain ID scenarios
                      typeof user === "object" && user !== null && user.name
                        ? user.name
                        : user
                    )
                    .join(", ")
                : "Unassigned"}
            </p>

            {/* Display files if any */}
            {selectedTask.upload_files &&
              selectedTask.upload_files.length > 0 && (
                <div className="mt-3">
                  <strong>Attached Files:</strong>
                  <ul>
                    {selectedTask.upload_files.map((file) => (
                      <li key={file.id}>
                        <a
                          href={file.file}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {file.file.split("/").pop()} {/* Display filename */}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

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
              {/* Edit Button (Modal) - Use Button and handleEditClick */}
              <Button
                variant="warning"
                onClick={(e) => handleEditClick(selectedTask.id, e)}
              >
                Edit
              </Button>
              {/* Delete Button in Modal */}
              <Button
                variant="danger"
                onClick={(e) => handleDeleteClick(selectedTask, e)} // Use handleDeleteClick
                disabled={deletingTaskId === selectedTask?.id}
              >
                {deletingTaskId === selectedTask?.id ? (
                  <Spinner size="sm" animation="border" />
                ) : (
                  "Delete"
                )}
              </Button>
              <Button variant="secondary" onClick={closeTaskDetails}>
                Close
              </Button>
            </div>
          </Card>
        </>
      )}

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteConfirm} onHide={cancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the task "{taskToDelete?.title}"?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={confirmDelete}
            disabled={deletingTaskId !== null}
          >
            {deletingTaskId === taskToDelete?.id ? (
              <Spinner size="sm" animation="border" />
            ) : (
              "Delete"
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Error Alert */}
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
