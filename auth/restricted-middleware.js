const jwt = require('jsonwebtoken');
const secret = require('../config/secrets');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret.jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: 'You shall not pass' })
      } else {
        // We have access to the request object through decodedToken.<key>
        req.user = { username: decodedToken.username };
        next();
      }
    })
  } else {
    res.status(400).json({ message: 'No credentials provided' });
  }
};
