const { createTask, getTasks, getTask, updateTask, deleteTask } = require('../services/taskServices');
const sequelize = require('../config/database');
const Task = require('../models/Task');
const { validateTask } = require('../utils/validation');
const { v4: uuidv4 } = require('uuid');

jest.mock('../models/Task');
jest.mock('../utils/validation');
jest.mock('uuid');

describe('Task Services', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('createTask creates a task successfully', async () => {
        const taskData = { title: 'Test Task', description: 'Test Description', status: 'pending', user_id: 'test-user-id' };
        validateTask.mockImplementation(() => true);
        uuidv4.mockImplementation(() => 'test-task-id');
        Task.create.mockImplementation(() => Promise.resolve());

        const result = await createTask(taskData);

        expect(validateTask).toHaveBeenCalledWith(taskData);
        expect(Task.create).toHaveBeenCalledWith({ ...taskData, id: 'test-task-id' });
        expect(result).toEqual({ id: 'test-task-id', success: 'Task created successfully' });
    });

    afterAll(done => {
        sequelize.close().then(() => done());
    });


    test('getTasks fetches tasks successfully', async () => {
        const userId = 'test-user-id';
        const status = 'pending';
        const tasks = [{ title: 'Test Task', description: 'Test Description', status: 'pending', user_id: 'test-user-id' }];
        Task.findAll.mockImplementation(() => Promise.resolve(tasks));

        const result = await getTasks(userId, status);

        expect(Task.findAll).toHaveBeenCalledWith({
            where: { user_id: userId, status },
            order: [['created_at', 'DESC']]
        });
        expect(result).toEqual(tasks);
    });

    test('getTask fetches a task successfully', async () => {
        const taskId = 'test-task-id';
        const userId = 'test-user-id';
        const task = { title: 'Test Task', description: 'Test Description', status: 'pending', user_id: 'test-user-id' };
        Task.findOne.mockImplementation(() => Promise.resolve(task));

        const result = await getTask(taskId, userId);

        expect(Task.findOne).toHaveBeenCalledWith({
            where: { id: taskId, user_id: userId }
        });
        expect(result).toEqual(task);
    });

    test('updateTask updates a task successfully', async () => {
        const taskId = 'test-task-id';
        const userId = 'test-user-id';
        const taskData = { title: 'Test Task', description: 'Test Description', status: 'pending' };
        const task = { id: taskId, ...taskData, user_id: userId };
        validateTask.mockImplementation(() => true);
        Task.findOne.mockImplementation(() => Promise.resolve(task));
        Task.update.mockImplementation(() => Promise.resolve());
    
        const result = await updateTask(taskId, taskData, userId);
    
        expect(validateTask).toHaveBeenCalledWith(taskData);
        expect(Task.findOne).toHaveBeenCalledWith({
            where: { id: taskId, user_id: userId }
        });
        expect(Task.update).toHaveBeenCalledWith(taskData, { where: { id: taskId, user_id: userId } });
        expect(result).toEqual({success: "Task updated successfully"});
    });

    test('deleteTask deletes a task successfully', async () => {
        const taskId = 'test-task-id';
        const userId = 'test-user-id';
        const task = { title: 'Test Task', description: 'Test Description', status: 'pending', user_id: 'test-user-id' };
        Task.findOne.mockImplementation(() => Promise.resolve(task));
        Task.destroy.mockImplementation(() => Promise.resolve());

        const result = await deleteTask(taskId, userId);

        expect(Task.findOne).toHaveBeenCalledWith({
            where: { id: taskId, user_id: userId }
        });
        expect(Task.destroy).toHaveBeenCalledWith({
            where: { id: taskId, user_id: userId }
        });
        // expect(result).toEqual(task);
        expect(result).toEqual({ success: "Task deleted successfully" });
    });
});