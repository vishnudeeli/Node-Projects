const connection = require('../db');

function addUser(user) {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO users SET ?', user, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

function getUserByUsername(username) {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM users WHERE username = ?', [username], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results[0]);
      }
    });
  });
}

function comparePasswords(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}

module.exports = { addUser, getUserByUsername, comparePasswords };
