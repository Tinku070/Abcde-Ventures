const express = require("express");
const Cart = require("../models/Cart");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  const { itemId } = req.body;

  let cart = await Cart.findOne({ userId: req.user._id });
  if (!cart) {
    cart = await Cart.create({
      userId: req.user._id,
      items: [itemId],
    });
  } else {
    cart.items.push(itemId);
    await cart.save();
  }

  res.send(cart);
});

router.get("/", async (req, res) => {
  const carts = await Cart.find();
  res.send(carts);
});

module.exports = router;
