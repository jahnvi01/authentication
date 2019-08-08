import React ,{ Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import avatar from './images/download.png';
import Navbar from './components/navbar';
import Test from './components/subjects';
var email,username;
class profile extends Component {
 
   conditioncheck=()=>{
   
    if(this.props.user){
    
     email=this.props.user.email;
     username=this.props.user.username;
    }
    // else{
    //   this.props.history.push('/');
    // }
    console.log(this.props.token);
   if(!this.props.token||this.props.token==="null"){
    console.log(this.props.token);
      this.props.history.push('/');
   }
 
   }
   componentDidMount(){
    this.props.get();
 this.props.getSubjects();
   }
    render(){
   
      //this.props.get();
     this.conditioncheck();
        return (
          <div>   
               <Navbar />
                   <div className="container">
         
<div className="row"  style={{marginTop:"20px"}}>
<div className="col-md-4">
  <img alt="user" src={avatar} width="150" height="150"/>
  </div>
                <div className="col-md-8" style={{    alignSelf: "center"}}>
                  <h3>Name: {username|| "Can not display"}</h3>
                  <h3>Email: {email||"Login first"}</h3>
                
                </div>

               
  </div>
  <div className="row"  style={{marginTop:"20px"}}>
<div className="col-md-12 testlist">
<h3>Choose Any Test</h3>
<Test />
</div>
</div>
  </div>
         
           
  </div>
       
        )
    }



}


function mapStateToProps(state){
//console.log(state.admin.subjects);
    return {
        user:state.user.user[0],
        token:state.user.token,

    }
  }
  function mapDispatchToStates(dispatch){
    return{
      get:()=>{
        const token=localStorage.getItem('token');
        console.log(token);
        const config={
          headers:{
            "content-type": "application/json"
          }
        } 
        if(token){
          config.headers['x-auth-token']=token;
        }
        return fetch('/api/info',config)
        .then(res=>res.json())
        //.then(data=>console.log(data))
       .then(data=>dispatch({type:"get",payload:data}))
      },

      getSubjects:()=>{
        const token=localStorage.getItem('token');
  
        const config={
          headers:{
            "content-type": "application/json",
            "x-auth-token": token
          }
        } 
       
        return fetch('/api/test/subjects',config)
        .then(res=>res.json())
        .then(data=>dispatch({type:"getsubjects",payload:data}))
      },
      logout:()=>{
        dispatch({type:"logout",payload:""})
      }
    }
  }
export default connect(mapStateToProps,mapDispatchToStates)(profile);