// localhost:3000/view-appointments
//this is for admin to check the appoinments

// server.js
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const User = require('./database.js');
const path = require('path');

const app = express();
const PORT = 3000;

//for hunter.io api to see if the email exists or not in real life
const axios = require('axios');
const emailValidator = require("email-validator");

const HUNTER_API_KEY = "395c58efc94705b4750d4b239ff4dd01ddf36e10"; // Replace this with your key

// Middleware 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'html_pages')));
app.use('/media', express.static(path.join(__dirname, 'media')));
app.use('/js', express.static(path.join(__dirname, 'js')));


// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/petAdoptionHub', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Signup Route
app.post('/signup', async (req, res) => {
    let { name, email, password, confirm_password } = req.body;

    // If password comes as an array, take the first value
    if (Array.isArray(password)) {
        password = password[0];
    }
    if (Array.isArray(confirm_password)) {
        confirm_password = confirm_password[0];
    }

    console.log("Received Signup Request:", req.body);

    if (!password) {
        return res.status(400).send('<h3>Password is required. ❌</h3><a href="/signup.html">Try Again</a>');
    }

    if (password !== confirm_password) {
        return res.status(400).send('<h3>Passwords do not match. ❌</h3><a href="/signup.html">Try Again</a>');
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).send('<h3>Password must be at least 8 characters long and include letters, numbers, and special characters. ❌</h3><a href="/signup.html">Try Again</a>');
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.sendFile(path.join(__dirname, 'html_pages', 'account_confirmation.html'));
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).send('<h3>Error creating account. Please try again later. ❌</h3>');
    }
});




// Login Route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          // ✅ Successful login: Redirect to home.html
          res.redirect('/home.html');
        } else {
          // ❌ Wrong password: Show loginagain.html
          res.sendFile(path.join(__dirname, 'html_pages', 'loginagain.html'));
        }
      } else {
        // ❌ User not found: Show loginagain.html
        res.sendFile(path.join(__dirname, 'html_pages', 'loginagain.html'));
      }
    } catch (error) {
      res.status(500).send('<h3>Error logging in. Please try again later. ❌</h3>');
    }
  });
  
// Serve Adoption Form
app.get('/adopt.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'html_pages', 'adopt.html'));
});

//appoinment form handling
const Appointment = require('./js/appointment.js');

// Function to generate a unique appointment code
function generateAppointmentCode() {
  return 'APT' + Math.random().toString(36).substring(2, 10).toUpperCase();
}

// Book Appointment Route
app.post('/book-appointment', async (req, res) => {
  const { name, email, animal } = req.body;
  const appointmentCode = generateAppointmentCode();

  try {
    const newAppointment = new Appointment({
      name,
      email,
      animal,
      appointmentCode,
    });

    await newAppointment.save();
    
    res.send(`<h3>Appointment Booked! ✅ Your Appointment Code: <strong>${appointmentCode}</strong><br>
      Show this code on your visit. <br><a href="/home.html">Back to Listings</a></h3>`);
  } catch (error) {
    res.status(500).send('<h3>Error booking appointment. Please try again later. ❌</h3>');
  }
});

// View All Appointments Route (with Delete Button)
app.get('/view-appointments', async (req, res) => {
    try {
      const appointments = await Appointment.find({});
      
      let appointmentList = `
        <h2 style="text-align:center; font-family:sans-serif;">📋 All Booked Appointments</h2>
        <table border="1" cellpadding="10" style="width:80%; margin: 20px auto; border-collapse: collapse; font-family:sans-serif;">
          <tr style="background-color:#f0f0f0;">
            <th>Name</th>
            <th>Email</th>
            <th>Animal</th>
            <th>Appointment Code</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>`;
  
      appointments.forEach(app => {
        appointmentList += `
          <tr>
            <td>${app.name}</td>
            <td>${app.email}</td>
            <td>${app.animal}</td>
            <td style="font-weight:bold;">${app.appointmentCode}</td>
            <td>${new Date(app.appointmentDate).toLocaleString()}</td>
            <td>
              <form action="/delete-appointment" method="POST" style="display:inline;">
                <input type="hidden" name="id" value="${app._id}">
                <button type="submit" style="
                  background-color:red; 
                  color:white; 
                  border:none; 
                  padding:5px 10px; 
                  cursor:pointer; 
                  font-size:12px;">
                  🗑️ Delete
                </button>
              </form>
            </td>
          </tr>`;
      });
  
      appointmentList += `</table>
        <div style="text-align:center;">
          <a href="/home.html" style="text-decoration:none; color:blue;">Back to Home</a>
        </div>`;
      
      res.send(appointmentList);
    } catch (error) {
      res.status(500).send('<h3>Error fetching appointments. ❌</h3>');
    }
  });
  

// Delete Appointment Route
app.post('/delete-appointment', async (req, res) => {
    const { id } = req.body;
    try {
      await Appointment.findByIdAndDelete(id);
      res.redirect('/view-appointments');
    } catch (error) {
      res.status(500).send('<h3>Error deleting appointment. ❌</h3>');
    }
  });
   


// Start Server
app.listen(PORT, () => {
    console.log(`✅ Server is running at http://localhost:${PORT}`);
});
