var mongoose =require('mongoose');
const userchar=require('./db');
const mocha=require('mocha');
const assert=require('assert');

describe('testing mocha',()=>{

    it('add',(done)=>{
        var char=new userchar({
            email:"j@g.com",
            username:"jahnvi",
            password:'jahnvi'

        });
        char.save()
        .then(()=>{

                assert(char.isNew===false);
                done();
        });
    })

    // it('test',(done)=>{
    //     mongoose.connection.collections.testchars.drop(()=>{
       
    //         assert(2+2===4);
    //         done();
    //     });
      
    // }) 

// it('findone record',(done)=>{
//     testchar.findOne({name:"janu"})
//     .then(function(res){
//         assert(res.name==='janu');
//         done();
//     })

// })








// it('find and remove record',(done)=>{
//     testchar.findOneAndRemove({name:"janu"})
//     .then(function(){
        
//               testchar.findOne({name:"janu"})
//                   .then(function(res){
//              assert(res===null);
//                  done();
           
//             })
//     })

// })


})
