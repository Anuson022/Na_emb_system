const express = require("express");
const cors = require("cors");
//const mysql1 = require('mysql');
const bodyParser = require("body-parser");
const path = require("path");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const pool = require("../../back/na_db");
const router_imageUpload = require("../../back/function_server/Image_uploader");
const router_fileFetcher = require("../../back/function_server/Image_fetcher");
const router_imageDelete = require("../../back/function_server/Image_delete");
const app1 = express();

app1.use(cors());
app1.use(bodyParser.json());

// Add other middleware if needed
app1.use(express.json());
app1.use(express.urlencoded({ extended: true }));

app1.use(router_imageUpload); //image uploader

app1.use(router_fileFetcher); //image file search

app1.use(router_imageDelete); //Image delete






// Secret key for JWT
const JWT_SECRET = 'your_jwt_secret';

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ message: 'Token not provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.user = decoded;
    next();
  });
};

// Registration endpoint
app1.post('/register', async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ message: 'Username, password, and role are required' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = { username, password: hashedPassword, role };

  pool.query('INSERT INTO users SET ?', user, (err, results) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ message: 'Username already exists' });
      }
      throw err;
    }
    res.status(201).json({ message: 'User registered successfully' });
  });
});

// Login endpoint
app1.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  pool.query('SELECT * FROM users WHERE username = ?', username, (err, results) => {
    if (err) {
      throw err;
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Username or password is incorrect' });
    }
    console.log('tsa1')
    const user = results[0];
    
      console.log('tsa')

      if (password != user.password) {
        console.log(password, user.password)
        return res.status(401).json({ message: 'Username or password is incorrect' });
      }
      const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, {
        expiresIn: '1h'
      });

      res.json({ token, role: user.role });
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

adm_update = (cus_input, formdata, order) => {
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
};

const data_queing = async () => {
  await pool.query("SET  @num := 0;");
  await pool.query("UPDATE customer_data SET cus_id = @num := (@num+1);");
  await pool.query(`ALTER TABLE customer_data AUTO_INCREMENT =1;`);
  console.log("asf");
};
const adm_delete = async (cus_id) => {
  const delete_sql = "DELETE FROM customer_data WHERE cus_id = ?";
  pool.query(delete_sql, [cus_id], (error, result, fields) => {
    if (error) {
      return console.log(error);
    }
    console.log("Success");
  });
};
app1.get("/", (req, res) => {
  res.write("<body style='background-color: black'></body>");
  res.write("<h1 style='background-color: white'>Hello</h1>");
  res.end();
});
app1.post("/cus_input", async (req, res) => {
  await data_queing();

  const Shirt_data = req.body.Combine_shirt;
  const Cus_info = req.body.formdata_info;
  await console.log(req.body);
  //await console.log(typeof(req.body))
  await cus_insert(Shirt_data, Cus_info);
  res.json();
  await data_queing();

  //customer input
});

app1.post("/update_customdata", async (req, res) => {
  await console.log();
  const cus_data = req.body.formdata_cus;
  const shirt = req.body.formdata;
  const orders = req.body.orders;
  await adm_update(cus_data, shirt, orders);
  res.json();
  //storefront input
});
app1.post("/delete_cusdata", async (req, res) => {
  //await console.log(req.body.popupData)
  adm_delete(req.body.popup_delete);
  //await data_queing();
  res.json();
  //storefront delete
});
app1.post("/search_cus1", async (req, res) => {
  const searchTerm = req.body.search_value;
  console.log(searchTerm);
  const query = `SELECT * FROM customer_data WHERE cus_id LIKE ?`;
  try {
    pool.query(query, [`%${searchTerm}%`], (err, results) => {
      if (err) throw err;
      res.json(results);
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
app1.listen(5000, () => {
  console.log("Running on port 5000");
});
