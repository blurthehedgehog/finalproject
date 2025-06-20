const User = require('../models/User');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const MAX_ATTEMPTS = 10;
const LOCK_TIME = 15 * 60 * 1000; // 15 წუთი

// REGISTER
exports.registerUser = async (req, res) => {
  const { username, email, password, country } = req.body;

  console.log("Incoming registration:", req.body);

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      country,
    });

    await newUser.save();

    res.status(201).json({
      message: "Registered successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        country: newUser.country,
      },
    });
  } catch (err) {
    console.error("Registration error:", err.message);
    if (err.code === 11000) {
      return res.status(400).json({ message: "Email or Username already exists" });
    }
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
};

// LOGIN
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email and password required" });

  try {
    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({ message: "User not found" });

    // Check lock status
    if (user.lockUntil && user.lockUntil > Date.now()) {
      const remaining = Math.ceil((user.lockUntil - Date.now()) / 60000);
      return res.status(403).json({
        message: `Account is locked. Try again in ${remaining} minutes.`,
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      user.failedLoginAttempts = (user.failedLoginAttempts || 0) + 1;

      if (user.failedLoginAttempts >= MAX_ATTEMPTS) {
        user.lockUntil = new Date(Date.now() + LOCK_TIME);
        await user.save();

        return res.status(403).json({
          message: `Too many failed attempts. Account locked for 15 minutes.`,
        });
      } else {
        await user.save();
        return res.status(400).json({
          message: "Incorrect password",
          attemptsLeft: MAX_ATTEMPTS - user.failedLoginAttempts,
        });
      }
    }

    // Successful login
    user.failedLoginAttempts = 0;
    user.lockUntil = null;
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        country: user.country,
      },
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};
