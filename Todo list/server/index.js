const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cros= require("cors");

app.use(bodyParser.json());
app.use(cros())

mongoose.connect('mongodb+srv://sanskar:asthasahu@cluster0.jwngnpv.mongodb.net/todo_app?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const Task = mongoose.model('Task', {
    label: String,
    priority: String,
    due_date: Date,
    isCompleted: Boolean
    
});

app.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

app.post('/tasks', async (req, res) => {
    const { label,due_date,priority, isCompleted} = req.body;

    
    const currentDate = new Date();
    const dueDate = new Date(due_date);
    const timeDifference = dueDate - currentDate;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    
    let calculatedPriority = "low";
    if (daysDifference <= 15) {
        calculatedPriority = "high";
    } else if (daysDifference <= 30) {
        calculatedPriority = "medium";
    }

    const newTask = new Task({
        label ,
        due_date,
        priority: calculatedPriority,
        isCompleted
        });

    try {
        await newTask.save();
        res.json(newTask);
    } catch (error) {
        res.status(500).json({ error: "Failed to create task" });
    }
});

app.delete('/tasks/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        await Task.findByIdAndDelete(taskId);
        res.json({ message: 'Task deleted' });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ message: 'Error deleting task' });
    }
});
app.put('/tasks/:taskId', async (req, res) => {
    const { taskId } = req.params;
    const { isCompleted } = req.body;
    
    await Task.findByIdAndUpdate(taskId, { isCompleted });
    res.json({ message: 'Task updated successfully' });
});


app.listen(3001,()=> {
    console.log("server is runing");
})
