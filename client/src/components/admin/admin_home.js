import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AdminNavbar from './admin_navbar';
import 'antd/dist/antd.css';
import { Alert } from 'antd';
class AdminHome extends Component {
 state = {
    visible: false,
    message:""
  };
  
      componentDidUpdate(){
     
        if(this.props.access_verified===false){
          this.props.history.push('/admin_login');
          }
           
      }
      componentWillMount(){
        this.props.getSubjects();
      }
      conditioncheck=()=>{
       
   console.log("condition"+this.props.access_verified);
           if(this.props.access_verified===false){
             this.props.history.push('/admin_login');
             }
             if(this.props.message){
              this.setState({visible:true,message:this.props.message});
                 console.log(this.props.message);
             this.props.clear();
             const timer = setTimeout(() => {
              this.setState({visible:false,message:""});
            }, 2000);
               }
         
      }
      handleClose = () => {
        this.setState({ visible: false });
      };
      handleEdit=(subject)=>{
    
        this.props.chooseSubject(subject);
   this.props.history.push('/edit');
      }
      handleDelete=(id)=>{
    
        this.props.deleteSubject(id);

      }
      showSubject=()=>{
          if(this.props.subjects){
           var subjects=this.props.subjects;         
   subjects=subjects.map(subject=>{
       return(
           <li key={subject._id} className="subject">
           <h3 className="subject-name">{subject.subject}
           </h3>
           <button className="btn" onClick={()=>{this.handleEdit(subject.subject)}}>Edit</button>
           <button className="btn" style={{marginLeft: "10px"}} onClick={()=>{this.handleDelete(subject._id)}}>Delete</button>
           </li>
       )
         
   })
          }
   return subjects;
   }
addSubject=(e)=>{
  e.preventDefault();
  var subject=document.getElementById("subject-input").value;
  this.props.addSubject(subject);
}

      render() {
    this.conditioncheck();
          return (
       
            
             <div className="admin">
        
  <AdminNavbar />    
  {this.state.visible ? (
          <Alert
            message={this.state.message}
            type="success"
            closable
            afterClose={this.handleClose}
          />
        ) : null}
<div className="container" style={{marginTop: "3%"}}>
  <h3 className="admin-title">Admin Dashboard</h3>


  <div className="block" style={{margin: "5%"}}>
        
        <div className="row log">
            <div className="col-md-12 log-card">
               
                <form>
                <div id="uname"> 
             <input type="text" id="subject-input" placeholder="Enter subject name..." required="required" />
             </div>
                 <div>   <input id="log" type="submit" onClick={(event)=>{this.addSubject(event)}} value="Add Subject" /></div>
                  </form>
             </div>
          
             
            </div>
</div>



<ul className="subject-list">
{this.showSubject()}
</ul>
</div>

                
            </div>
         
          );
        }
  }
  
  function mapStateToProps(state) {
console.log(state.admin)
    return {
        access_verified:state.admin.access_verified,
        subjects:state.admin.subjects,
        message:state.admin.message
     }
  }
  function mapDispatchToStates(dispatch) {
  
    return {
      getSubjects:()=>{
       
        const token = localStorage.getItem('token');
        console.log(token);
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
   chooseSubject:(test)=>{
    dispatch({type:"chooseSubject",payload:test})
   },
   clear:()=>{
    dispatch({type:"clear",payload:""})
  },
   addSubject:(subject)=>{
    console.log(subject);
    //'/api/test/addsub/'+subject
    return fetch('/api/test/addsubject',{
      method: "post",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },body:JSON.stringify({subject})})
      .then(res=>res.json())
    .then(response=>dispatch({type:"addsubject",payload:response}))
    },
    deleteSubject:(id)=>{
        console.log(id);
        return fetch('/api/test/'+id,{method:"delete"})
        .then(res=>res.json())
        .then(response=>dispatch({type:"deletesubject",payload:response}))
        
    }
  
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToStates)(AdminHome);



















