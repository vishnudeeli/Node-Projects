const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

// Create MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Register a new user
app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
console.log(username,password);
    const [result] = await pool.promise().query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
    console.log(result);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
});

// Authenticate user and generate JWT token
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const [result] = await pool.promise().query('SELECT * FROM users WHERE username = ?', [username]);
    const user = result[0];

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
});

// Protected route
app.get('/protected', (req, res) => {
    // Verify JWT Token
    const token = req.headers.authorization?.split(' ')[1]; // Extract the token from the Authorization header
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' }); // No token provided
    }
  
    try {
      const decodedToken = jwt.verify(token, 'VishnuVardhan1406@'); // Verify the token using your secret key
      // Optionally, you can also perform additional checks based on the decodedToken, such as checking user roles or permissions
  
      // If the token is valid and the user is authorized, return the protected data
      res.status(200).json({ message: 'This is a protected route' });
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' }); // Token is invalid or expired
    }
  });
  
  
// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
