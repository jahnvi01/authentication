import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import 'antd/dist/antd.css';
import { Alert } from 'antd';
class log extends Component {
  
  state = {
    visible: false,
    message:""
  };
  handleClose = () => {
    this.setState({ visible: false });
  };

  getDetail=(event)=>{
    event.preventDefault();
var email=document.getElementById('email-input').value;
var password=document.getElementById('password-input').value;
if(email && password){
var post={
  email:email,
  password:password
}
this.props.login(post);

}else{
  this.setState({visible:true,message:"please fill up all the fields "})
}
  }
  componentWillMount(){

    this.props.get();
  }
  render() {
    if(this.props.message[0]!=="" && this.props.message!==""){
   this.setState({visible:true,message:this.props.message});
      console.log(this.props.message);
  this.props.clear();

    }
    if(this.props.token){
      this.props.history.push('/profile');
      }
      return (
    <div>
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
                <h4 id="log-title">Member Login </h4>
                <form>
                 <div id="email"> 
                 <input type="email" id="email-input" placeholder="Email" required />
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

  function mapStateToProps(state){
    console.log(state);
    return {users:state.users,
      user:state.user,
      token:state.token,
       message:state.message     
    
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
        .then(data=>dispatch({type:"get",payload:data}))
      },

    clear:()=>{
      dispatch({type:"clear",payload:""})
    },
      login:(user)=>{
        console.log("in login");
        return fetch('/api/info/login',{
          method: "post",
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },body:JSON.stringify(user)
        })
        .then(res=>res.json())
        .then(res=>dispatch({type: "login",payload:res}))
      }
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToStates)(log);