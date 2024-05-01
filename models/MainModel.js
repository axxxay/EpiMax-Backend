const Task = require('./Task');
const User = require('./User');


const models = {
    Task,
    User,
};

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});