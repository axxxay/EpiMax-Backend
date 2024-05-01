const taskServices = require('../services/taskServices');

const createTask = async (req, res) => {
    try {
        console.log(req.id)
        const taskData = req.body;
        taskData.user_id = req.user.id;
        const task = await taskServices.createTask(taskData);
        res.status(201).json(task);
    } catch (e) {
        console.log(e);
        res.status(e.statusCode || 500).json({ error: e.message });
    }
}

const getTasks = async (req, res) => {
    try {
        const tasks = await taskServices.getTasks(req.user.id, req.query.status);
        res.status(200).json(tasks);
    } catch (e) {
        console.log(e);
        res.status(e.statusCode || 500).json({ error: e.message });
    }
}

const getTask = async (req, res) => {
    try {
        const task = await taskServices.getTask(req.params.id, req.user.id);
        res.status(200).json(task);
    } catch (e) {
        console.log(e);
        res.status(e.statusCode || 500).json({ error: e.message });
    }
}

const updateTask = async (req, res) => {
    try {
        const taskData = req.body;
        const task = await taskServices.updateTask(req.params.id, taskData, req.user.id);
        res.status(200).json(task);
    } catch (e) {
        console.log(e);
        res.status(e.statusCode || 500).json({ error: e.message });
    }
}

const deleteTask = async (req, res) => {
    try {
        const task = await taskServices.deleteTask(req.params.id, req.user.id);
        res.status(200).json(task);
    } catch (e) {
        console.log(e);
        res.status(e.statusCode || 500).json({ error: e.message });
    }
}

module.exports = {
    createTask,
    getTasks,
    getTask,
    updateTask,
    deleteTask
};