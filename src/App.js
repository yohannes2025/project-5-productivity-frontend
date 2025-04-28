// App.js
import React from "react";
import NavBar from "./components/NavBar";
import styles from "./App.module.css";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Settings from "./components/Settings";
import Register from "./components/Register";
import Profile from "./components/Profile";
import CreateTask from "./components/CreateTask";
import EditTask from "./components/EditTask";
import TaskList from "./components/TaskList";
import HomePage from "./components/HomePage";
import "react-datepicker/dist/react-datepicker.css";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Container className={styles.container}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/createtask" element={<CreateTask />} />
          <Route path="/edittask" element={<EditTask />} />
          <Route path="/tasklist" element={<TaskList />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;

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
