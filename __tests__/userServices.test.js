const { registerUser, loginUser } = require('../services/userServices');
const User = require('../models/User');
const { hashPassword, comparePassword } = require('../services/passwordHashService');
const { generateAccessToken } = require('../services/authService');
const { validateUser } = require('../utils/validation');

jest.mock('../models/User');
jest.mock('../services/passwordHashService');
jest.mock('../services/authService');
jest.mock('../utils/validation');

describe('User Services', () => {
    const userData = {
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'password123'
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // Mock the hashPassword function
//     jest.mock('../services/passwordHashService', () => ({
//         hashPassword: jest.fn(),
//     }));
  
//   // Then in your test
//   test('registerUser creates a user successfully', async () => {
//       User.findOne.mockImplementation(() => Promise.resolve(null));
//       hashPassword.mockImplementation(() => 'hashedpassword');
//       validateUser.mockImplementation(() => true);
      
//       const result = await registerUser(userData);
      
//       expect(User.findOne).toHaveBeenCalled();
//       expect(validateUser).toHaveBeenCalledWith(userData);
//       expect(hashPassword).toHaveBeenCalledWith(userData.password); // Expect the original password
//       expect(User.create).toHaveBeenCalledWith({ ...userData, password: 'hashedpassword' });
//       expect(result).toEqual({ success: "User created successfully" });
//   });

    test('loginUser logs in a user successfully', async () => {
        User.findOne.mockImplementation(() => Promise.resolve({ ...userData, password: 'hashedpassword' }));
        comparePassword.mockImplementation(() => true);
        generateAccessToken.mockImplementation(() => 'jwtToken');

        const result = await loginUser(userData);

        expect(User.findOne).toHaveBeenCalled();
        expect(comparePassword).toHaveBeenCalledWith(userData.password, 'hashedpassword');
        expect(generateAccessToken).toHaveBeenCalled();
        expect(result).toEqual({ jwtToken: 'jwtToken' });
    });
});