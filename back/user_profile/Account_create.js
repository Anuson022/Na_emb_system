// uploadFile.js
const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const pool = require('../na_db'); // Adjust the path as necessary
const { json } = require('body-parser');

const app_router = express.Router();

// Route to upload to profile directory
app_router.post('/api/AcountCreate', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.send('No files were uploaded. no_data');
  }
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
  console.log(username)

  const mysql = "INSERT INTO users (username,password,role,profile) values(?, ?, ?, ?)"
  pool.query(mysql,[username,password,role,ProfilePath],(err,result)=>
    {
      if(err)
        {
          throw err;
        }
    })

});

module.exports = app_router;