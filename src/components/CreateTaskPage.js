// src/components/CreateTaskPage;

import React, { useState } from "react";
import CreateTask from "./CreateTask";

const CreateTaskPage = () => {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    dueDate: new Date(), // Crucial: initialize dueDate to null or undefined
  });

  const [errors, setErrors] = useState({}); // Store validation errors
  const [submitted, setSubmitted] = useState(false); // State to track submission

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
    setErrors({}); // Clear errors when input changes
  };

  const handleDateChange = (date) => {
    setTaskData({ ...taskData, dueDate: date });
  };

  const handleCreateTask = async (taskData) => {
    try {
      // Important:  Validate before sending
      if (!taskData.title) {
        setErrors({ title: "Title is required" });
        return; // Stop further execution if validation fails
      }

      // CRITICAL: Convert dueDate to ISO string for backend
      const payload = {
        ...taskData,
        dueDate: taskData.dueDate ? taskData.dueDate.toISOString() : null, //Handle null/undefined
      };

      // Replace with your actual API call
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        // Handle errors from the backend
        setErrors(errorData.errors || { general: "Failed to create task" });
      } else {
        setSubmitted(true); // Set submitted to true for success
        setTaskData({ title: "", description: "", dueDate: null });
        setErrors({}); // Clear errors for a clean form
      }
    } catch (error) {
      console.error("Error creating task:", error);
      setErrors({ general: "An error occurred" });
    }
  };

  return (
    <div>
      <h2>Create Task</h2>
      {submitted && <p>Task created successfully!</p>}{" "}
      {/* Display success message */}
      <CreateTask
        taskData={taskData}
        handleChange={handleChange}
        handleDateChange={handleDateChange}
        handleCreateTask={handleCreateTask}
        errors={errors}
      />
    </div>
  );
};

export default CreateTaskPage;
