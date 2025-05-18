// src/App.js
import React, { useState } from "react";
import NavBar from "./components/NavBar";
import styles from "./App.module.css";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import EditTask from "./components/EditTask";
import TaskList from "./components/TaskList";
import HomePage from "./components/HomePage";
import "react-datepicker/dist/react-datepicker.css";
import CreateTaskPage from "./components/CreateTaskPage"; // a wrapper/page component
import NotFound from "./components/NotFound";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Redirect to home page
  };

  // (EditTask handles submission internally)
  const handleTaskSubmit = (taskData) => {
    // CreateTaskPage, EditTask uses its own submit
  };

  const handleTaskCancel = () => {
    // CreateTaskPage
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
                // handles the onSubmit/onCancel props
                <CreateTaskPage
                  users={[]} // Pass necessary props when CreateTaskPage needs them
                  onSubmit={handleTaskSubmit}
                  onCancel={handleTaskCancel}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* Use a URL parameter :id to capture the task ID */}
          {/* Protected routes using ProtectedRoute */}
          <Route
            path="/createtask"
            element={
              <ProtectedRoute>
                <CreateTaskPage
                  users={[]}
                  onSubmit={handleTaskSubmit}
                  onCancel={handleTaskCancel}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/edittask/:id"
            element={
              <ProtectedRoute>
                <EditTask />
              </ProtectedRoute>
            }
          />

          <Route
            path="/tasklist"
            element={
              <ProtectedRoute>
                <TaskList />
              </ProtectedRoute>
            }
          />
          {/* NotFound fallback route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
