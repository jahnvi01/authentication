import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AdminNavbar from './admin_navbar';

class AdminHome extends Component {

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
          
      }

      handleEdit=(subject)=>{
    
        this.props.chooseSubject(subject);
  //  this.props.history.push('/test');
      }
      handleDelete=(subject)=>{
    
        this.props.deleteSubject(subject);
  //  this.props.history.push('/test');
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
           <button className="btn" style={{marginLeft: "10px"}} onClick={()=>{this.handleDelete(subject.subject)}}>Delete</button>
           </li>
       )
         
   })
          }
   return subjects;
   }


      render() {
    this.conditioncheck();
          return (
       
            
             <div className="admin">
        
  <AdminNavbar />    
<div className="container" style={{marginTop: "3%"}}>
  <h3 className="admin-title">Admin Dashboard</h3>
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

   add:(item)=>{
    console.log(item.name);
    return fetch('/api/items',{method:"post", headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },body:JSON.stringify(item)})
    .then(response=>dispatch({type:"add",payload:item}))
    },
    deleteSubject:(id)=>{
        console.log(id);
        return fetch('/api/test/'+id,{method:"delete"})
        .then(response=>dispatch({type:"remove",payload:id}))
        
    }
  
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToStates)(AdminHome);



















