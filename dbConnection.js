var mysql = require("mysql2");

var dbConnection = mysql.createPool({
  host: "127.0.0.1",
  connectionLimit: 10,
  // user: "spartacus",
  // password: "I@mSp@rt@cus!",
  // database: "spike",
  // port: 3306
  user: "root",
  password: "root",
  database: "spartacus",
});

module.exports = dbConnection;

