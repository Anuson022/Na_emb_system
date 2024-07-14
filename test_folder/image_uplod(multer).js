const express = require('express');
const cors = require('cors')
const mysql1 = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const { error } = require('console');
const app1 = express();

app1.use(cors())
app1.use(bodyParser.json())
app1.use('/uploads', express.static(path.join(__dirname, 'uploads')));

var pool =mysql1.createPool({
    connectionLimit : 10,
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'na_database'
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage }).single('image');

app1.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const imagePath = `/uploads/${req.file.filename}`;
    const name = req.body.image_name;
    const sql = 'INSERT INTO images (School_name, path) VALUES (?, ?)';
    pool.query(sql, [name, imagePath], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json({ message: 'Image uploaded successfully', path: imagePath });
    });
  });
});

app1.get('/images', (req, res) => {
  const sql = 'SELECT * FROM images';
  pool.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
    console.log(results);
  });
});

app1.delete('/images/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM images WHERE id = ?';
  pool.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Image deleted successfully' });
  });
});