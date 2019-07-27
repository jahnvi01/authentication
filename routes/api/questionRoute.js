const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
// const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const char=require('../../db/db');
const pollchar=char.pollchar;
const subjectchar=char.subjectchar;
const auth=require('./config');



router.get('/subject/:subject',auth,(req, res) => {
var subject=req.params.subject;
  pollchar.find({subject})
  .then(testset=>{
      res.json({
          testset
      })
  })

});

router.post('/addquestion',(req, res) => {
console.log(req.body);
var  subject=req.body.subject;
  var  question=req.body.question;
  var  opt1=req.body.opt1;
  var  opt2=req.body.opt2;
  var  opt3=req.body.opt3;
  var  opt4=req.body.opt4;
  var  answer=req.body.answer;
    pollchar.findOne({question})
    .then(questionset=>{
        if(questionset){
              res.json({
              set:"",
                message: "question already exists"
            })
        }
        else{
          const newset=new pollchar({
           subject,question,opt1,opt2,opt3,opt4,answer
        });
          newset.save()
          .then(set=>{
              res.json({
               set,
               message:null
                            });
          })

        }
      
    })

        }
    );



    router.delete('/question/:id',(req, res) => {

      var  _id= req.params.id;
    
        pollchar.findOne({_id})
        .then(questionset=>{
            if(questionset){
             
              pollchar.remove({_id})
               .then( set=>{  res.json({
                  id:_id,
                     message:null
              
                  })
                }
               )
             }
            else{
        
              res.json({
                  id:"",
                message: "question does not exist"
            })
            }
          
        })
  
            }
        );
    
    


router.get('/subjects',auth,(req, res) => {

  subjectchar.find({})
  .then(subjects=>{
      res.json({
          subjects
      })
  })

});


// check for errors in name /addsub/:subject


      router.post('/addsubject',(req, res) => {
        console.log(req.body)
        var  subject=req.body.subject;
        subjectchar.findOne({subject})
            .then(set=>{
                if(set){
                      res.json({
                      sub:"",
                        message: "subject already exists"
                    })
                }
                else{
                  const newsub=new subjectchar({
                    subject
                 });
                  newsub.save()
                  .then(sub=>{
                      res.json({
                       sub,
                       message:null
                                    });
                  })
        
                }
              
            })
        
                }
            );


      router.delete('/:id',(req, res) => {
        var  _id= req.params.id;
          subjectchar.findOne({_id})
          .then(sub=>{
              if(sub){
              var  subject=sub.subject;
                subjectchar.remove({_id})
                 .then(
                  pollchar.remove({subject})
                  .then( set=>{  res.json({
                     id:_id,
                 message:null
                     })
                   }
                  )
            
                 )
                }
              else{
          
                res.json({
                  id:"",
                  message: "does not exist"
                    
              })
              }
            
          })
    
              }
          );
      
      
  
  


module.exports = router;

