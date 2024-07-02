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
        const json_text = [JSON.stringify(pool_con)];
        const insert_sql = "INSERT INTO customer_data (shirt) VALUES (?);"
        pool.query(insert_sql, [json_text], 
            (error, result, fields) => {
          if (error) {
            return console.log(error);
          }
          console.log("Success");
        })
    }
cus_insert = (obj)=>
    {
        const cus_array = Object.values(obj);
        const insert_sql = "INSERT INTO customer_data (`info`, `parent_name`, `phone_number`) VALUES (?);"
        pool.query(insert_sql, [cus_array], 
            (error, result, fields) => {
          if (error) {
            return console.log(error);
          }
          console.log("Success");
        })
    }
const data_queing = async() =>
    {pool.query(`"ALTER TABLE customer_data AUTO_INCREMENT = 1;

SET @row_number = 0;
UPDATE customer_data SET cus_id = @row_number:=@row_number+1;
ALTER TABLE customer_data AUTO_INCREMENT = 1;

SET @row_number = 0;
UPDATE customer_data SET cus_id = @row_number:=@row_number+1;;"`,(error,result,fields)=>{}) }

app1.get('/',(req,res)=>
    {
        res.write("<body style='background-color: black'></body>")
        res.write("<h1 style='background-color: white'>Hello</h1>")
        res.end();
    })
app1.post('/cus_input',async(req,res)=>
    {
        await console.log(req.body)
        //await console.log(typeof(req.body))
        await cus_insert(req.body.shirt_data)
        await data_queing();
        res.json()
        //customer input
    })

app1.post('/send_customdata',async(req,res)=>
    {
        await console.log(req.body)
        await pool_insert(req.body)
        //await data_queing();
        res.json()
        //storefront input
    })
app1.delete('/delete_cusdata',async(req,res)=>
    {
        await console.log(req.body)
        await pool_insert(req.body)
        //await data_queing();
        res.json()
        //storefront delete
    })
app1.post('/search_cus1', (req, res) => {
  const searchTerm = (req.body.search_value);
  console.log(searchTerm)
  const query = `SELECT * FROM customer_data WHERE cus_id LIKE ?`;
  try {
    pool.query(query, [`%${searchTerm}%`], (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  } catch (error) {
    
  }

});
app1.post('/data_table1', (req, res) => {
  pool.query('SELECT * FROM customer_data', (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});
app1.listen(5000,()=>
    {
        console.log("Running on port 5000")
    })

