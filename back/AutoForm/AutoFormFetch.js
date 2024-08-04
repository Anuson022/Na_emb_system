// fetchFiles.js
const express = require('express');
const pool = require('../na_db'); // Adjust the path as necessary

const fetchRouter = express.Router();

// Fetch files endpoint
fetchRouter.post('/api/autoform', (req, res) => {
  const searchTerm = req.body.search_school;
  let query;
  let queryParams;

  if (searchTerm === undefined) {
    query = `SELECT * FROM school_data`;
    queryParams = [];
  } else {
    query = `SELECT * FROM school_data WHERE name LIKE ?`;
    queryParams = [`%${searchTerm}%`];
  }

  try {
    pool.query(query, queryParams, (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

module.exports = fetchRouter;