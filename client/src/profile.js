import React ,{ Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

class profile extends Component {
   conditioncheck=()=>{
     console.log(this.props.authorized);
    if(this.props.authorized===false){
      this.props.history.push('/');
      }
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
    return {users:state.users,
        user:state.user,
        token:state.token,
        authorized:state.authorized
    }
  }
  function mapDispatchToStates(dispatch){
    return{
      get:()=>{
        return fetch('/api/info')
        .then(res=>res.json())
        .then(data=>dispatch({type:"get",payload:data}))
      },
      logout:()=>{
        dispatch({type:"logout",payload:""})
      }
    }
  }
export default connect(mapStateToProps,mapDispatchToStates)(profile);