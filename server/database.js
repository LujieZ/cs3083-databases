const mysql = require('mysql');

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASS,
});

// Attempt to catch disconnects
connection.on('connection', (Connection) => {
  console.log('DB Connection established');

  Connection.on('error', (err) => {
    console.error(new Date(), 'MySQL error', err.code);
  });
  Connection.on('close', (err) => {
    console.error(new Date(), 'MySQL close', err);
  });
});

module.exports = connection;
