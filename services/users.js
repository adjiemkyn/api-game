const db = require('../config');

// Mendapatkan semua user
const getAllUsers = (callback) => {
    const query = 'SELECT * FROM user';
    db.query(query, callback);
};

// Menambahkan user baru
const createUser = (userData, callback) => {
    const query = 'INSERT INTO user (name, email, password) VALUES (?, ?, ?)';
    const { name, email, password } = userData;
    db.query(query, [name, email, password], callback);
};

// Mendapatkan user berdasarkan ID
const getUserById = (id, callback) => {
    const query = 'SELECT * FROM user WHERE id = ?';
    db.query(query, [id], callback);
};

// Mengupdate user berdasarkan ID
const updateUserById = (id, userData, callback) => {
    const query = 'UPDATE user SET name = ?, email = ?, password = ? WHERE id = ?';
    const { name, email, password } = userData;
    db.query(query, [name, email, password, id], callback);
};

// Menghapus user berdasarkan ID
const deleteUserById = (id, callback) => {
    const query = 'DELETE FROM user WHERE id = ?';
    db.query(query, [id], callback);
};

module.exports = {
    getAllUsers,
    createUser,
    getUserById,
    updateUserById,
    deleteUserById,
};
