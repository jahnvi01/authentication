const express =require('express');
const jwt=require('jsonwebtoken');
const bodyparser=require('body-parser');
const cors=require("cors");
const app=express();
const info =require('./routes/api/info');
const testRoute=require('./routes/api/questionRoute');
const db=require('./db/db');
app.use(cors());
app.use(bodyparser.json());
app.use('/api/test',testRoute);
app.use('/api/info',info);
var port = process.env.port || 8080;

// app.listen(port);
var server=app.listen(port,function() {
    console.log(`app running on port${port}`); });