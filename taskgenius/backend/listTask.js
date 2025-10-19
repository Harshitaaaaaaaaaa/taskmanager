const mongoose = require("mongoose");
const Task = require("./models/taskModel"); // adjust path if needed

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/taskmanager")
  .then(async () => {
    console.log("MongoDB connected");

    // Fetch all tasks
    const tasks = await Task.find({}, { title: 1, _id: 0 }); // only title
    console.log("Tasks in DB:");
    tasks.forEach((task, index) => {
      console.log(`${index + 1}. ${task.title}`);
    });

    mongoose.disconnect();
  })
  .catch((err) => console.error(err));
