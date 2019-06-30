import React ,{ Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

class profile extends Component {
   conditioncheck=()=>{

   if(!this.props.token){

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
                <h1 style={{textAlign: "center"}}>
                 WELCOME 
                </h1>
   <button onClick={()=>this.props.logout()}>Logout</button>
            </div>    
        
        )
    }



}


function mapStateToProps(state){
  console.log("profile");
    console.log(state);
    return {
        user:state.user,
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