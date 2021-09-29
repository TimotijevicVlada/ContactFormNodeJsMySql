const express = require("express");
const mysql = require("mysql");

const app = express();

//Database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodejs-login'
})

//Database is connected to mySql
db.connect((error) => {
    if(error) {
        console.log(error);
    } else {
        console.log("MYSQL CONNECTED!");
    }
})

app.get("/", (req, res) => {
    res.send("<h1>Home page</h1>");
})

app.listen(5000, () => {
    console.log("Server started on Port 5000");
})