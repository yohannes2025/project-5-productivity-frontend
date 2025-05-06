// CreateTaskPage.js
import React, { useState } from "react";
import axios from "axios";
import CreateTask from "./CreateTask"; // Import the separate CreateTask component

const CreateTaskPage = () => {
  // Add a state variable for debugging
  const [debugData, setDebugData] = useState(null);

  const handleCreateTask = async (taskData) => {
    try {
      const formData = new FormData();
      formData.append("title", taskData.title);
      formData.append("description", taskData.description);
      formData.append("due_date", taskData.dueDate.toISOString().split("T")[0]);
      formData.append("priority", taskData.priority);
      formData.append("category", taskData.category);
      formData.append("status", taskData.status.toLowerCase());

      // ✅ Corrected: Append each assigned user ID individually
      // This is the standard way to send an array of values in FormData
      if (taskData.assignedUsers && taskData.assignedUsers.length > 0) {
        taskData.assignedUsers.forEach((userId) => {
          formData.append("assigned_users", userId);
        });
      }

      // ✅ Append files (if any)
      if (taskData.files && taskData.files.length > 0) {
        taskData.files.forEach((file) => formData.append("upload_files", file));
      }

      // ✅ Include Authorization token
      const token = localStorage.getItem("access_token");

      // ✅ Debugging:  Set the state variable *before* the axios call
      // Convert formData to an object for easier debugging display
      const formDataObject = {};
      formData.forEach((value, key) => {
        // Handle appending arrays correctly for display
        if (formDataObject[key]) {
          if (!Array.isArray(formDataObject[key])) {
            formDataObject[key] = [formDataObject[key]];
          }
          formDataObject[key].push(value);
        } else {
          formDataObject[key] = value;
        }
      });

      setDebugData({
        taskData: taskData, // Include the original taskData for comparison
        formData: formDataObject, // Show form data as an object
      });

      const response = await axios.post(
        "http://localhost:8000/api/tasks/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // "Content-Type": "multipart/form-data" is automatically set by axios
            // when sending FormData, so you can often omit it.
          },
        }
      );

      console.log("Task created successfully:", response.data);
      return response.data;
    } catch (err) {
      if (err.response) {
        console.error("Server validation errors:", err.response.data);
        alert("Task creation failed: " + JSON.stringify(err.response.data));
      } else {
        console.error("Network or unknown error:", err.message);
        alert("Network error: " + err.message);
      }
      // Re-throw the error so CreateTask can catch it and display an error message
      throw err;
    }
  };

  // ✅ Debugging:  Display the debug data in the component
  return (
    <>
      {debugData && (
        <div
          style={{
            backgroundColor: "#f0f0f0",
            padding: "20px",
            margin: "20px",
            border: "1px solid #ccc",
          }}
        >
          <h3 style={{ margin: "0 0 10px 0" }}>Debug Data:</h3>
          <pre>{JSON.stringify(debugData, null, 2)}</pre>
        </div>
      )}
      <CreateTask onSubmit={handleCreateTask} />
    </>
  );
};

export default CreateTaskPage;
