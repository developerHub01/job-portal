const db = require("../db");

const User = {
  createUser: (name, email, password, callback) => {
    const query = "INSERT INTO Users (name, email, password) VALUES (?, ?, ?)";
    db.query(query, [name, email, password], callback);
  },

  getUserByEmail: (email, callback) => {
    const query = "SELECT * FROM Users WHERE email = ?";
    db.query(query, [email], callback);
  },

  getUserById: (user_id, callback) => {
    const query = "SELECT * FROM Users WHERE user_id = ?";
    db.query(query, [user_id], callback);
  },

  updateUser: (user_id, name, email, callback) => {
    console.log({ user_id, name, email });

    const query = "UPDATE Users SET name = ?, email = ? WHERE user_id = ?";
    db.query(query, [name, email, user_id], callback);
  },

  changePassword: (user_id, newPassword, callback) => {
    const query = "UPDATE Users SET password = ? WHERE user_id = ?";
    db.query(query, [newPassword, user_id], callback);
  },
};

module.exports = User;
