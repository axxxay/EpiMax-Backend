const {v4: uuidv4} = require('uuid');
const Sequelize = require('sequelize');
const Task = require('../models/Task');
const {validateTask} = require('../utils/validation');

const createTask = async (taskData) => {
    try {
        validateTask(taskData);
        taskData.id = uuidv4();
        await Task.create(taskData);
        return {id: taskData.id, success: "Task created successfully"}
    } catch (error) {
        console.error('Error creating task:', error);
        throw error;
    }
}

const getTasks = async (userId, status) => {
    try {

        let whereClause = {user_id: userId}
        if (status) {
            whereClause.status = status;
        }

        const tasks = await Task.findAll({
            where: whereClause,
            order: [['created_at', 'DESC']]
        });
        return tasks;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    }
}

const getTask = async (taskId, userId) => {
    try {
        const task = await Task.findOne({
            where: {
                id: taskId,
                user_id: userId
            }
        });
        return task ? task : {error: "Task not found"};
    } catch (error) {
        console.error('Error fetching task:', error);
        throw error;
    }
}

const updateTask = async (taskId, taskData, userId) => {
    try {
        validateTask(taskData);

        const task = await Task.findOne({
            where: {
                id: taskId,
                user_id: userId
            }
        });

        if (!task) {
            const error = new Error('Task not found');
            error.statusCode = 404;
            throw error;
        }

        taskData.updated_at = Sequelize.literal('datetime(\'now\')')

        await Task.update(taskData, {
            where: {
                id: taskId,
                user_id: userId
            }
        });
        return {success: "Task updated successfully"};
    } catch (error) {
        console.error('Error updating task:', error);
        throw error;
    }
}

const deleteTask = async (taskId, userId) => {
    try {
        const task = await Task.findOne({
            where: {
                id: taskId,
                user_id: userId
            }
        });

        if (!task) {
            const error = new Error('Task not found');
            error.statusCode = 404;
            throw error;
        }

        await Task.destroy({
            where: {
                id: taskId,
                user_id: userId
            }
        });
        return {success: "Task deleted successfully"};
    } catch (error) {
        console.error('Error deleting task:', error);
        throw error;
    }
}

module.exports = {createTask, getTasks, getTask, updateTask, deleteTask};