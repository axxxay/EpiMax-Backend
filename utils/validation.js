const validateUser = (user) => {
    const emailRegex = /\S+@\S+\.\S+/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/;

    if (!user.username || user.username.length < 3) {
        const error = new Error('Username must be at least 3 characters long');
        error.statusCode = 400;
        throw error;
    } else if (!user.email || !emailRegex.test(user.email)) {
        const error = new Error('Invalid email');
        error.statusCode = 400;
        throw error;
    } else if (!user.password || !passwordRegex.test(user.password)) {
        const error = new Error('Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one sepcial character and one number.');
        error.statusCode = 400;
        throw error;
    }
    return true;
}

const validateTask = (task) => {
    if (!task.title || task.title.length < 3) {
        const error = new Error('Task name must be at least 3 characters long');
        error.statusCode = 400;
        throw error;
    } else if (!task.description || task.description.length < 15) {
        const error = new Error('Task description must be at least 15 characters long');
        error.statusCode = 400;
        throw error;
    } else if (!task.status) {
        const error = new Error('Task status is required');
        error.statusCode = 400;
        throw error;
    }
    return true;
}

module.exports = { validateUser, validateTask };