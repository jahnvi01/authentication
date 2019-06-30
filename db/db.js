var mongoose =require('mongoose');
mongoose.set('debug',true);
mongoose.Promise=global.Promise;

mongoose.connect('mongodb://localhost/vote',{useCreateIndex:true,useNewUrlParser:true})
.then(()=>{console.log("mongo connected")})
.catch (error=()=>{
    console.log(error);
}) ;
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

 const userchar=mongoose.model('userchar',userschema);
 module.exports=userchar;