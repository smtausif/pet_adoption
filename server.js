// server.js
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const User = require('./database.js');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('html_pages'));
app.use('/media', express.static(path.join(__dirname, 'media')));


// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/petAdoptionHub', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Signup Route
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    //res.send('<h3>Account created successfully! 🎉 <a href="/login.html">Login Here</a></h3>');
    res.sendFile(path.join(__dirname, 'html_pages', 'account_confirmation.html'))
  } catch (error) {
    res.status(500).send('<h3>Error creating account: Email may already be in use. ❌</h3>');
  }
});

// Login Route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (user && await bcrypt.compare(password, user.password)) {
        // Successful login
        res.redirect('/home.html');
      } else {
        // Invalid login
        res.sendFile(path.join(__dirname, 'html_pages', 'loginagain.html'));
      }
    } catch (error) {
      res.status(500).send('<h3>Error logging in. Please try again later. ❌</h3>');
    }
  });
  

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
