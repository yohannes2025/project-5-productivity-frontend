//NavBar.js
import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import styles from "../styles/NavBar.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

function NavBar() {
  const [expanded, setExpanded] = useState(false); // manages collapse state
  const [selected, setSelected] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setSelected(true);
    setExpanded(false); // close the navbar on route change
  }, [location.pathname]);

  const handleNavClick = () => {
    setExpanded(false); // close navbar on link click
  };

  return (
    <>
      <div>
        <Navbar
          expand="md"
          fixed="top"
          expanded={expanded}
          onToggle={setExpanded}
          className={styles.NavBar}
        >
          <Container>
            <Navbar.Brand className="me-auto">
              <img src="/logo192.png" alt="logo" height="45" className="me-2" />
              <span className="fw-bold">Productivity</span>
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll ">
              <Nav className="ms-auto my-2 my-lg-0 " navbarScroll>
                <NavLink
                  exact="true"
                  to="/"
                  className={`${styles.NavLink} fw-bold`}
                  onClick={handleNavClick}
                >
                  <i className="fa-solid fa-house"></i> Home Page
                </NavLink>
                <NavLink
                  exact="true"
                  to="/profile"
                  className={`${styles.NavLink} fw-bold`}
                  onClick={handleNavClick}
                >
                  <i className="fa-solid fa-user"></i> Profile
                </NavLink>
                <NavLink
                  to="/CreateTask"
                  className={`${styles.NavLink} fw-bold`}
                  onClick={handleNavClick}
                >
                  <i className="fa-solid fa-square-plus"></i> Create Task
                </NavLink>
                <NavLink
                  to="/EditTask"
                  className={`${styles.NavLink} fw-bold`}
                  onClick={handleNavClick}
                >
                  <i className="fa-solid fa-file-pen"></i> Edit Task
                </NavLink>
                <NavLink
                  to="/tasklist"
                  className={`${styles.NavLink} fw-bold`}
                  onClick={handleNavClick}
                >
                  <i className="fa-solid fa-list-check"></i> Task List
                </NavLink>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <div className={selected ? styles.mainBody : ""}>
          {/* The rest of the main content */}
        </div>
      </div>
    </>
  );
}

export default NavBar;
