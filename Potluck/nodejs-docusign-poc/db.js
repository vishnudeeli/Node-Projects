const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Vishnu1406@',
  database: 'docusign'
});

connection.connect((error) => {
  if (error) {
    console.error('Error connecting to MySQL:', error);
    return;
  }
  console.log('Connected to MySQL database');
});

module.exports = connection;
