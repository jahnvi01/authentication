const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
// const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const char=require('../../db/db');
const userchar=char.userchar;
const auth=require('./config');

router.get('/',auth,(req, res) => {
    email=req.user.email;
userchar.find({email})
.then(user=>{
    res.json(
        user
    ) 
})
});



router.post('/login',(req, res) => {

    var  email= req.body.email;
    var  password= req.body.password;
      userchar.findOne({email})
      .then(user=>{
          if(!user){
                res.json({
                
                  message: "user is not registered"
              })
          }
          else{


const username=user.username;


            bcrypt.compare(password,user.password)
            .then(isMatch=>{
                if(!isMatch) return res.json({message: "invalid password"});
                jwt.sign({email,username,password},'secretkey',(err,token)=>{
                    if (err) throw err;
               
                    res.json({
                       token:token,
                       user:{
                        email: email,
                        username: username,
                        password: password  },
                        message:""
                    });
                })

            })

          }
        
      })
            
                  
                  
  
  
  
          }
      );
  
  








router.post('/signin',(req, res) => {

  var  email= req.body.email;
   var username= req.body.username;
  var  password= req.body.password;
    userchar.findOne({email})
    .then(user=>{
        if(user){
              res.json({
          
                message: "user already exists! try again"
            })
        }
        else{
            const newUSer=new userchar({
                email,username,password
            });

            bcrypt.genSalt(10, (err, salt) => {

                bcrypt.hash(newUSer.password, salt, (err, hash) => {
                    if (err)  {
                    res.json({
                       
                        message: "invalid data! try again"
                    }
                    )
                    };
                    newUSer.password= hash;

                    jwt.sign({ newUSer }, 'secretkey', (err, token) => {
                        newUSer.save()
                        .then(user=>{
                            res.json({
                                token,
                                user: {
                                    email: newUser.email,
                                    username: newUser.username,
                                    password: newUser.password
                                    
                                },
                                message:""
                            });
                        })
                       
                    })
                }
        
        
                )
            })







        }
      
    })
          
                
                



        }
    );






module.exports = router;

