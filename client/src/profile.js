import React ,{ Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import avatar from './images/download.png';
import Navbar from './components/navbar';
var email,username;
class profile extends Component {
 
   conditioncheck=()=>{
    
    if(this.props.user){
    
     email=this.props.user.email;
     username=this.props.user.username;
    }
   if(!this.props.token){
    console.log("condition");
      this.props.history.push('/');
   }
   }
   componentDidMount(){
    this.props.get();
 
   }
    render(){
   

     this.conditioncheck();
        return (
          <div>   
               <Navbar />
                   <div className="container">
         
<div className="row"  style={{marginTop:"20px"}}>
<div className="col-md-6">
  <img alt="user" src={avatar} width="200" height="200"/>
  </div>
                <div className="col-md-6">
                  <h3>name: {username}</h3>
                  <h3>email: {email}</h3>

<Link to='/test'><button>Start Test</button></Link>
                </div>


  </div>

  </div>
         
           
  </div>
       
        )
    }



}


function mapStateToProps(state){

    return {
        user:state.user[0],
        token:state.token
    }
  }
  function mapDispatchToStates(dispatch){
    return{
      get:()=>{
       
        const token=localStorage.getItem('token');
      //  console.log(token);
        const config={
          headers:{
            "content-type": "application/json",
            "x-auth-token": token
          }
        } 
       
        return fetch('/api/info',config)
        .then(res=>res.json())
        .then(data=>dispatch({type:"get",payload:data}))
      },
      logout:()=>{
        dispatch({type:"logout",payload:""})
      }
    }
  }
export default connect(mapStateToProps,mapDispatchToStates)(profile);