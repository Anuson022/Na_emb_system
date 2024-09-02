// uploadFile.js
const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const pool = require('../na_db'); // Adjust the path as necessary
const fs = require('fs');


const app_router = express.Router();

// API endpoint to fetch user data
app_router.post('/api/account_edit_get', (req, res) => {
  const userId = req.body.ID; // assuming you're sending the user ID in the request body
  // SQL query to fetch user data by ID
  const query = 'SELECT * FROM users WHERE id = ?';

  pool.query(query, [userId], (err, result) => {
    if (err) {
      console.error('Error fetching user data:', err);
      res.status(500).send('Error fetching user data');
      return;
    }
    
    res.json(result); // Send the fetched user data as JSON
  });
});
// Route to upload to profile directory
app_router.post('/api/AcountEdit', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    const {username,password,role} = JSON.parse(req.body.AccountData)
    const ID = req.body.EditID
    console.log(ID)
    const mysql = "UPDATE users SET username = ?, password = ?, role = ? WHERE id = ?"
    pool.query(mysql,[username,password,role,ID],(err,result)=>
      {
        if(err)
          {
            throw err;
          }
        console.log(result)
      })
  }
  else if (req.files || Object.keys(req.files).length > 0) {
    const ID = req.body.EditID
    let sql = "SELECT * FROM users WHERE id = ?";
    pool.query(sql, [ID], (err, results) => {
      if (err) throw err;
      if (results.length > 0) {
        let filePath = './user_profile'+(results[0].profile).slice(1);
          fs.unlink(filePath, err => {});
      }
    });

    const profileFile = req.files.file;
    let encodedFilename = Buffer.from(profileFile.name, 'latin1').toString('utf8');
    let uploadPath = path.join(__dirname, 'profile', encodedFilename);
    console.log(uploadPath)
    console.log(encodedFilename)
    profileFile.mv(uploadPath, (err) => {
      if (err) return res.status(500).send(err);
      res.send('Profile file uploaded!');
    });
  
    const {username,password,role} = JSON.parse(req.body.AccountData)
    const ProfilePath = "./profile/" + encodedFilename
    console.log(ID)
  
    const mysql = "UPDATE users SET username = ?, password = ?, role = ?, Profile = ? WHERE id = ?"
    pool.query(mysql,[username,password,role,ProfilePath,ID],(err,result)=>
      {
        if(err)
          {
            throw err;
          }
        console.log(result)
      })
  }
});

module.exports = app_router;