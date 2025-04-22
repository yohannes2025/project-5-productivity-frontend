import React from "react";

function CreateTask({ name }) {
  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h1>Welcome, {name}!</h1>
      <p>We’re glad to have you here. 🎉</p>
    </div>
  );
}

export default CreateTask;
