// // App.js
// import React, { useState } from "react";
// import NavBar from "./components/NavBar";
// import styles from "./App.module.css";
// import Container from "react-bootstrap/Container";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Routes, Route, Navigate } from "react-router-dom";
// import Login from "./components/Login";
// import Register from "./components/Register";
// import CreateTask from "./components/CreateTask";
// import EditTask from "./components/EditTask";
// import TaskList from "./components/TaskList";
// import HomePage from "./components/HomePage";
// import "react-datepicker/dist/react-datepicker.css";
// import CreateTaskPage from "./components/CreateTaskPage";

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const handleLogin = () => {
//     // Perform login logic here, like storing a token
//     setIsLoggedIn(true);
//   };

//   const handleLogout = () => {
//     // Perform logout logic here, like removing a token
//     setIsLoggedIn(false);
//     // Redirect to home page (optional if using <Navigate>)
//     // navigate("/");
//   };

//   // Define the onSubmit function
//   const handleTaskSubmit = (taskData) => {
//     // console.log("Task Submitted:", taskData);
//   };

//   // Define the onCancel function
//   const handleTaskCancel = () => {
//     console.log("Task creation canceled");
//     // Handle the cancelation logic here
//   };

//   return (
//     <div className="App">
//       <NavBar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
//       <Container className={styles.container}>
//         <Routes>
//           {/* Redirect root to /createtask if logged in, else show HomePage or login page */}
//           <Route
//             path="/"
//             element={isLoggedIn ? <Navigate to="/createtask" /> : <HomePage />}
//           />
//           <Route
//             path="/login"
//             element={
//               isLoggedIn ? (
//                 <Navigate to="/createtask" />
//               ) : (
//                 <Login onLogin={handleLogin} />
//               )
//             }
//           />
//           <Route path="/register" element={<Register />} />
//           <Route
//             path="/createtask"
//             element={
//               isLoggedIn ? (
//                 <CreateTaskPage
//                   users={[]}
//                   onSubmit={handleTaskSubmit}
//                   onCancel={handleTaskCancel}
//                 />
//               ) : (
//                 <Navigate to="/login" />
//               )
//             }
//           />
//           <Route
//             path="/edittask"
//             element={
//               isLoggedIn ? (
//                 <EditTask
//                   users={[]}
//                   onSubmit={handleTaskSubmit}
//                   onCancel={handleTaskCancel}
//                 />
//               ) : (
//                 <Navigate to="/login" />
//               )
//             }
//           />
//           <Route
//             path="/tasklist"
//             element={isLoggedIn ? <TaskList /> : <Navigate to="/login" />}
//           />
//         </Routes>
//       </Container>
//     </div>
//   );
// }

// export default App;

// // App.js
// import React, { useState } from "react";
// import NavBar from "./components/NavBar";
// import styles from "./App.module.css";
// import Container from "react-bootstrap/Container";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Routes, Route, Navigate } from "react-router-dom";
// import Login from "./components/Login";
// import Register from "./components/Register";
// import CreateTask from "./components/CreateTask";
// import EditTask from "./components/EditTask";
// import TaskList from "./components/TaskList";
// import HomePage from "./components/HomePage";
// import "react-datepicker/dist/react-datepicker.css";
// import CreateTaskPage from "./components/CreateTaskPage";

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const handleLogin = () => {
//     // Perform login logic here, like storing a token
//     setIsLoggedIn(true);
//   };

//   const handleLogout = () => {
//     // Perform logout logic here, like removing a token
//     setIsLoggedIn(false);
//     // Redirect to home page (optional if using <Navigate>)
//     // navigate("/");
//   };

//   // Define the onSubmit function
//   const handleTaskSubmit = (taskData) => {
//     // console.log("Task Submitted:", taskData);
//   };

//   // Define the onCancel function
//   const handleTaskCancel = () => {
//     console.log("Task creation canceled");
//     // Handle the cancelation logic here
//   };

//   return (
//     <div className="App">
//       <NavBar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
//       <Container className={styles.container}>
//         <Routes>
//           {/* Redirect root to /createtask if logged in, else show HomePage or login page */}
//           <Route
//             path="/"
//             element={isLoggedIn ? <Navigate to="/createtask" /> : <HomePage />}
//           />
//           <Route
//             path="/login"
//             element={
//               isLoggedIn ? (
//                 <Navigate to="/createtask" />
//               ) : (
//                 <Login onLogin={handleLogin} />
//               )
//             }
//           />
//           <Route path="/register" element={<Register />} />
//           <Route
//             path="/createtask"
//             element={
//               isLoggedIn ? (
//                 <CreateTaskPage
//                   users={[]}
//                   onSubmit={handleTaskSubmit}
//                   onCancel={handleTaskCancel}
//                 />
//               ) : (
//                 <Navigate to="/login" />
//               )
//             }
//           />
//           <Route
//             path="/edittask"
//             element={
//               isLoggedIn ? (
//                 <EditTask
//                   users={[]}
//                   onSubmit={handleTaskSubmit}
//                   onCancel={handleTaskCancel}
//                 />
//               ) : (
//                 <Navigate to="/login" />
//               )
//             }
//           />
//           <Route
//             path="/tasklist"
//             element={isLoggedIn ? <TaskList /> : <Navigate to="/login" />}
//           />
//         </Routes>
//       </Container>
//     </div>
//   );
// }

// export default App;

// App.js
import React, { useState } from "react";
import NavBar from "./components/NavBar";
import styles from "./App.module.css";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Navigate } from "react-router-dom"; // No need for BrowserRouter here if it's in index.js
import Login from "./components/Login";
import Register from "./components/Register";
import CreateTask from "./components/CreateTask"; // Keep if CreateTaskPage uses it internally
import EditTask from "./components/EditTask";
import TaskList from "./components/TaskList";
import HomePage from "./components/HomePage";
import "react-datepicker/dist/react-datepicker.css";
import CreateTaskPage from "./components/CreateTaskPage"; // Assuming this is a wrapper/page component

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Perform login logic here, like storing a token
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Perform logout logic here, like removing a token
    setIsLoggedIn(false);
    // Redirect to home page (optional if using <Navigate>)
    // navigate("/"); // You would use navigate hook if inside a component
  };

  // Define dummy onSubmit/onCancel functions if EditTask doesn't need them as props
  // (EditTask handles submission internally)
  const handleTaskSubmit = (taskData) => {
    // console.log("Task Submitted:", taskData);
    // This is likely for CreateTaskPage, EditTask uses its own submit
  };

  const handleTaskCancel = () => {
    console.log("Task creation canceled");
    // This is likely for CreateTaskPage
  };

  return (
    <div className="App">
      <NavBar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Container className={styles.container}>
        <Routes>
          {/* Redirect root to /createtask if logged in, else show HomePage or login page */}
          <Route
            path="/"
            element={isLoggedIn ? <Navigate to="/createtask" /> : <HomePage />}
          />

          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to="/createtask" />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />

          <Route path="/register" element={<Register />} />

          {/* Route for creating tasks */}
          <Route
            path="/createtask"
            element={
              isLoggedIn ? (
                // Assuming CreateTaskPage is the correct component for this route
                // and it handles the onSubmit/onCancel props
                <CreateTaskPage
                  users={[]} // Pass necessary props if CreateTaskPage needs them
                  onSubmit={handleTaskSubmit}
                  onCancel={handleTaskCancel}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* **CORRECTED ROUTE FOR EDITING TASKS** */}
          {/* Use a URL parameter :id to capture the task ID */}
          <Route
            path="/edittask/:id" // <-- ADDED :id parameter
            element={
              isLoggedIn ? (
                // EditTask component fetches data based on the ID from the URL
                // It handles its own submission internally, so onSubmit/onCancel props
                // are likely not needed here, unless EditTask has specific needs for parent communication
                <EditTask
                // users={[]} // Remove if EditTask doesn't need this prop
                // onSubmit={handleTaskSubmit} // Remove if EditTask handles submission internally
                // onCancel={handleTaskCancel} // Remove if EditTask uses navigate for cancel
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* Route for listing tasks */}
          <Route
            path="/tasklist"
            element={isLoggedIn ? <TaskList /> : <Navigate to="/login" />}
          />

          {/* Optional: Add a catch-all route for unmatched paths */}
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </Container>
    </div>
  );
}

export default App;
