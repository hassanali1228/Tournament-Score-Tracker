const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

require('dotenv').config();
	
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
    host     : 'localhost',
    port     : 3306,
    user     : 'root',
    password : process.env.PASSWORD,
    database : 'tournament'
})

connection.connect(function(err) {
    if (err) {
      return console.error('connection error: ' + err.message);
    }
  
    console.log('Connected to the MySQL server.');
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

connection.end(function(err) {
    if (err) {
      return console.log('closing error: ' + err.message);
    }
    console.log('Closed the database connection.');
});