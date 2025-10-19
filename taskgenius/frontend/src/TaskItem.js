import React from "react";

export default function TaskItem({ task, toggleComplete, handleDelete }) {
  return (
    <li className={`task-item ${task.completed ? "completed" : ""}`}>
      <span onClick={() => toggleComplete(task)}>{task.title}</span>
      <button className="delete-btn" onClick={() => handleDelete(task._id)}>
        ❌
      </button>
    </li>
  );
}
