const router = require("express").Router();
const { User, generateToken } = require("../Model/User");
const bcrypt = require("bcrypt");

// Signup router
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user has provided all required details
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please provide all details" });
    }

    // Check if user already exist or not
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exist" });

    // Hashing password
    const hashedPassword = await bcrypt.hash(password,10)

    // If user doesn't exist create new user
    const newUser = await User.create({
      name,
      email,
      password:hashedPassword,
    });

    // User for generating jwt token
    const user_for_token = {
      _id:newUser._id,
      name,
      email
    }

    // Generate token 
    const token = generateToken(user_for_token);

    // return response
    return res.status(200).json({ message: "Successfully registered", token });
  
} catch (error) {
    console.log("Signup error", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// Log in router
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user has provided all required details
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide all details" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // User for generating jwt token
    const user_for_token = {
      _id:user._id,
      name:user.name,
      email:user.email
    }

    // Generate token if credentials are valid
    const token = generateToken(user_for_token);

    // Return response with token
    return res.status(200).json({ message: 'Successfully logged in', token });
  
} catch (error) {
    console.log("Login error", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
