//route to handle protected routes

const jwt = require('jsonwebtoken');
require('dotenv').config();


// Define the protected route
async function protectedRouter(req, res){
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  const secret = process.env.DB_SECRETKEY 

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ success: false, message: 'Invalid Token' });
    }

    const { memberId } = decoded;
    res.json({ success: true, message: 'Protected Route', memberId });
  });
}


module.exports = protectedRouter;
