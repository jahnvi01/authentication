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
       if(this.props.subjects){
        var subjects=this.props.subjects;         
subjects=subjects.map(subject=>{
    return(
        <li key={subject._id} className="subject">
        <h3 className="subject-name">{subject.subject}
        </h3>
        <button className="btn" onClick={()=>{this.handletest(subject.subject)}}>Start Subjects</button>
        </li>
    )
      
})
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
       
  
        const config={
          headers:{
            "content-type": "application/json",
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