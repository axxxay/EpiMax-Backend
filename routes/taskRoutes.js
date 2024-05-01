const express = require('express');
const taskController = require('../controllers/taskController');
const authenticateToken = require('../middlewares/authenticateToken');

const router = express.Router();

router.post('/', authenticateToken, taskController.createTask);
router.get('/', authenticateToken, taskController.getTasks);
router.get('/:id', authenticateToken, taskController.getTask);
router.put('/:id', authenticateToken, taskController.updateTask);
router.delete('/:id', authenticateToken, taskController.deleteTask);


module.exports = router;