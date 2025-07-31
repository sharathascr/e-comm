const express = require("express");
const { Product } = require("../models/productModel");
// const { products } = require("../../products");

const productRouter = express.Router();

productRouter.get("/retrive-products-count", async (req, res, next) => {
  try {
    const productsCount = await Product.countDocuments({});
    res.send(productsCount);
  } catch (error) {
    next(error);
  }
});

productRouter.get("/retrive-products", async (req, res, next) => {
  try {
    const limit = req.query.limit;
    const skip = req.query.skip;
    const products = await Product.find({}).limit(limit).skip(skip);
    res.send(products);
  } catch (error) {
    next(error);
  }
});

productRouter.delete("/all-products", async (req, res) => {
  console.log("Received DELETE request to remove all products");

  try {
    const result = await Product.deleteMany({});
    console.log(`Deleted ${result.deletedCount} products`);
    res.json({
      message: "All products deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("Error deleting products:", {
      message: error.message,
      stack: error.stack,
    });
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

// POST /api/products/bulk - Save multiple products
productRouter.post(
  "/bulk",

  async (req, res, next) => {
    try {
      const products = req.body;

      // Insert products using insertMany
      const insertedProducts = await Product.insertMany(products, {
        ordered: true,
      });

      res.status(201).json({
        message: "Bulk insert successful",
        insertedCount: insertedProducts.length,
        insertedIds: insertedProducts.map((p) => p._id),
      });
    } catch (error) {
      if (error.name === "MongoBulkWriteError" && error.code === 11000) {
        return next(error);
      }
      next(error);
    }
  }
);

productRouter.get("/search", async (req, res, next) => {
  try {
    const query = req.query.q || "";
    if (!query) {
      return res
        .status(400)
        .json({ success: false, message: "Search query is required" });
    }

    const queryConditions = [
      { title: { $regex: query, $options: "i" } },
      { description: { $regex: query, $options: "i" } },
      { category: { $regex: query, $options: "i" } },
      { brand: { $regex: query, $options: "i" } },
    ];

    // Add numeric field conditions only if query is a valid number
    if (!isNaN(query)) {
      queryConditions.push(
        { id: parseInt(query) },
        { price: parseFloat(query) },
        { discountPercentage: parseFloat(query) },
        { rating: parseFloat(query) }
      );
    }

    const filteredProducts = await Product.find({ $or: queryConditions });

    res.status(200).json({
      success: true,
      data: filteredProducts,
      count: filteredProducts.length,
    });
  } catch (error) {
    next(error);
  }
});



productRouter.get('/category/:category', async (req, res, next) => {
  console.log("inside category")
  try {
    const category = req.params.category.toLowerCase();
    const limit = parseInt(req.query.limit) || 10;
    const skip = parseInt(req.query.skip) || 0;

    // Validate pagination parameters
    if (limit < 0 || skip < 0) {
      return res.status(400).json({ message: 'Limit and skip must be non-negative' });
    }

    // Query products by category (case-insensitive)
    const products = await Product.find({ category: { $regex: `^${category}$`, $options: 'i' } })
      .limit(limit)
      .skip(skip)
      .sort({ price: 1 }); // Optional: sort by price ascending

    // Count total matching documents
    const total = await Product.countDocuments({ category: { $regex: `^${category}$`, $options: 'i' } });

    if (!products.length) {
      return res.status(404).json({ message: `No products found for category '${category}'` });
    }

    // Response structure similar to DummyJSON
    res.json({
      products,
      total,
      skip,
      limit,
      category
    });
  } catch (error) {
    next(error);
  }
});

module.exports = productRouter;

module.exports = { productRouter };
