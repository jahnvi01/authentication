import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AdminNavbar from './admin_navbar';

class Editquiz extends Component {

  state = {
    testset: null,
 
  }
  getTest =() => {
  
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          "content-type": "application/json",
          "x-auth-token": token
        }
      }
  
      return fetch(`/api/test/subject/${this.props.test}`, config)
        .then(res => res.json())
        .then(data => this.setState({testset:data.testset}) );
  
    }

    addset=(set)=>{

       
      return fetch('/api/test/addquestion',{
        method: "post",
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },body:JSON.stringify(set)
      })
      .then(res=>res.json())
      // .then(data=>console.log(data))
    .then(data=>this.setState({testset:[...this.state.testset,data.set]}))  
    }
  addquestion = (e) => {
      e.preventDefault();
var question=document.getElementById("question").value;
var opt1=document.getElementById("opt1").value;
var opt2=document.getElementById("opt2").value;
var opt3=document.getElementById("opt3").value;
var opt4=document.getElementById("opt4").value;
var answer=document.getElementById("answer").value;
if(question && opt1 && opt2 && opt3 && opt4 && answer ){
var set={
    subject:this.props.test,
    question:question,
    opt1:opt1,
    opt2:opt2,
    opt3:opt3,
    opt4:opt4,
    answer:answer
}
this.addset(set);
}
else{
    alert ("please fill up all fields");
} 
};
handleDelete=(e,id)=>{
  e.preventDefault();
 
  return fetch('/api/test/question/'+id,{method:"delete"})
 .then(res=>res.json())
  .then(response=>this.setState({
    testset:this.state.testset.filter(question=>question._id!==response.id)    
}))

}
componentDidUpdate(){
 // this.getTest();
 console.log(this.state);
}
componentWillMount(){
  this.getTest();
  // this.setState({testset:this.props.testset});
  //  console.log(this.props.testset);
}

  render() {
    
    var questions;
    if (this.state.testset) {
      var i = 0;
      questions = this.state.testset.map(question => {
        i++;


        return <div key={question._id}>
<div style={{display: "flex"}}>
          <h4>{i}.  {question.question}</h4> 
          <button className="btn" onClick={(event)=>{this.handleDelete(event,question._id)}}>Delete</button>
          </div>
          <div>
            <ul className="row option-set">
              <li className="options"><input className="option-check" type="checkbox" value={question.opt1} />{question.opt1}</li>
              <li className="options"><input className="option-check"  type="checkbox" value={question.opt2} />{question.opt2}</li>
              <li className="options"><input className="option-check" type="checkbox" value={question.opt3} />{question.opt3}</li>
              <li className="options"><input className="option-check" type="checkbox" value={question.opt4} />{question.opt4}</li>
            </ul>
          </div>

        </div>
      }
      )
    }
    if (this.props.message[0] !== "" && this.props.message !== "") {

      console.log(this.props.message);
      this.props.clear();

    }
 
    return (
      <div>
        <AdminNavbar />
      <div className="testset container">
     <div className="row">
     <div className="col-md-12"  style={{marginTop:"20px"}}>
        <form action="">
          {questions}
         </form>
      </div>
      </div>
      <form action="">
         <div className="row">
             <div className="col-md-12"> 
          <input type="text" id="question" placeholder="enter question title here..."/>
          </div>
          </div>
          <div className="row">
             <div className="col-md-12"> 
          <input type="text" id="opt1" placeholder="option 1"/>
          <input type="text" id="opt2" placeholder="option 2"/>
          <input type="text" id="opt3" placeholder="option 3"/>
          <input type="text" id="opt4" placeholder="option 4"/>
          </div>
          </div>
          <div className="row">
             <div className="col-md-12"> 
          <input type="text" id="answer" placeholder="answer"/> 
          </div>
          </div>
             <input type="submit"  value="Submit" className="btn" onClick={(event) => { this.addquestion(event)}} />
     
        </form>
      </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
 
  console.log(state.admin);
  return {
    access_verified:state.admin.access_verified,
    message: state.user.message,
    test:state.admin.test,
    testset:state.admin.testset,
  }
}
function mapDispatchToStates(dispatch) {

  return {


      

    clear: () => {
      dispatch({ type: "clear", payload: "" })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToStates)(Editquiz);