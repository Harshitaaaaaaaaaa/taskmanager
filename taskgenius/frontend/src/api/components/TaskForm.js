import React, { useState } from "react";
import axios from "axios";

export default function TaskForm({ fetchTasks }) {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return;

    try {
      await axios.post("http://localhost:5000/api/tasks", {
        title,
        completed: false,
      });
      setTitle("");
      fetchTasks(); // refresh task list
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task"
      />
      <button type="submit">Add Task</button>
    </form>
  );
}
