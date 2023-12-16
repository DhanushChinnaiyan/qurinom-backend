const jwt = require("jsonwebtoken");

const Secret_KEY = process.env.Secret_KEY;

const userAuth = async (req, res, next) => {
  try {
    const token = req.headers["x-auth-user"];
    if (!token) return res.status(401).json({ message: "Provide token" });

    jwt.verify(token, Secret_KEY, (error, decoded) => {
      if (error) {
        return res.status(401).json({ message: "Unauthorized access" });
      }
      req.user = decoded.user;
      next();
    });
  } catch (error) {
    console.log("Auth error :", error);
    res.status(500).json({ message: "Internal Server error" });
  }
};


module.exports = userAuth