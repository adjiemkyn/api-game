const express = require('express');
const router = express.Router();
const pertanyaan = require('../services/pertanyaan');

// Mendapatkan semua pertanyaan
router.get('/', (req, res) => {
    pertanyaan.getAllPertanyaan((err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        res.json(results);
    });
});

// Menambahkan pertanyaan baru
router.post('/', (req, res) => {
    const { pertanyaan } = req.body;
    if (!pertanyaan) {
        res.status(400).json({ error: 'Pertanyaan is required' });
        return;
    }
    pertanyaan.createPertanyaan({ pertanyaan }, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        res.status(201).json({ id_pertanyaan: result.insertId, pertanyaan });
    });
});

// Mendapatkan pertanyaan berdasarkan ID
router.get('/:id_pertanyaan', (req, res) => {
    const { id_pertanyaan } = req.params;
    pertanyaan.getPertanyaanById(id_pertanyaan, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Pertanyaan not found' });
            return;
        }
        res.json(results[0]);
    });
});

// Mengupdate pertanyaan berdasarkan ID
router.put('/:id_pertanyaan', (req, res) => {
    const { id_pertanyaan } = req.params;
    const { pertanyaan } = req.body;
    if (!pertanyaan) {
        res.status(400).json({ error: 'Pertanyaan is required' });
        return;
    }
    pertanyaan.updatePertanyaanById(id_pertanyaan, { pertanyaan }, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Pertanyaan not found' });
            return;
        }
        res.json({ message: 'Pertanyaan updated successfully' });
    });
});

// Menghapus pertanyaan berdasarkan ID
router.delete('/:id_pertanyaan', (req, res) => {
    const { id_pertanyaan } = req.params;
    pertanyaan.deletePertanyaanById(id_pertanyaan, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Pertanyaan not found' });
            return;
        }
        res.json({ message: 'Pertanyaan deleted successfully' });
    });
});

module.exports = router;
