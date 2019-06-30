const express =require('express');
const jwt=require('jsonwebtoken');
const bodyparser=require('body-parser');
const cors=require("cors");
const app=express();
const info =require('./routes/api/info');
const db=require('./db/db');
app.use(cors());
app.use(bodyparser.json());


app.use('/api/info',info);
var port = process.env.port || 5000;

app.listen(port);