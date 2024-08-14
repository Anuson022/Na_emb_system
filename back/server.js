const express = require("express");
const cors = require("cors");
//const mysql1 = require('mysql');
const bodyParser = require("body-parser");
const path = require("path");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const pool = require("./na_db");
const router_imageUpload = require("./function_server/Image_uploader");
const router_fileFetcher = require("./function_server/Image_fetcher");
const router_imageDelete = require("./function_server/Image_delete");
const router_autoFetcher = require('./AutoForm/AutoFormFetch')

const router_AccountFetcher = require("./user_profile/Account_fetch")
const router_AccountCreater = require("./user_profile/Account_create")
const router_AccountEdit = require("./user_profile/Account_edit")
const router_AccountDeleter = require("./user_profile/Account_delete")

const router_NewOrderFetcher = require("./NewOrder/NewOrderFetch")
const router_CusGetQue = require("./CusGetQue/CusGetQue")
const router_CusCurrentQue = require("./CusGetQue/CurrentQue")

const router_StatisticData = require("./StatisticData/StatisticCustomerData")
const router_StatisticPrice = require("./StatisticData/StatisticPriceData")

const app1 = express();

app1.use(cors());
app1.use(bodyParser.json());

// Add other middleware if needed
app1.use(express.json());
app1.use(express.urlencoded({ extended: true }));

app1.use(fileUpload())

app1.use(router_imageUpload); //image uploader
app1.use(router_fileFetcher); //image file search
app1.use(router_imageDelete); //Image delete

app1.use(router_autoFetcher) //autoform

app1.use(router_NewOrderFetcher) //new ordercheck

app1.use(router_AccountFetcher) //account fetch

app1.use(router_AccountCreater) //account create
app1.use(router_AccountEdit) //account edit
app1.use(router_AccountDeleter) //account delete


app1.use(router_StatisticData) //Stat
app1.use(router_StatisticPrice) //stat price

app1.use(router_CusGetQue)
app1.use(router_CusCurrentQue)


// Ensure new directories exist
const directories = ['user_profile/profile', 'function_server/uploads'];
directories.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Serve static files from the directories
app1.use('/profile', express.static(path.join(__dirname, 'user_profile/profile')));
app1.use('/uploads', express.static(path.join(__dirname, 'function_server/uploads')));

const JWT_SECRET = "JWTMAYBE"

app1.post("/na_login",(req,res)=>
  {
    const username = req.body.Username
    const password = req.body.Password
    if(!username || !password)
      {
        return res.status(400).json({message:"Need password and username"})
      }
      
        pool.query("SELECT * FROM users WHERE username = ?",username,(err,results)=>
          {
            if(err)
              {return res.json({message:"Username or Password is incorrect"})}
            console.log(results)
            if(results.length === 0)
              {
                console.log("There no this username")
                return res.json({message:"There no this username"})
              }
            const user = results[0];
            if(password != user.password)
              {
                console.log(password,user.password)
                return res.json({message:"Username or Password is incorrect"})
              }
                const token = jwt.sign({id:user.id,username:user.username,password:user.password,role:user.role},
                  JWT_SECRET,{expiresIn : '1m'})
                res.json({token,user})
                console.log('login_succes')
          })

  })





// Get all queue items
app1.get('/queue', (req, res) => {
  pool.query('SELECT * FROM queue', (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.send(results);
  });
});

// Insert a new item
app1.post('/queue', (req, res) => {
  const { name } = req.body;
  pool.query('INSERT INTO queue (name) VALUES (?)', [name], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.send(results);
  });
});

// Delete an item and reset IDs
app1.delete('/queue/:id', (req, res) => {
  const { id } = req.params;
  pool.query('DELETE FROM queue WHERE id = ?', [id], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }

    // Update subsequent rows to shift IDs
    pool.query('UPDATE queue SET id = id - 1 WHERE id > ?', [id], err => {
      if (err) {
        res.status(500).send(err);
        return;
      }

      // Reset auto increment
      pool.query('ALTER TABLE queue AUTO_INCREMENT = 1', err => {
        if (err) {
          res.status(500).send(err);
          return;
        }
        res.send(results);
      });
    });
  });
});









cus_insert = (shirt_data, obj) => {
  return new Promise((resolve, reject) => {
    const json_data = [JSON.stringify(shirt_data)];
    const cus_array = Object.values(obj);
    const insert_value = [...cus_array, json_data];
    const insert_sql =
      "INSERT INTO customer_data (`info`, `parent_name`, `phone_number`,`status`,`shirt`) VALUES (?);";
    pool.query(insert_sql, [insert_value], (error, result, fields) => {
      if (error) {
        return console.log(error);
        reject(error);
      }
      console.log("Success");
      resolve(result);
    });
  });
};

adm_update = (cus_input, formdata, order ,SumPrice,IsPaid) => {
  const json_form = [JSON.stringify(formdata)];
  const json_order = [JSON.stringify(order)];
  const PricePaidValue = [SumPrice,IsPaid,cus_input.cus_id];
  const update_cus =
    "UPDATE customer_data SET info=?,parent_name=?,phone_number=?,status=? WHERE cus_id = ?";
  const update_form = "UPDATE customer_data SET shirt=? WHERE cus_id = ?";
  const update_order = "UPDATE customer_data SET cus_order=? WHERE cus_id = ?";
  const update_Paid_Price = "UPDATE customer_data SET price = ?, is_paid = ? WHERE cus_id = ?";
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
        }
      );
      // Third update query within the callback of the second query
      pool.query(
        update_order,
        [json_order, cus_input.cus_id],
        (error, result) => {
          if (error) {
            return console.log(error);
          }
          console.log(json_order);
          console.log("success");
        }
      );
            // Fourth update query within the callback of the second query
      pool.query(
        update_Paid_Price,
        PricePaidValue,
        (error, result) => {
          if (error) {
            return console.log(error);
          }
          console.log(result);
          console.log("success");
        }
      );
    }
  );
};
adm_FullInsert = (cus_input, formdata, order, SumPrice, IsPaid) => {
  const json_form = JSON.stringify(formdata);
  const json_order = JSON.stringify(order);
  const PricePaidValue = [cus_input.cus_id, SumPrice, IsPaid];
  const insert_cus =
    "INSERT INTO customer_data (info, parent_name, phone_number, status) VALUES (?, ?, ?, ?)";
  const insert_form = "INSERT INTO customer_data (shirt) VALUES (?)";
  const insert_order = "INSERT INTO customer_data (cus_order) VALUES (?)";
  const insert_Paid_Price = "INSERT INTO customer_data (price, is_paid) VALUES (?, ?)";
  
  // First insert query
  pool.query(
    insert_cus,
    [
      cus_input.cus_id,
      cus_input.info,
      cus_input.parent_name,
      cus_input.phone_number,
      cus_input.status,
    ],
    (error, result) => {
      if (error) {
        return console.log(error);
      }

      // Second insert query within the callback of the first query
      pool.query(
        insert_form,
        [cus_input.cus_id, json_form],
        (error, result) => {
          if (error) {
            return console.log(error);
          }
        }
      );

      // Third insert query within the callback of the second query
      pool.query(
        insert_order,
        [cus_input.cus_id, json_order],
        (error, result) => {
          if (error) {
            return console.log(error);
          }
          console.log(json_order);
          console.log("success");
        }
      );

      // Fourth insert query within the callback of the third query
      pool.query(
        insert_Paid_Price,
        PricePaidValue,
        (error, result) => {
          if (error) {
            return console.log(error);
          }
          console.log(result);
          console.log("success");
        }
      );
    }
  );
};

const data_queing = async () => {
  await pool.query("SET  @num := 0;");
  await pool.query("UPDATE customer_data SET cus_id = @num := (@num+1);");
  await pool.query(`ALTER TABLE customer_data AUTO_INCREMENT =1;`);
  console.log("asf");
};

const adm_delete = async (cus_id,res) => {

  pool.query('DELETE FROM customer_data WHERE cus_id = ?', [cus_id], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }

    // Update subsequent rows to shift IDs
    pool.query('UPDATE customer_data SET cus_id = cus_id - 1 WHERE cus_id > ?', [cus_id], err => {
      if (err) {
        res.status(500).send(err);
        return;
      }

      // Reset auto increment
      pool.query('ALTER TABLE customer_data AUTO_INCREMENT = 1', err => {
        if (err) {
          res.status(500).send(err);
          return;
        }
        res.send(results);
      });
    });
  });
};
app1.get("/", (req, res) => {
  res.write("<body style='background-color: black'></body>");
  res.write("<h1 style='background-color: white'>Hello</h1>");
  res.end();
});
app1.post("/cus_input", async (req, res) => {
  const Shirt_data = req.body.Combine_shirt;
  const Cus_info = req.body.formdata_info;
  //await console.log(req.body);
  //await console.log(typeof(req.body))
  await cus_insert(Shirt_data, Cus_info);
  res.send('Success');
  //customer input
});
app1.post("/insert_customdata", async (req, res) => {
  await console.log();
  const cus_data = req.body.formdata_cus;
  const shirt = req.body.Combine_shirt;
  const orders = req.body.orders;
  const Sumprice = req.body.SumPrice;
  const IsPaid = req.body.IsPaid

  await adm_FullInsert(cus_data, shirt, orders ,Sumprice,IsPaid);
  res.json();
  //storefront input
});
app1.post("/update_customdata", async (req, res) => {
  await console.log();
  const cus_data = req.body.formdata_cus;
  const shirt = req.body.Combine_shirt;
  const orders = req.body.orders;
  const Sumprice = req.body.SumPrice;
  const IsPaid = req.body.IsPaid

  await adm_update(cus_data, shirt, orders ,Sumprice,IsPaid);
  res.json();
  //storefront input
});
app1.delete("/delete_cusdata/:id", async (req, res) => {
  //await console.log(req.body.popupData)
  const { id } = req.params;
  adm_delete(id,res);
  //await data_queing();
  //res.json();
  //storefront delete
});
app1.post("/search_cus1", async (req, res) => {
  const searchTerm = req.body.search_value;
  console.log(searchTerm);
  const query = `SELECT * FROM customer_data WHERE cus_id LIKE ? AND status = "ยังไม่ตรวจสอบ"`;
  try {
    pool.query(query, [`%${searchTerm}%`], (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  } catch (error) {}
});
app1.post("/search_cus2", async (req, res) => {
  const searchTerm = req.body.search_value;
  console.log(searchTerm);
  const query = `SELECT * FROM customer_data WHERE cus_id LIKE ? AND status = "กำลังดำเนินการ"`;
  try {
    pool.query(query, [`%${searchTerm}%`], (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  } catch (error) {}
});
app1.post("/search_cus3", async (req, res) => {
  const searchTerm = req.body.search_value;
  console.log(searchTerm);
  const query = `SELECT * FROM customer_data WHERE cus_id LIKE ? AND status = "การปักเสร็จสิ้น"`;
  try {
    pool.query(query, [`%${searchTerm}%`], (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  } catch (error) {}
});
app1.post("/update_status", async (req, res) => {
  const ChangeStatus = req.body.change_status;
  const ID = req.body.change_id;
  console.log(ChangeStatus);
  const query = `UPDATE customer_data SET status = ? WHERE cus_id = ?`;
  try {
    pool.query(query, [ChangeStatus,ID], (err, results) => {
      if (err) throw err;
      res.json(results);
      console.log('success')
    });
  } catch (error) {}
});

app1.post("/data_table1", async (req, res) => {
  pool.query("SELECT * FROM customer_data", (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});
app1.get("/get_cusID", async (req, res) => {
  console.log(req.query);
  const query = `SELECT * FROM customer_data WHERE cus_id = ?`;
  try {
    pool.query(query, [req.query.id], (err, results) => {
      if (err) throw err;
      res.json(results);
      console.log(results);
    });
  } catch (error) {}
});


app1.post("/data_tester", (req, res) => {
  console.log(req.body);
});

const { IP, PORT } = process.env;

app1.listen(PORT,() => {
  console.log("Running on port "+ PORT);
});
