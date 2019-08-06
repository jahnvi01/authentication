var mongoose =require('mongoose');
var moment=require('moment');
mongoose.set('debug',true);
mongoose.Promise=global.Promise;



mongoose.connect('mongodb://localhost/vote',{useCreateIndex:true,useNewUrlParser:true})
.then(()=>{console.log("mongo connected")})
.catch (error=()=>{
    console.log(error);
});
const Schema=mongoose.Schema;
const userschema=new Schema({
    email:{
        type:String,
        required:true,
        unique:true

    },
    username:{
        type:String,
        required:true,
        
    },
    password:{
        type:String,
        required:true,
    },
    
});


const scoreschema=new Schema({
    email:{
        type:String,
        required:true,
      

    },
    subject:{
        type:String,
        required:true,
        
    },
    score:{
        type:Number,
        required:true,
    },
correct:{
    type:Number,
        required:true, 
} ,
incorrect:{
    type:Number,
    required:true, 
},
notAnswered:{
    type:Number,
        required:true, 
} ,
date:{
    type:Date,
    required:true,
    default:Date(),
   
}
});



const subjectschema=new Schema({
   
    subject:{
        type:String,
        required:true,
        unique:true
    },

    
});



const pollschema=new Schema({
   subject:{
    type:String,
    required:true,
   },
    question:{
        type:String,
        required:true,
        
    },
    opt1:{
        type:String,
        required:true,
    },
    opt2:{
        type:String,
        required:true,
    },
    opt3:{
        type:String,
        required:true,
    },
    opt4:{
        type:String,
        required:true,
    },
    answer:{
        type:String,
        required:true,
    },
    
});



 const userchar=mongoose.model('userchar',userschema);
 const scorechar=mongoose.model('scorechar',scoreschema);
 const pollchar=mongoose.model('pollchar',pollschema);
 const subjectchar=mongoose.model('subjectchar',subjectschema);
 module.exports={userchar,pollchar,subjectchar,scorechar};
