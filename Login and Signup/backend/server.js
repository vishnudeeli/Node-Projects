const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Vishnu1406@',
  port: 3306,
  database: 'test',
});

const startServer = () => {
  db.connect((err) => {
    if (err) {
      console.error('Error connecting to the database: ', err);
      return;
    }
    console.log('Connected to the database');

    app.listen(3001, () => {
      console.log('Server listening on port 3001');
    });
  });
};

if (require.main === module) {
  // If the server.js file is run directly, start the server
  startServer();
}

app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;
  const sql = 'INSERT INTO login (name, email, password) VALUES (?, ?, ?)';
  const values = [name, email, password];

  db.query(sql, values, (err, data) => {
    if (err) {
      console.error('Error inserting data: ', err);
      return res.status(500).json({ error: 'Failed to sign up' });
    }
    return res.json({ message: 'Signup successful' });
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM login WHERE email = ? AND password = ?';
  const values = [email, password];

  db.query(sql, values, (err, data) => {
    if (err) {
      console.error('Error retrieving data: ', err);
      return res.status(500).json({ error: 'Failed to log in' });
    }
    if (data.length > 0) {
      return res.json({ message: 'Success' });
    } else {
      return res.json({ message: 'Login failed' });
    }
  });
});

module.exports = app;
module.exports.startServer = startServer;
