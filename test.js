const configs = require('dotenv').config;
const mysql = require('mysql');
const fs = require('fs');
configs();   // set env variables from dotenv

var config = {
  host: process.env.MYSQL_HOST,
  port: parseInt(`${process.env.MYSQL_PORT}`),
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  ssl: { ca: process.env.MYSQL_SSL_CERT }
};

console.log(config);

const conn = new mysql.createConnection(config);


conn.connect(
  function (err) {
    if (err) {
      console.log('error - Cannot connect to database');
      console.log(err);
      throw err;
    }
    else {
      console.log('Connected to database');
      queryDatabase();
    }
  }
);

function queryDatabase() {
  conn.query('SELECT 1;',
    function (err, results, fields) {
      if (err) throw err;
      console.log(results);
    }
  )
  conn.end(function (err) {
    if (err) throw err;
    else console.log('Done.')
  });
};
