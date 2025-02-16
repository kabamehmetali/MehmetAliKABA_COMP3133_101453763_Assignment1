const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

module.exports = {
  Query: {
    // login: Provide either username OR email, along with password
    login: async (_, { username, email, password }) => {
      try {
        // Look up user by username or email
        let user;
        if (username) {
          user = await User.findOne({ username });
        } else if (email) {
          user = await User.findOne({ email });
        }

        if (!user) {
          throw new Error('User not found');
        }

        // Validate password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
          throw new Error('Invalid credentials');
        }

        // Generate JWT token
        const token = jwt.sign(
          { userId: user._id },
          process.env.JWT_SECRET || 'secretKey',
          { expiresIn: '1d' }
        );

        return {
          token,
          user
        };
      } catch (error) {
        throw new Error(error.message);
      }
    }
  },

  Mutation: {
    // signup: Create a new user account
    signup: async (_, { username, email, password }) => {
      try {
        // Check if username/email already exists
        const existingUser = await User.findOne({
          $or: [{ username }, { email }]
        });
        if (existingUser) {
          throw new Error('Username or email already in use');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = new User({
          username,
          email,
          password: hashedPassword
        });

        await newUser.save();
        return newUser;
      } catch (error) {
        // If Mongoose validation errors occur, handle them
        throw new Error(error.message);
      }
    }
  }
};
