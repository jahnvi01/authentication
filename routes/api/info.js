const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
// const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const char=require('../../db/db');
const userchar=char.userchar;
const scorechar=char.scorechar;
const auth=require('./config');

router.get('/',auth,(req, res) => {
    email=req.user.email||req.user.newUser.email;
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
                    token:null,
                    user:null,
                  message: "user is not registered"
              })
          }
          else{


const username=user.username;


            bcrypt.compare(password,user.password)
            .then(isMatch=>{
                if(!isMatch) return res.json({
                    token:null,
                    user:null,
                    message: "invalid password"});
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
                token:null,
                user:null,
                message: "user already exists! try again"
            })
        }
        else{
            const newUser=new userchar({
                 email,username,password
            });

            bcrypt.genSalt(10, (err, salt) => {

                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err)  {
                    res.json({
                        token:null,
                        user:null,
                        message: "invalid data! try again"
                    }
                    )
                    };
                    newUser.password= hash;

                    jwt.sign({ newUser }, 'secretkey', (err, token) => {
                        newUser.save()
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


    router.post('/scores',(req, res) => {
        email=req.body.email;
       // console.log(email);
       //console.log(Date.now())
    scorechar.find({email}).sort({date: 'desc'})
    .then(score=>{
        res.json(
            {score} 
        ) 
    })
    });
    router.post('/subjects',(req, res) => {
        email=req.body.email;
       // console.log(email);
       //console.log(Date.now())
    scorechar.distinct('subject')
    .then(subjects=>{
        res.json(
            {subjects} 
        ) 
    })
    });
    router.post('/sendscore',(req, res) => {
        console.log(req.body);
         var  subject=req.body.subject;
                   var  email=req.body.email;
           var  score=req.body.score;
           var  correct=req.body.correctAnswer;
           var  incorrect=req.body.incorrectAnswer;
           var  notAnswered=req.body.notAnswered;
        const scoreset=new scorechar({email,subject,score,correct,incorrect,notAnswered});
        scoreset.save()
        .then(set=>{
            res.json({set})
        })
                }
            );
        

module.exports = router;

