import React ,{ Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import { withRouter } from "react-router";
class Subjects extends Component {
 
   componentDidMount(){

 this.props.getSubjects();
   }
   handletest=(subject)=>{
    
     this.props.chooseSubject(subject);
 this.props.history.push('/test');
   }
   showSubject=()=>{
    var subjects
       if(this.props.subjects){
        subjects=this.props.subjects;         
subjects=subjects.map(subject=>{
    return(
        <li key={subject._id} className="subject">
        <h3 className="subject-name">{subject.subject}
        </h3>
        <button className="btn" onClick={()=>{this.handletest(subject.subject)}}>Start Test</button>
        </li>
    )
      
})
       }else{
subjects=<h3>No subjects to display</h3>
       }
return subjects;
}
    render(){
   
        return (
    
              
                   <div className="container">
                       
                       <ul className="subject-list">
{this.showSubject()}
</ul>
  </div>
         
           
 
       
        )
    }



}


function mapStateToProps(state){

    return {

        subjects:state.admin.subjects,
    }
  }
  function mapDispatchToStates(dispatch){
    return{
   
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
   }
    }
  }
export default withRouter( connect(mapStateToProps,mapDispatchToStates)(Subjects));