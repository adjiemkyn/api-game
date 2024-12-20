const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
const pertanyaanRoutes = require('./routes/pertanyaan');
const jawabanRoutes = require('./routes/jawaban');

const app = express();
app.use(bodyParser.json());

// Endpoint utama
app.use('/users', userRoutes);

// Route untuk pertanyaan
app.use('/pertanyaan', pertanyaanRoutes);

// Route untuk jawaban
app.use('/jawaban', jawabanRoutes);


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
