const jwt = require('jsonwebtoken')
const User = require('../models/User')

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token')

  // Check if no token
  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'No token, authorization denied'
    })
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key')
    
    // Add user from payload
    req.user = decoded.user
    next()
  } catch (err) {
    res.status(401).json({
      success: false,
      error: 'Token is not valid'
    })
  }
}
