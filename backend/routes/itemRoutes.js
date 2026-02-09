const express = require("express");
const Item = require("../models/Item");

const router = express.Router();

router.post("/", async (req, res) => {
  const item = await Item.create(req.body);
  res.status(201).send(item);
});

router.get("/", async (req, res) => {
  const items = await Item.find();
  res.send(items);
});

module.exports = router;
