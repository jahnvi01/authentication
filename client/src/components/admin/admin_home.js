import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import { Alert } from 'antd';


class AdminHome extends Component {


   
      componentDidUpdate(){
        console.log("condition"+this.props.access_verified);
        if(this.props.access_verified===false){
          this.props.history.push('/admin_login');
          }
       
   //  this.props.get();
      }
      conditioncheck=()=>{
   console.log("condition"+this.props.access_verified);
           if(this.props.access_verified===false){
             this.props.history.push('/admin_login');
             }
          
      }
      render() {
    this.conditioncheck();
          return (
       
            
             <div className="admin">
        
       <h5> hellooo </h5>             
                 <button onClick={()=>{this.props.logout()}}>Logout</button>
            </div>
         
          );
        }
  }
  
  function mapStateToProps(state) {
console.log(state.admin)
    return {
        access_verified:state.admin.access_verified
      // users: state.users,
      // user: state.user,
      // token: state.token,
      // message: state.message,
      // notAnswered:state.notAnswered,
      // incorrectAnswer:state.incorrectAnswer,
      //   correctAnswer:state.correctAnswer
    }
  }
  function mapDispatchToStates(dispatch) {
  
    return {
      // get: () => {
      //   const token = localStorage.getItem('token');
  
      //   const config = {
      //     headers: {
      //       "content-type": "application/json"
      //     }
      //   }
      //   if (token) {
      //     config.headers['x-auth-token'] = token;
      //   }
      //   return fetch('/api/info', config)
      //     .then(res => res.json())
      //     .then(data => dispatch({ type: "get", payload: data }))
      // },
  
      admin_login: () => {
        dispatch({ type: "admin_login", payload: "" })
      },
      logout: () => {
        dispatch({ type: "admin_logout", payload: "" })
      },
  
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToStates)(AdminHome);



















