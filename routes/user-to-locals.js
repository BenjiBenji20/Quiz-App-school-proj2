const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

const injectUser = async (req, res, next) => {
  const token = req.cookies.authToken;

  if (!token) {
    res.locals.isAuthenticated = false;
    res.locals.user = null;
    return next();
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decodedToken.userId);
    if (!user) {
      res.locals.isAuthenticated = false;
      res.locals.user = null;
      return next();
    }

    res.locals.isAuthenticated = true;
    res.locals.user = user; // Attach user data to locals
    next();
  } catch (error) {
    console.error('Error decoding token:', error);
    res.locals.isAuthenticated = false;
    res.locals.user = null;
    res.clearCookie('authToken');
    next();
  }
};

module.exports = injectUser;
