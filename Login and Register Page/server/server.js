const express = require('express');
const bcrypt = require('bcrypt');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// Create MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'your_mysql_username',
  password: 'your_mysql_password',
  database: 'your_database_name',
});

// Connect to the database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to the database');
});

// Parse incoming request bodies as JSON
app.use(bodyParser.json());

// Handle login request
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Retrieve user from the database based on the username
  const sql = `SELECT * FROM users WHERE username = ?`;
  db.query(sql, [username], (err, results) => {
    if (err) {
      throw err;
    }

    if (results.length === 0) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const user = results[0];

    // Compare the provided password with the hashed password stored in the database
    bcrypt.compare(password, user.password, (bcryptErr, bcryptResult) => {
      if (bcryptErr) {
        throw bcryptErr;
      }

      if (!bcryptResult) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }

      // User authenticated successfully
      return res.status(200).json({ message: 'Login successful' });
    });
  });
});

// Handle register request
app.post('/api/register', (req, res) => {
  const { username, password } = req.body;

  // Hash the password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      throw err;
    }

    // Store the user in the database
    const sql = `INSERT INTO users (username, password) VALUES (?, ?)`;
    db.query(sql, [username, hashedPassword], (insertErr) => {
      if (insertErr) {
        throw insertErr;
      }

      return res.status(201).json({ message: 'Registration successful' });
    });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
