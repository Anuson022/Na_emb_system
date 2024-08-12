const mysql1 = require('mysql');


const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env;


var pool = mysql1.createPool(
    {
    connectionLimit : 10,
    host     : DB_HOST,
    user     : DB_USER,
    password : DB_PASS,
    database : DB_NAME
});

pool.getConnection((err, connection) => {
    if (err) {
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.error('Database connection was closed.');
      }
      if (err.code === 'ER_CON_COUNT_ERROR') {
        console.error('Database has too many connections.');
      }
      if (err.code === 'ECONNREFUSED') {
        console.error('Database connection was refused.');
      }
    }
    else
    {console.log("Connection successfully");}
  
    if (connection) connection.release();
    
    return;
  });

module.exports = pool;