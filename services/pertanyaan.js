const db = require('../config');

// Mendapatkan semua pertanyaan
const getAllPertanyaan = (callback) => {
    const query = 'SELECT * FROM pertanyaan';
    db.query(query, callback);
};

// Menambahkan pertanyaan baru
const createPertanyaan = (pertanyaanData, callback) => {
    const query = 'INSERT INTO pertanyaan (pertanyaan) VALUES (?)';
    const { pertanyaan } = pertanyaanData;
    db.query(query, [pertanyaan], callback);
};

// Mendapatkan pertanyaan berdasarkan ID
const getPertanyaanId = (id_pertanyaan, callback) => {
    const query = 'SELECT * FROM pertanyaan WHERE id_pertanyaan = ?';
    db.query(query, [id_pertanyaan], callback);
};

// Mengupdate pertanyaan berdasarkan ID
const updatePertanyaanId = (id_pertanyaan, pertanyaanData, callback) => {
    const query = 'UPDATE pertanyaan SET pertanyaan = ? WHERE id_pertanyaan = ?';
    const { pertanyaan } = pertanyaanData;
    db.query(query, [pertanyaan, id_pertanyaan], callback);
};

// Menghapus pertanyaan berdasarkan ID
const deletePertanyaanId = (id_pertanyaan, callback) => {
    const query = 'DELETE FROM pertanyaan WHERE id_pertanyaan = ?';
    db.query(query, [id_pertanyaan], callback);
};

module.exports = {
    getAllPertanyaan,
    createPertanyaan,
    getPertanyaanId,
    updatePertanyaanId,
    deletePertanyaanId,
};
