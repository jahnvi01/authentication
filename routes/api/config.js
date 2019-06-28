const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const mysql = require('mysql');
const jwt = require('jsonwebtoken');

function auth(req,res,next){
    const token=req.header('x-xuth-token');
    if(!token) res.json({message:"authorization required",authorized:false});
    try{
    const decode=jwt.verify(token,'secretkey');
    req.user=decoded;
    next();
    }
    catch(e){
        res.json({message:"token not valid", authorized:false});
    }
}
module.exports=auth;