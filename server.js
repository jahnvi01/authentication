const express =require('express');
const jwt=require('jsonwebtoken');
const bodyparser=require('body-parser');
const cors=require("cors");
const app=express();
const info =require('./routes/api/info');
const testRoute=require('./routes/api/questionRoute');
const db=require('./db/db');
const path=require('path');
app.use(cors());
app.use(bodyparser.json());
app.use('/api/test',testRoute);
app.use('/api/info',info);
var port = process.env.port || 8080;
if(process.env.NODE_ENV==="production"){
    app.use(express.static('client/build'));
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
}

var server_port = process.env.YOUR_PORT || process.env.PORT || 80;
var server_host = process.env.YOUR_HOST || '0.0.0.0';
app.listen(server_port, server_host, function() {
    console.log('Listening on port %d', server_port);
});

// app.listen(port);
// var server=app.listen(port,function() {
//     console.log(`app running on port${port}`); });