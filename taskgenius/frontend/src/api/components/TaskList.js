import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem"; // New component for individual tasks
import "./App.css";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  // Fetch all tasks from backend
  const fetchTasks = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/tasks");
      setTasks(data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Delete a task
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  // Toggle task completion
  const toggleComplete = async (task) => {
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/tasks/${task._id}`,
        {
          completed: !task.completed,
        }
      );
      setTasks(
        tasks.map((t) =>
          t._id === task._id ? { ...t, completed: data.completed } : t
        )
      );
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  return (
    <div className="task-list-container">
      <h2>Tasks</h2>
      <TaskForm fetchTasks={fetchTasks} />

      <ul className="task-list">
        {tasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            toggleComplete={toggleComplete}
            handleDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
}
