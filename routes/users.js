const express = require('express');
const router = express.Router();
const userService = require('../services/users');

// Mendapatkan semua user
router.get('/', (req, res) => {
    userService.getAllUsers((err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        res.json(results);
    });
});

// Menambahkan user baru
router.post('/', (req, res) => {
    const { name } = req.body;
    if (!name) {
        res.status(400).json({ error: 'All fields are required' });
        return;
    }
    userService.createUser({ name }, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        res.status(201).json({ id: result.insertId, name });
    });
});

// Mendapatkan user berdasarkan ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    userService.getUserById(id, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.json(results[0]);
    });
});

// Mengupdate user berdasarkan ID
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    userService.updateUserById(id, { name }, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.json({ message: 'User updated successfully' });
    });
});

// Menghapus user berdasarkan ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    userService.deleteUserById(id, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.json({ message: 'User deleted successfully' });
    });
});

module.exports = router;
