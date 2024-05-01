const { Op } = require('sequelize');
const {v4: uuidv4} = require('uuid');
const User = require('../models/User');
const {generateAccessToken} = require('./authService');
const {hashPassword, comparePassword} = require('./passwordHashService');
const {validateUser} = require('../utils/validation');

const getUser = async (username, email="") => {
    try {
        const user = await User.findOne({
            where: {
                [Op.or]: [
                    { username },
                    { email }
                ]
            },
        });
        return user;
    } catch (error) {
        console.error('Error finding user:', error);
        throw error;
    }
}

const registerUser = async (userData) => {
    try {
        const user = await getUser(userData.username, userData.email);
        if (user) {
            const error = new Error('User already exists');
            error.statusCode = 400;
            throw error;
        }
        validateUser(userData);
        userData.id = uuidv4();
        userData.password = hashPassword(userData.password);
        await User.create(userData);
        return {success: "User created successfully"}
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

const loginUser = async (userData) => {
    try {
        const user = await getUser(userData.username);
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        if(!comparePassword(userData.password, user.password)) {
            const error = new Error('Incorrect password');
            error.statusCode = 401;
            throw error;
        }
        return { jwtToken: generateAccessToken(user.id) };
    } catch (error) {
        console.error('Error logging in user:', error);
        throw error;
    }
};

module.exports = { registerUser, loginUser };