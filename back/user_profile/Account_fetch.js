// fetchFiles.js
const express = require('express');
const pool = require('../na_db'); // Adjust the path as necessary

const fetchRouter = express.Router();

// Fetch files endpoint
fetchRouter.post('/users_account', (req, res) => {
  const searchTerm = req.body.searching;
  console.log(searchTerm)
  let query;
  let queryParams;

  if (searchTerm === undefined) {
    query = `SELECT * FROM users`;
    queryParams = [];
  } 
  else {
    query = `SELECT * FROM users WHERE username LIKE ?`;
    queryParams = [`%${searchTerm}%`];
    console.log('t1r')
  }
  try {
    pool.query(query, queryParams, (err, results) => {
      if (err) throw err;
      console.log('tr')
      res.json(results);
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

module.exports = fetchRouter;