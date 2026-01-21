const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

console.log("signup:", signup);
console.log("login:", login);


// Public routes
router.post('/signup', signup);
router.post('/login', login);

// Protected route example
router.get('/dashboard', authMiddleware, (req, res) => {
  res.json({ message: `Hello ${req.user.username}, welcome to your dashboard!` });
});

module.exports = router;
