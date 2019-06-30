const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

function auth(req,res,next){
    const token=req.header('x-auth-token');
    // console.log("token"+token);
    if(!token) return res.json({message:"authorization required"});
    try{
    const decode=jwt.verify(token,'secretkey');
    req.user=decode;
    // console.log(req.user);
    next();
    }
    catch(e){
        res.json({message:"token not valid"});
    }
}
module.exports=auth;