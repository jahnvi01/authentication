import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link,withRouter } from 'react-router-dom';
class reg extends Component {
 
  handleDetail=(event)=>{
    event.preventDefault();
    var username=document.getElementById('user-input').value;
    var password=document.getElementById('password-input').value;
    var email=document.getElementById('email-input').value;
    if(username && password && email){
    var post={
      username:username,
      password:password,
      email:email
    }

    this.props.signin(post);
      }
      else{
        alert("fill up all the fields");
      }
    }
      componentWillMount(){
        this.props.get();
      }
    
  render() {
    if(this.props.message[0]!=="" && this.props.message!==""){
   
      console.log("console" + this.props.message);
  this.props.clear();

    }
    if(this.props.authorized===true){
      this.props.history.push('/profile');
      }
      
      return (
        <div className="block">
        <div className="row log">
            <div className="col-md-12 log-card">
            <h4 id="log-title">Member Registration </h4>
            <form>
                 <div id="uname"> 
                 <input type="text" id="user-input" placeholder="Username" required="required" />
                 </div>

             <div id="email-part">
                 <input type="email" id="email-input" placeholder="E-mail" required="required" />
                 </div>

                  <div id="password-part">
                 <input type="password" id="password-input" placeholder="Password" required="required" />
                 </div>
        <input id="reg" type="submit" onClick={(event)=>{this.handleDetail(event)}} value="Register "/>
        <Link to="/"><p id="new">Already have an account? Login here.</p></Link>
        </form>
             </div>
          
            </div>

        </div>
      );
    }
  }
  

  function mapStateToProps(state){
    return {users:state.users,
      user:state.user,
      token:state.token,
      authorized:state.authorized,
       message:state.message     
    
    }
  }
  function mapDispatchToStates(dispatch){
    return{
      get:()=>{
        return fetch('/api/info')
        .then(res=>res.json())
        .then(data=>dispatch({type:"get",payload:data}))
      },
      clear:()=>{
        dispatch({type:"clear",payload:""})
      },
      signin:(user)=>{
        console.log("in signin");
        return fetch('/api/info/signin',{
          method: "post",
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },body:JSON.stringify(user)
        })
        .then(res=>res.json())
        .then(res=>dispatch({type: "add",payload:res}))
      }
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToStates)(reg);