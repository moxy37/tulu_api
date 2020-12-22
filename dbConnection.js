var mysql = require("mysql2");

var dbConnection = mysql.createPool({
  // host: "127.0.0.1",
  host: "tulucanadamysql.mysql.database.azure.com",
  connectionLimit: 10,
  // user: "spartacus",
  user: "tulusqladmin@tulucanadamysql",
  // password: "I@mSp@rt@cus!",
  password: "Tulu..Tulu37!..Tulu",
  // port: 3306
  database: "spartacus",
});

module.exports = dbConnection;

