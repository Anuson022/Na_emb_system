// uploadFile.js
const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const pool = require('../na_db'); // Adjust the path as necessary

const app_router = express.Router();

// Enable files upload
app_router.use(fileUpload({
  createParentPath: true
}));

// Serve static files
app_router.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Upload endpoint
app_router.post('/upload', (req, res) => {
  if (!req.files || !req.body.name) {
    return res.status(400).send('No files or name were uploaded.');
  }

  let file = req.files.file;
  let fileName = req.body.name;
  let uploadPath = './function_server/uploads/' + file.name;

  // Use the mv() method to place the file somewhere on your server
  file.mv(uploadPath, err => {
    if (err) {
      return res.status(500).send(err);
    }

    let sql = "INSERT INTO files (name, path) VALUES (?, ?)";
    let values = [fileName, uploadPath];
    pool.query(sql, values, (err, result) => {
      if (err) throw err;
      res.send('File uploaded and saved to database!');
    });
  });
});

module.exports = app_router;