const express = require("express");
const { Cart } = require("../models/cartModel");

const cartRouter = express.Router();

cartRouter.get("/", async (req, res, next) => {
  const limit = req.query.limit;
  const skip = req.query.skip;
  try {
    const cartResponse = await Cart.find({}).limit(limit).skip(skip);
    res.send(cartResponse);
  } catch (error) {
    next(error);
  }
});

cartRouter.post("/add-to-cart", async (req, res, next) => {
  try {
    const { id } = req.body;
    const cart = await Cart.find({ id: id });
    if (cart.length === 0) {
      const newProduct = new Cart(req.body);
      const cartResponse = await newProduct.save();
      const cartCount = await Cart.countDocuments({});
      res
        .status(200)
        .json({ message: "Added to cart successfully", total: cartCount });
    } else {
      const updatedCart = await Cart.updateOne(
        { id: id },
        { $inc: { quantity: 1 } },
        { new: true }
      );
      res.send(updatedCart);
    }
  } catch (error) {
    next(error);
  }
});

cartRouter.delete("/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const deleteProduct = await Cart.deleteOne({ id: id });
    res.send(deleteProduct);
  } catch (error) {
    next(error);
  }
});

cartRouter.patch("/increment-quantity/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
     const updatedProduct = await Cart.updateOne(
      { id: id },
      { $inc: { quantity: 1 } },
      { new: true }
    );
    res.send(updatedProduct);
  } catch (error) {
    next(error);
  }
});
cartRouter.patch("/decrement-quantity/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedProduct = await Cart.updateOne(
      { id: id },
      { $inc: { quantity: -1 } },
      { new: true }
    );
    res.send(updatedProduct);
    //   res.status(200).json({message:"quantity updated", updatedProduct})
  } catch (error) {
    next(error);
  }
});

module.exports = { cartRouter };
