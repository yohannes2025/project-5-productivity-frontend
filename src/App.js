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
import CreateTaskPage from "./components/CreateTaskPage";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./ProtectedRoute"; // ✅ must be inside ./components/

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      <NavBar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Container className={styles.container}>
        <Routes>
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
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <CreateTaskPage
                  users={[]}
                  onSubmit={() => {}}
                  onCancel={() => {}}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edittask/:id"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <EditTask />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tasklist"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <TaskList />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
