const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = require("../middleware/auth");

const router = express.Router();

// SIGNUP
router.post("/", async (req, res) => {
  const { username, password } = req.body;
  const exist = await User.findOne({ username });
  if (exist) return res.status(400).send("User exists");

  const hashed = await bcrypt.hash(password, 10);
  await User.create({ username, password: hashed });
  res.status(201).send("User created");
});

// LOGIN
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).send("Invalid credentials");

  if (user.token)
    return res.status(403).send("You are already logged in on another device.");

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(400).send("Invalid credentials");

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  user.token = token;
  await user.save();

  res.send({ token });
});

// LOGOUT
router.post("/logout", auth, async (req, res) => {
  req.user.token = null;
  await req.user.save();
  res.send("Logged out");
});

// LIST USERS
router.get("/", async (req, res) => {
  const users = await User.find().select("-password -token");
  res.send(users);
});

module.exports = router;
