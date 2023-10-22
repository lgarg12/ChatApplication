const jwt = require('jsonwebtoken');
const Users = require('../models/Users');
const bcrypt = require('bcrypt');

const SignUp = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
      return res.status(400).json({
        success: false,
        message: 'Incomplete Credentials',
      });
    }

    // Check if a user with the given email already exists
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already registered',
      });
    }

    // Hash the password before saving it to the database
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user with the hashed password
    const newUser = new Users({
      email,
      name,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
    });
  } catch (error) {
    console.error('Error during signup:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};


const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Incomplete credentials',
      });
    }

    // Find the user with the provided email in the database
    const user = await Users.findOne({ email });

    // If the user doesn't exist, return an error
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication failed: User not found',
      });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    // If the passwords don't match, return an error
    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Authentication failed: Invalid password',
      });
    }

    // Generate a JWT token for the authenticated user
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      'lakshay', // Replace with your secret key
      { expiresIn: '1h' } // Set the expiration time as needed
    );

    return res.status(200).json({
      success: true,
      message: 'Authentication successful',
      token: token,
      user
    });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};


module.exports = { SignUp , Login }