const express = require('express');
const router = express.Router();
const { SignUp , Login } = require('../Controllers/auth');

// Define a route for signing up
router.post('/signup', SignUp);
router.post('/login', Login);

module.exports = router;
