import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import { Alert } from 'antd';
import Navbar from '../navbar';

class Admin_login extends Component {

 
    state = {
        visible: false,
        message:""
      };
      handleClose = () => {
        this.setState({ visible: false });
      };
      componentWillMount() {

        this.props.get();
    
      }
      getDetail=(event)=>{
        event.preventDefault();
    var user=document.getElementById('user-input').value;
    var password=document.getElementById('password-input').value;
    if(user && password){

      if(user==="admin" && password==="admin"){
      this.props.admin_login();
      }
    else{
      this.setState({visible:true,message:"incorrect credentials"})
    }

    }
    else{
      this.setState({visible:true,message:"please fill up all the fields "})
    }
      }
     
      conditioncheck=()=>{
        console.log(this.props.access_verified);
    if(this.props.token){
      if(this.props.access_verified==="true"){
       
        this.props.history.push('/admin_home');
        }
        
    }
     else{
      this.props.history.push('/');
     }
       
          
      }
      render() {
    this.conditioncheck();
          return (
        <div>
          <Navbar />
             {this.state.visible ? (
              <Alert
                message={this.state.message}
                type="success"
                closable
                afterClose={this.handleClose}
              />
            ) : null}
             <div className="block">
        
            <div className="row log">
                <div className="col-md-12 log-card">
                    <h4 id="log-title">Admin Login </h4>
                    <form>
                    <div id="uname"> 
                 <input type="text" id="user-input" placeholder="Username" required="required" />
                 </div>
    
            
                      <div id="password-part"> 
                     <input type="password" id="password-input" placeholder="Password" required="required" />
                     </div>
                     <div>   <input id="log" type="submit" onClick={(event)=>{this.getDetail(event)}} value="Log-In" /></div>
                       <Link to="/register"><p id="new">For new account,Register here</p></Link>
                       </form>
                 </div>
              
                 
                </div>
    </div>
            </div>
          );
        }
  }
  
  function mapStateToProps(state) {
  
    return {
      access_verified:state.admin.access_verified,
     
      // users: state.users,
      user: state.user.user,
      token: state.user.token,
      // message: state.message,
      // notAnswered:state.notAnswered,
      // incorrectAnswer:state.incorrectAnswer,
      //   correctAnswer:state.correctAnswer
    }
  }
  function mapDispatchToStates(dispatch) {
  
    return {
      get: () => {
        const token = localStorage.getItem('token');
  
        const config = {
          headers: {
            "content-type": "application/json"
          }
        }
        if (token) {
          config.headers['x-auth-token'] = token;
        }
        return fetch('/api/info', config)
          .then(res => res.json())
          .then(data => dispatch({ type: "get", payload: data }))
      },
  
      admin_login: () => {
        dispatch({ type: "admin_login", payload: "" })
      },
    
  
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToStates)(Admin_login);



















