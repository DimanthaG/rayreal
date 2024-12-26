const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin');

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  const username = 'admin2';
  const password = 'LokuDee312!';

  await Admin.create({ username, password });
  console.log('Admin user created successfully!');
  mongoose.disconnect();
}).catch(err => console.error('Error:', err));
