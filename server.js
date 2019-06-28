const express =require('express');
const mysql=require('mysql');
const jwt=require('jsonwebtoken');
const bodyparser=require('body-parser');
const cors=require("cors");
const app=express();
const info =require('./routes/api/info');
const db=require('./db/db');
app.use(cors());
app.use(bodyparser.json());

var con=mysql.createConnection(
{
    host:"localhost",
    user:"root",
    password:"jahnvi123",
    database : "authentication",
}
);

con.connect(
    function(err){
        if (err) throw err;
        console.log("connected");
    }
)
app.use('/api/info',info);
var port = process.env.port || 5000;

app.listen(port);