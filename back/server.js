const express = require('express');
const cors = require('cors')
const mysql1 = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const fileUpload = require('express-fileupload');
const { error } = require('console');
const fs = require('fs');

const app1 = express();

app1.use(cors())
app1.use(bodyParser.json())
// Enable files upload
app1.use(fileUpload({
  createParentPath: true
}));
// Add other middleware if needed
app1.use(express.json());
app1.use(express.urlencoded({ extended: true }));
// Serve static files
app1.use('/uploads', express.static(path.join(__dirname, 'uploads')));

var pool =mysql1.createPool({
    connectionLimit : 10,
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'na_database'
});

// Upload endpoint
app1.post('/upload', (req, res) => {
  if (!req.files || !req.body.name) {
      return res.status(400).send('No files or name were uploaded.');
  }
  let file = req.files.file;
  let fileName = req.body.name;
  let uploadPath = './uploads/' + file.name;

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

// Fetch files endpoint
app1.post('/files', (req, res) => {
  const searchTerm = (req.body.search_name)
  console.log(searchTerm)
  if(searchTerm == null)
    {
      const query = `SELECT * FROM files`;
      try {
        pool.query(query, (err, results) => {
          if (err) throw err;
          res.json(results);
        });
      } catch (error) {}
    }
  else
  {
    const query = `SELECT * FROM files WHERE name LIKE ?`;
    try {
      pool.query(query, [`%${searchTerm}%`], (err, results) => {
        if (err) throw err;
        res.json(results);
      });
    } catch (error) {}
  }

});

// Delete file endpoint
app1.delete('/files/:id', (req, res) => {
  let id = req.params.id;
  let sql = "SELECT * FROM files WHERE id = ?";
  pool.query(sql, [id], (err, results) => {
      if (err) throw err;
      if (results.length > 0) {
          let filePath = results[0].path;
          let sql = "DELETE FROM files WHERE id = ?";
          pool.query(sql, [id], (err, result) => {
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

adm_update = (cus_input,formdata,order)=>
    {
      const json_form = [JSON.stringify(formdata)];
      const json_order = [JSON.stringify(formdata)];
      const update_cus =
        "UPDATE customer_data SET info=?,parent_name=?,phone_number=?,status=? WHERE cus_id = ?";
      const update_form = "UPDATE customer_data SET shirt=? WHERE cus_id = ?";
      const update_order = "UPDATE customer_data SET cus_order=? WHERE cus_id = ?";
      // First update query
      pool.query(
        update_cus,
        [
          cus_input.info,
          cus_input.parent_name,
          cus_input.phone_number,
          cus_input.status,
          cus_input.cus_id,
        ],
        (error, result) => {
          if (error) {
            return console.log(error);
          }

          // Second update query within the callback of the first query
          pool.query(
            update_form,
            [json_form, cus_input.cus_id],
            (error, result) => {
              if (error) {
                return console.log(error);
              }

              // Third update query within the callback of the second query
              pool.query(
                update_order,
                [json_order, cus_input.cus_id],
                (error, result) => {
                  if (error) {
                    return console.log(error);
                  }

                  console.log("Success");
                }
              );
            }
          );
        }
      );
    }
cus_insert = (obj)=>
    {
        const cus_array = Object.values(obj);
        const insert_sql = "INSERT INTO customer_data (`info`, `parent_name`, `phone_number`,`status`) VALUES (?);"
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
const adm_delete = async(cus_id) =>
  {
    const delete_sql = "DELETE FROM customer_data WHERE cus_id = ?"
    pool.query(delete_sql,[cus_id],(error,result,fields)=>
      {
      if (error) {
        return console.log(error);
      }
      console.log("Success");
      })
  }
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
        await cus_insert(req.body)
        await data_queing();
        res.json()
        //customer input
    })

app1.post('/update_customdata',async(req,res)=>
    {
        await console.log()
        const cus_data = req.body.formdata_cus
        const shirt = req.body.formdata
        const orders = req.body.orders
        await adm_update(cus_data,shirt,orders);
        res.json()
        //storefront input
    })
app1.post('/delete_cusdata',async(req,res)=>
    {
        //await console.log(req.body.popupData)
        adm_delete(req.body.popup_delete)
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

app1.post('/data_tester', (req, res) => {
  console.log(req.body)
});
app1.listen(5000,()=>
    {
        console.log("Running on port 5000")
    })

