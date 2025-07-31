const express = require("express");
const cors = require("cors");
const app = express();
const { userRouter } = require("./backend/routes/userRoutes");
require("dotenv").config();
const mongoose = require("mongoose");
const { productRouter } = require("./backend/routes/productRoutes");
const { cartRouter } = require("./backend/routes/cartRoutes");

const DBconnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DB connection successful");
  } catch (err) {
    console.log("MongoDB connection error", err);
    process.exit(1);
  }
};
DBconnection();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);

app.use((error, req, res, next) => {
  console.log("error occured", error.message);
  res.send({ error: error.name, message: error.message });
});

app.listen(process.env.PORT, () =>
  console.log(`Server running on ${process.env.PORT}`)
);
