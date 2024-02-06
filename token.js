const jwt = require('jsonwebtoken');
const secret = require("./secret");


function verifyToken(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }

  try {
    const decodedToken = jwt.verify(token, 'secret');

    // Store the decoded token in the request object
    console.log(decodedToken);
    req.customer = decodedToken;

    // Continue with the next middleware or route handler
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
}
module.exports = verifyToken;
/*
//verify
function verifyAccessToken(token) {
    const secret = 'bankapp';
  
    try {
      const decoded = jwt.verify(token, secret);
      return { success: true, data: decoded };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };
  console.log(verifyAccessToken);
 // middle ware 
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) {
      return res.sendStatus(401);
    }
  
    const result = verifyAccessToken(token);
  
    if (!result.success) {
      return res.status(403).json({ error: result.error });
    }
  
    req.user = result.data;
    next();
  };
  console.log(authenticateToken);

  module.exports = verifyAccessToken;
module.exports = authenticateToken;  
*/