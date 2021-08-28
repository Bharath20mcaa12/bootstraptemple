var express = require("express");
var mysql = require('mysql');
var app = express();
var path = require("path");
const port = 3000

app.use(express.urlencoded({ extended: true }));
app.use(express.json()) // To parse the incoming requests with JSON payloads
app.set('view engine', 'pug')

// app.use("/", function(req, res, next)
// {
//     console.log(req.url);
//     next();
// })
app.use(express.static(path.join(__dirname)));

app.get("/", function (req, res){

    res.sendFile(path.join(__dirname,"login.html"));
  });

  var connection = mysql.createConnection({
    host: 'localhost',
    //host: '127.0.0.1',
    user: 'root',
    port: "3306",
    password: '',
    database: 'primeresort',
  });
  
  connection.connect(function (err) {
    if(err) throw err;

    console.log('Connected.......')
  })

  app.post('/submit',function (req,res){
    var sql = "insert into user values('" + req.body.username + "', '" + req.body.password + "')"
  connection.query(sql, function (err) {
    if (err) throw err;
  
    res.render('index', {
      title: 'Data saved',
      message: 'Data saved successfully'})
  })
  connection.end();
})