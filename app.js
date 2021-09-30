//LINK TO DATABASE "http://localhost/phpmyadmin/"

const express = require("express");
const path = require("path");
const mysql = require("mysql");
const dotenv = require("dotenv");


//Putanja do fajla
dotenv.config({ path: './.env'});

const app = express();

//Database (deklarisemo sve ono sto je u .env folderu)
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

//Daa imamo pristup tom fajlu
const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory));

//Parse URL encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({extended: false}));

//Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use("/auth", require("./routes/auth"));


app.set("view engine", "hbs");

//Database is connected to mySql
db.connect((error) => {
    if(error) {
        console.log(error);
    } else {
        console.log("MYSQL CONNECTED!");
    }
})

//Define routes
app.use("/", require("./routes/pages.js"));


app.listen(5000, () => {
    console.log("Server started on Port 5000");
})