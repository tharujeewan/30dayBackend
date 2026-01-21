const { verifyToken } = require('../utils/jwt');

const authMiddleware = (req, res, next) => {
  // Check for token in Authorization header: "Bearer <token>"
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Invalid token format' });

  const decoded = verifyToken(token);
  if (!decoded) return res.status(401).json({ message: 'Invalid or expired token' });

  req.user = decoded; // attach user info to request
  next();
};

module.exports = authMiddleware;
