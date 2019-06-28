var mongoose =require('mongoose');
mongoose.set('debug',true);
mongoose.Promise=global.Promise;

mongoose.connect('mongodb://localhost/vote');
mongoose.connection.once('open',()=>{
    console.log("mongo connected");
}).on ('error',()=>{
    console.log("mongo err");
}) 
const Schema=mongoose.Schema;
const userschema=new Schema({
    email:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    
});

 const userchar=mongoose.model('userchar',userschema);
 module.exports=userchar;