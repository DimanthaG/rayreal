const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Admin } = require('../models/Admin');

const router = express.Router();

// Admin Login Endpoint
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });

  if (!admin || !bcrypt.compareSync(password, admin.password)) {
    return res.status(401).send({ message: 'Invalid credentials.' });
  }

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.send({ token });
});

module.exports = router;
