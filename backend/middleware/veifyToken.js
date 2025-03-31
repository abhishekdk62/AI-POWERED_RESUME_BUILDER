const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {

    
    const token = req.cookies.token;

    
    if (!token) {
      return res.status(401).json({ message: "Access Denied" });
    }

    const JWT_SECRET = process.env.JWT_SECRET || "demo000";

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      }
      req.user = decoded; 
      next(); 
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = verifyToken;
