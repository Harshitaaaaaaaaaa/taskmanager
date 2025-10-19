import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskItem from "./TaskItem";
import "./App.css"; // import CSS

function App() {
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/tasks")
      .then((res) => setTasks(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      const { data } = await axios.post("http://localhost:5000/api/tasks", {
        title,
      });
      setTasks([...tasks, data]);
      setTitle("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

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
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h1>📝 Task Manager</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          placeholder="Enter a new task"
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit" className="add-btn">
          Add Task
        </button>
      </form>

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

export default App;
