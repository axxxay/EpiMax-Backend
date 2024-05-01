const cors = require('cors');
const app = require('./config/express')
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
require('./models/MainModel');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const swaggerDocument = YAML.load('./swagger_doc.yaml');


app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to the Task Manager API, go to /api/docs to test the APIs using Swagger UI.');
});
app.use('/api/user', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});