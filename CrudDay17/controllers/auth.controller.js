console.log("✅ auth.controller.js loaded");

const bcrypt = require('bcrypt');
const { createUser, findUserByUsername } = require('../models/user.model');
const { signToken } = require('../utils/jwt');

// Register a new user
const signup = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const existingUser = await findUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await createUser(username, hashedPassword);

    res.status(201).json({
      message: 'User registered successfully',
      user: { id: user.id, username: user.username }
    });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login user
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await findUserByUsername(username);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = signToken({ id: user.id, username: user.username });

    res.json({ message: 'Logged in successfully', token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { signup, login };
