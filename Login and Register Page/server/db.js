const mysql = require('mysql');
const config = require('./config');

const connection = mysql.createConnection(config);

connection.connect((error) => {
  if (error) {
    console.error('Error connecting to database:', error);
  } else {
    console.log('Connected to database');
  }
});

module.exports = connection;
