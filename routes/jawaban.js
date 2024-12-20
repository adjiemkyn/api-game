const express = require('express');
const router = express.Router();
const jawaban = require('../services/jawaban');

// Mendapatkan semua jawaban
router.get('/', (req, res) => {
  jawaban.getAllJawaban((err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Database error' });
      return;
    }
    res.json(results);
  });
});

// Menambahkan jawaban baru
router.post('/', (req, res) => {
  const { user_id, pertanyaan_id, jawaban } = req.body;
  if (!user_id || !pertanyaan_id || !jawaban) {
    res.status(400).json({ error: 'All fields are required' });
    return;
  }
  jawaban.createJawaban({ user_id, pertanyaan_id, jawaban }, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Database error' });
      return;
    }
    res.status(201).json({ id_jawaban: result.insertId, user_id, pertanyaan_id, jawaban });
  });
});

// Mendapatkan jawaban berdasarkan ID
router.get('/:id_jawaban', (req, res) => {
  const { id_jawaban } = req.params;
  jawaban.getJawabanById(id_jawaban, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Database error' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Jawaban not found' });
      return;
    }
    res.json(results[0]);
  });
});

// Mengupdate jawaban berdasarkan ID
router.put('/:id_jawaban', (req, res) => {
  const { id_jawaban } = req.params;
  const { jawaban } = req.body;
  if (!jawaban) {
    res.status(400).json({ error: 'Jawaban is required' });
    return;
  }
  jawaban.updateJawabanById(id_jawaban, { jawaban }, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Database error' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Jawaban not found' });
      return;
    }
    res.json({ message: 'Jawaban updated successfully' });
  });
});

// Menghapus jawaban berdasarkan ID
router.delete('/:id_jawaban', (req, res) => {
  const { id_jawaban } = req.params;
  jawaban.deleteJawabanById(id_jawaban, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Database error' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Jawaban not found' });
      return;
    }
    res.json({ message: 'Jawaban deleted successfully' });
  });
});

module.exports = router;
