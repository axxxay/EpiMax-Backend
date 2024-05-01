const request = require('supertest');
const express = require('express');
const taskController = require('../controllers/taskController');
const authenticateToken = require('../middlewares/authenticateToken');
const router = require('../routes/taskRoutes');

jest.mock('../controllers/taskController');
jest.mock('../middlewares/authenticateToken');

const app = express();
app.use(express.json());
app.use('/', router);

describe('Task Routes', () => {
  beforeEach(() => {
    authenticateToken.mockImplementation((req, res, next) => next());
  });

  it('should create a new task', async () => {
    taskController.createTask.mockImplementation((req, res) => res.status(201).json({ id: 1, title: 'Test Task' }));
    const res = await request(app).post('/').send({ title: 'Test Task' });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should get all tasks', async () => {
    taskController.getTasks.mockImplementation((req, res) => res.status(200).json([{ id: 1, title: 'Test Task' }]));
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(1);
  });

  it('should get a task by id', async () => {
    taskController.getTask.mockImplementation((req, res) => res.status(200).json({ id: 1, title: 'Test Task' }));
    const res = await request(app).get('/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
  });

  it('should update a task', async () => {
    taskController.updateTask.mockImplementation((req, res) => res.status(200).json({ id: 1, title: 'Updated Task' }));
    const res = await request(app).put('/1').send({ title: 'Updated Task' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
  });

  it('should delete a task', async () => {
    taskController.deleteTask.mockImplementation((req, res) => res.status(200).json({ id: 1, title: 'Deleted Task' }));
    const res = await request(app).delete('/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
  });
});