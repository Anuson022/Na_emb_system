const express = require('express');
const cors = require('cors')
const mysql1 = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
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
      const sql = 'INSERT INTO images (School_name,path) VALUES (?,?)';
      pool.query(sql, [name,imagePath], (err, result) => {
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
      console.log(results)
    });
  });

pool_insert = (pool_con)=>
    {
        const insert_sql = "INSERT INTO customer_table (Customer_ID,school_name, firstname, lastname, year, type, field_name, silk_color, dotShirt, dotShirt_amount, dotCollar, dotCollar_amount, sameside, amount, parent_name, phone_number, que_order, Status) VALUES (Null,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);"
        pool.query(insert_sql, [
            pool_con.school_name,
            pool_con.firstname,
            pool_con.lastname,
            pool_con.year,
            pool_con.type,
            pool_con.field_name,
            pool_con.silk_color,
            pool_con.dotShirt,
            pool_con.dotShirt_amount,
            pool_con.dotCollar,
            pool_con.dotCollar_amount,
            pool_con.sameside,
            pool_con.amount,
            pool_con.parent_name,
            pool_con.phone_number,
            pool_con.que_order,
            pool_con.Status
        ], 
            (error, result, fields) => {
          if (error) {
            return console.log(error);
          }
          console.log("Success");
        })
    }

const data_queing = async() =>
    {pool.query("UPDATE customer_table SET que_order = Customer_ID;",(error,result,fields)=>{}) }

app1.get('/',(req,res)=>
    {
        res.write("<body style='background-color: black'></body>")
        res.write("<h1 style='background-color: white'>Hello</h1>")
        res.end();
    })

app1.post('/send_customdata',async(req,res)=>
    {
        await console.log(req.body)
        await pool_insert(req.body)
        await data_queing();
        res.json()
    })

app1.listen(5000,()=>
    {
        console.log("Running on port 5000")
    })

