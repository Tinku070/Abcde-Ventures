const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(401).send("No token");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);

    if (!user || user.token !== token)
      return res.status(401).send("Invalid session");

    req.user = user;
    next();
  } catch {
    res.status(401).send("Auth failed");
  }
};
