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
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import CreateTask from "./components/CreateTask";
import EditTask from "./components/EditTask";
import TaskList from "./components/TaskList";
import HomePage from "./components/HomePage";
import "react-datepicker/dist/react-datepicker.css";
import CreateTaskPage from "./components/CreateTaskPage";

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
    // navigate("/");
  };

  // Define the onSubmit function
  const handleTaskSubmit = (taskData) => {
    // console.log("Task Submitted:", taskData);
  };

  // Define the onCancel function
  const handleTaskCancel = () => {
    console.log("Task creation canceled");
    // Handle the cancelation logic here
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
          <Route
            path="/createtask"
            element={
              isLoggedIn ? (
                <CreateTaskPage
                  users={[]}
                  onSubmit={handleTaskSubmit}
                  onCancel={handleTaskCancel}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/edittask"
            element={
              isLoggedIn ? (
                <EditTask
                  users={[]}
                  onSubmit={handleTaskSubmit}
                  onCancel={handleTaskCancel}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/tasklist"
            element={isLoggedIn ? <TaskList /> : <Navigate to="/login" />}
          />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
