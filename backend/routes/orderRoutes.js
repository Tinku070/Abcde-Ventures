const express = require("express");
const Cart = require("../models/Cart");
const Order = require("../models/Order");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user._id });
  if (!cart) return res.status(400).send("No cart");

  const order = await Order.create({
    userId: req.user._id,
    cartId: cart._id,
  });

  cart.items = [];
  await cart.save();

  res.send("Order placed");
});

router.get("/", async (req, res) => {
  const orders = await Order.find();
  res.send(orders);
});

module.exports = router;
