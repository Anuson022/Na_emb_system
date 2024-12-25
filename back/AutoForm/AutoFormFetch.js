// fetchFiles.js
const express = require('express');
const pool = require('../na_db'); // Adjust the path as necessary

const fetchRouter = express.Router();

// Fetch files endpoint
fetchRouter.get('/autoform', (req, res) => {
  const searchTerm = req.query.search_school;
  let query;
  let queryParams;

  if (searchTerm === undefined) {
    query = `SELECT * FROM school_data`;
    queryParams = [];
  } else {
    query = `SELECT * FROM school_data WHERE school_name LIKE ?`;
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
fetchRouter.post('/autoform_add', (req, res) => {
  const insert_name = req.body.SchoolName;
  const insert_data = JSON.stringify(req.body.formdata);
  const mysql_insert = "INSERT INTO school_data (school_name,school_form) VALUES (?,?)"
  try {
    pool.query(mysql_insert,[insert_name,insert_data], (err, results) => {
      if (err) throw err;
      res.json(results);
      console.log("Success");
    })
  } catch (error) 
  {
    
  }
});

fetchRouter.get("/get_formID", async (req, res) => {
  console.log(req.query);
  const query = `SELECT * FROM school_data WHERE SC_ID = ?`;
  try {
    pool.query(query, [req.query.id], (err, results) => {
      if (err) throw err;
      res.json(results);
      console.log(results);
    });
  } catch (error) {}
});

fetchRouter.post('/autoform_edit', (req, res) => {
  const insert_id = req.body.school_ID;
  const insert_name = req.body.SchoolName;
  const insert_data = JSON.stringify(req.body.formdata);
  const mysql_update = "UPDATE school_data SET school_form = ?, school_name = ? WHERE SC_ID = ?"
  try {
    pool.query(mysql_update,[insert_data,insert_name,insert_id], (err, results) => {
      if (err) throw err;
      res.json(results);
      console.log("Success_Edit");
    })
  } catch (error) { }
  
});

fetchRouter.delete('/autoform_delete/:id', (req, res) => {
  let id = req.params.id;
  let sql = "SELECT * FROM school_data WHERE SC_ID = ?";
  pool.query(sql, [id], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      let deleteSql = "DELETE FROM school_data WHERE SC_ID = ?";
      pool.query(deleteSql, [id], (err, result) => {
        if (err) throw err;
      });
    } else {
      res.status(404).send('File not found');
    }
  });
});
module.exports = fetchRouter;