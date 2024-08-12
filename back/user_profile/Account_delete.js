// deleteFile.js
const express = require('express');
const fs = require('fs');
const pool = require('../na_db'); // Adjust the path as necessary

const deleteRouter = express.Router();

// Delete file endpoint
deleteRouter.delete('/user_delete/:id', (req, res) => {
  let id = req.params.id;
  let sql = "SELECT * FROM users WHERE id = ?";
  pool.query(sql, [id], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      let filePath = './user_profile'+(results[0].profile).slice(1);
      let deleteSql = "DELETE FROM users WHERE id = ?";
      console.log(results[0].profile)
      pool.query(deleteSql, [id], (err, result) => {
        if (err) throw err;
        fs.unlink(filePath, err => {
          if (err) throw err;
          res.send('File deleted!');
        });
      });
    } else {
      res.status(404).send('File not found');
    }
  });
});

module.exports = deleteRouter;
