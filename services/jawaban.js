const db = require('../config');

// Mendapatkan semua jawaban
const getAllJawaban = (callback) => {
    const query = `
    SELECT jawaban.id_jawaban, jawaban.jawaban, 
           user.name AS user_name, 
           pertanyaan.pertanyaan AS pertanyaan_text, 
           jawaban.created_at
    FROM jawaban
    INNER JOIN user ON jawaban.user_id = user.id
    INNER JOIN pertanyaan ON jawaban.pertanyaan_id = pertanyaan.id_pertanyaan
  `;
    db.query(query, callback);
};

// Menambahkan jawaban baru
const createJawaban = (jawabanData, callback) => {
    const query = 'INSERT INTO jawaban (user_id, pertanyaan_id, jawaban) VALUES (?, ?, ?)';
    const { user_id, pertanyaan_id, jawaban } = jawabanData;
    db.query(query, [user_id, pertanyaan_id, jawaban], callback);
};

// Mendapatkan jawaban berdasarkan ID
const getJawabanById = (id_jawaban, callback) => {
    const query = `
    SELECT jawaban.id_jawaban, jawaban.jawaban, 
           user.name AS user_name, 
           pertanyaan.pertanyaan AS pertanyaan_text, 
           jawaban.created_at
    FROM jawaban
    INNER JOIN user ON jawaban.user_id = user.id
    INNER JOIN pertanyaan ON jawaban.pertanyaan_id = pertanyaan.id_pertanyaan
    WHERE jawaban.id_jawaban = ?
  `;
    db.query(query, [id_jawaban], callback);
};

// Mengupdate jawaban berdasarkan ID
const updateJawabanById = (id_jawaban, jawabanData, callback) => {
    const query = 'UPDATE jawaban SET jawaban = ? WHERE id_jawaban = ?';
    const { jawaban } = jawabanData;
    db.query(query, [jawaban, id_jawaban], callback);
};

// Menghapus jawaban berdasarkan ID
const deleteJawabanById = (id_jawaban, callback) => {
    const query = 'DELETE FROM jawaban WHERE id_jawaban = ?';
    db.query(query, [id_jawaban], callback);
};

module.exports = {
    getAllJawaban,
    createJawaban,
    getJawabanById,
    updateJawabanById,
    deleteJawabanById,
};
