// uploadFile.js
const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const pool = require('../na_db'); // Adjust the path as necessary
const bodyParser = require('body-parser')
const app_router = express.Router();

// Enable files upload
app_router.use(fileUpload({
  createParentPath: true
}));

app_router.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
// Serve static files
app_router.use('/profile', express.static(path.join(__dirname, 'profile')));

// Upload endpoint
app_router.post('/profile_create', (req, res) => {
  
 /* if (!req.files) {
    return res.status(400).send('No files or userdata were uploaded.');
  }*/
 //console.log(req.file)
  /*let file = req.files.file;
  let uploadPath = './user_profile/profile/' + file.name;
  const {username,password,role} = req.body
  let values = [uploadPath];
  console.log(username,password,role)
  console.log(values)
  /*
  // Use the mv() method to place the file somewhere on your server
  file.mv(uploadPath, err => {
    if (err) {
      return res.status(500).send(err);
    }

    let sql = "INSERT INTO users (username,password,role,path) VALUES (?,?,?,?)";
    const {username,password,role} = req.body
    let values = [uploadPath];

    pool.query(sql, values, (err, result) => {
      if (err) throw err;
      res.send('File uploaded and saved to database!');
    });
  });*/
});


module.exports = app_router;