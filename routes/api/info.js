const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const auth=require('./config');
var con = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "jahnvi123",
        database: "authentication",
    }
);

con.connect(
    function (err) {
        if (err) throw err;
        console.log("connected");
    }
)

router.get('/',(req, res) => {
    var sql = "select * from auth";
    con.query(sql, (err, arr) => {
        if (err) throw err;
        //console.log(arr);
        res.json(arr);
    });

});

router.post('/login',(req, res) => {
    var email,username,password,no;
    var sql = "select email,username,password,count(*) as no from auth where email= ?";
    con.query(sql, req.body.email, (err, resp, fields) => {
        if (err) throw err;
      
        email=resp[0].email ;
        username=resp[0].username;
        password=resp[0].password;  
        no=resp[0].no;
        if(no==1){
        bcrypt.compare(req.body.password,password)
        .then(isMatch=>{
            if(!isMatch) return res.json({message: "invalid password",authorized:false});
            jwt.sign({email,password,username},'secretkey',(err,token)=>{
                if (err) throw err;
                res.json({
                   token:token,
                   user:{
                    email: email,
                    username: username,
                    password: password  },
                    authorized:true ,
                    message:""
                });
            })
        })
     
    }
    else{
        res.json({message: "invalid data",authorized:false});
    }
    })
}
);



router.post('/signin',(req, res) => {
var no;
    var sql = "select email,count(*) as no from auth where email= ?";
        con.query(sql, req.body.email, (err, resp, fields) => {
            if (err) throw err;
            no=resp[0].no;

                if(no==1){
                    res.json({
                        authorized:false,
                        message: "user already exists! try again"
                    })
                }
                else if(no==0){

    bcrypt.genSalt(10, (err, salt) => {

        bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err)  {
            res.json({
                authorized:false,
                message: "invalid data! try again"
            }
            )
            };
            req.body.password = hash;

            var post = [
                req.body.email, req.body.username, req.body.password
            ];



            jwt.sign({ post }, 'secretkey', (err, token) => {
                var sql = "insert into auth (email,username,password) values (?)";
                con.query(sql, [post], (err, res, fields) => {
                    if (err)  {
                        res.json({
                            authorized:false,
                            message: "invalid data! try again"
                        }
                        )
                        };
                })
                console.log(sql);
                res.json({
                    token,
                    user: {
                        email: req.body.email,
                        username: req.body.username,
                        password: req.body.password
                        
                    },
                    authorized: true,
                    message:""
                });
            })
        }


        )
    })

                }


        }
    )


}

);




module.exports = router;

