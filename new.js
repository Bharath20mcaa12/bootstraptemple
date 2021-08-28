var express = require('express');
//var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require("path");

const app= express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json()) // To parse the incoming requests with JSON payloads

app.use(express.static(path.join(__dirname)));

//app.use(bodyParser.json())
app.use(express.static('public'))
//app.use(bodyParser.urlencoded({extended:true}))

mongoose.connect('mongodb://localhost:27017/test',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db=mongoose.connection;

db.on('errror',()=>console.log("Error connecting to DB...."));
db.once('open',()=>console.log("Connected to DB...."));

app.post("/submit",(req,res)=>{
    var username=req.body.username;
    var password=req.body.password;

    var data={
        "username":username,
        "password":password
    }
    db.collection('user').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record inserted");
    });

    return res.redirect('home.html')
})

app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('login.html');
}).listen(3000);



console.log("********PORT :3000********");
