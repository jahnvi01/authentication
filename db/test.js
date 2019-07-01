var mongoose =require('mongoose');
const char=require('./db');
const userchar=char.userchar;
const pollchar=char.pollchar;
const mocha=require('mocha');
const assert=require('assert');

describe('testing mocha',()=>{

    it('add',(done)=>{
        var char=new pollchar({
            question:"sinA/cosA?",
            opt1:"secA",
            opt2:'cosecA',
            opt3:"cotA",
            opt4:"tanA",
            answer:"tanA"

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
