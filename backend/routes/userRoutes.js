const express = require("express");
const userRouter = express.Router();
const { User } = require("../models/userModal");
const bcrypt = require("bcrypt");

// Input validation middleware
const validateUserInput = (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: "Username, email, and password are required" });
  }
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });
  }
  next();
};

userRouter.post("/save-user", validateUserInput, async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Check for existing user
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: `User with email '${email}' already exists` });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save new user
    const newUser = new User({
      username,
      email: email.toLowerCase(),
      password: hashedPassword,
    });
    const savedUser = await newUser.save();

    // Return DummyJSON-like response
    res.status(201).json({
      data: {
        id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
        createdAt: savedUser.createdAt,
      },
      message: "User created successfully",
    });
  } catch (error) {
    next(error);
  }
});

userRouter.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Find user by email
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Return DummyJSON-like response
        res.status(200).json({
            data: {
                id: user._id,
                username: user.username,
                email: user.email,
                createdAt: user.createdAt,
            },
            message: "Login successful",
        });
    } catch (error) {
        next(error);
    }
});

// Error handling middleware
userRouter.use((error, req, res, next) => {
  res.status(500).json({
    message: "Server error",
    error: error.message,
  });
});



module.exports = { userRouter };
