// // App.js
// import React from "react";
// import NavBar from "./components/NavBar";
// import styles from "./App.module.css";
// import Container from "react-bootstrap/Container";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Routes, Route } from "react-router-dom";
// import Login from "./components/Login";
// import Register from "./components/Register";
// import Profile from "./components/Profile";
// import CreateTask from "./components/CreateTask";
// import EditTask from "./components/EditTask";
// import TaskList from "./components/TaskList";
// import HomePage from "./components/HomePage";
// import "react-datepicker/dist/react-datepicker.css";

// function App() {
//   return (
//     <div className="App">
//       <NavBar />
//       <Container className={styles.container}>
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/createtask" element={<CreateTask />} />
//           <Route path="/edittask" element={<EditTask />} />
//           <Route path="/tasklist" element={<TaskList />} />
//         </Routes>
//       </Container>
//     </div>
//   );
// }

// export default App;

// // App.js
// import React from "react";
// import NavBar from "./components/NavBar";
// import styles from "./App.module.css";
// import Container from "react-bootstrap/Container";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Routes, Route } from "react-router-dom";
// import Login from "./components/Login";
// import Settings from "./components/Settings";
// import Register from "./components/Register";
// import Profile from "./components/Profile";
// import CreateTask from "./components/CreateTask";
// import EditTask from "./components/EditTask";
// import TaskList from "./components/TaskList";
// import HomePage from "./components/HomePage";
// import "react-datepicker/dist/react-datepicker.css";
// import PrivateRoute from "./components/PrivateRoute";

// function App() {
//   return (
//     <div className="App">
//       <NavBar />
//       <Container className={styles.container}>
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />

//           {/* Protecting the routes with PrivateRoute */}
//           <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
//           <Route path="/settings" element={<PrivateRoute element={<Settings />} />} />
//           <Route path="/createtask" element={<PrivateRoute element={<CreateTask />} />} />
//           <Route path="/edittask" element={<PrivateRoute element={<EditTask />} />} />
//           <Route path="/tasklist" element={<PrivateRoute element={<TaskList />} />} />
//         </Routes>
//       </Container>
//     </div>
//   );
// }

// export default App;

import React, { useState } from "react";
import NavBar from "./components/NavBar";
import styles from "./App.module.css";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import CreateTask from "./components/CreateTask";
import EditTask from "./components/EditTask";
import TaskList from "./components/TaskList";
import HomePage from "./components/HomePage";
import "react-datepicker/dist/react-datepicker.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Perform login logic here
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Perform logout logic here
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      <NavBar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Container className={styles.container}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to="/profile" />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/profile"
            element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
          />
          <Route
            path="/createtask"
            element={isLoggedIn ? <CreateTask /> : <Navigate to="/login" />}
          />
          <Route
            path="/edittask"
            element={isLoggedIn ? <EditTask /> : <Navigate to="/login" />}
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
