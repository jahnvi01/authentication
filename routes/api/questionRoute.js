const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
// const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const char=require('../../db/db');
const pollchar=char.pollchar;
const subjectchar=char.subjectchar;
const auth=require('./config');
router.get('/',auth,(req, res) => {

  pollchar.find({})
  .then(testset=>{
      res.json({
          testset
      })
  })

});

router.post('/addsub',(req, res) => {

    var  subject= req.body.subject;
      subjectchar.findOne({subject})
      .then(sub=>{
          if(sub){
                res.json({
                
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
                 sub
                });
            })

          }
        
      })

          }
      );
  
  



      router.delete('/:subject',(req, res) => {

        var  subject= req.params.subject;
          subjectchar.findOne({subject})
          .then(sub=>{
              if(sub){
                subjectchar.remove({subject:sub})
                    res.json({
                    
                      message: "deleted"
                  })
              }
              else{
          
                res.json({
                    
                  message: "does not exist"
              })
              }
            
          })
    
              }
          );
      
      
    


module.exports = router;

