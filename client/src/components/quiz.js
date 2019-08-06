import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Navbar from './navbar';
class Quiz extends Component {

  state = {
    testset: null,
    answers: []
  }
  handlecheck = (e, no) => {
    // function to allow users to select only one option to answer  
    var answer = e.target.value;

    var options = e.target.parentNode.parentNode.childNodes;
    this.state.answers.push(answer[no]);
    //console.log(this.state.answers[0]);
    for (var i = 0; i < 4; i++) {
      if (options[i].childNodes[1].data !== answer) {
        options[i].childNodes[0].checked = false;

      }
    }
  }
  checkResult = (e) => {
    var correct = 0;
    var incorrect = 0;
    var notanswered = 0;
    e.preventDefault();
    var answers = document.getElementsByClassName("option-set");

    for (var i = 0; i < answers.length; i++) {
      var correctoption = this.state.answers[i];
      var options = answers[i].childNodes;
      for (var j = 0; j < options.length; j++) {
        if (options[j].childNodes[0].checked === true) {
          console.log(options[j].childNodes[0].value);
          if (options[j].childNodes[0].value === correctoption) {

            correct++;
          }
          else {
           incorrect++;
          }

        }
      }

    };
    var email,subject;
    if(this.props.user){
      var email=this.props.user[0].email;
      var subject=this.props.test;
    }
    notanswered=answers.length-incorrect-correct;
    var score=correct/(incorrect+correct+notanswered);
    score=score*100;
  var  data={
    email:email,
    subject:subject,
    score:score,
      correctAnswer:correct,
      incorrectAnswer:incorrect,
      notAnswered:notanswered
    }
 this.props.sendScore(data);
 this.props.history.push('/chart');
  }
  getTest = () => {
    const token = localStorage.getItem('token');
 
    //  console.log(token);
    const config = {
      headers: {
        "content-type": "application/json",
        "x-auth-token": token
      }
    }

    return fetch(`/api/test/subject/${this.props.test}`, config)
      .then(res => res.json())
      .then(data => this.setState({ testset: data.testset }));

  }
  componentWillMount() {

    this.props.get();

  }
  componentDidMount() {
    this.getTest();
  }
  render() {
    var questions;
  
    
    if (this.state.testset) {
      var i = 0;
      questions = this.state.testset.map(question => {
        i++;
        this.state.answers.push(question.answer);

        return <div key={question._id}>

          <h4>{i}.  {question.question}</h4>
          <div>
            <ul className="row option-set">
              <li className="options"><input className="option-check" onClick={(event) => { this.handlecheck(event, i - 1) }} type="checkbox" value={question.opt1} />{question.opt1}</li>
              <li className="options"><input className="option-check" onClick={(event) => { this.handlecheck(event, i - 1) }} type="checkbox" value={question.opt2} />{question.opt2}</li>
              <li className="options"><input className="option-check" onClick={(event) => { this.handlecheck(event, i - 1) }} type="checkbox" value={question.opt3} />{question.opt3}</li>
              <li className="options"><input className="option-check" onClick={(event) => { this.handlecheck(event, i - 1) }} type="checkbox" value={question.opt4} />{question.opt4}</li>
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
    if (!this.props.token) {
      this.props.history.push('/');
    }
    return (
      <div>
        <Navbar />
      <div className="testset container">
     <div className="row">
     <div className="col-md-12"  style={{marginTop:"20px"}}>
        <form action="">
          {questions}
          <input type="submit" value="Submit" className="btn" onClick={(event) => { this.checkResult(event) }} />
        </form>
      </div>
      </div>
      </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state.admin);
  return {
    users: state.user.users,
    user: state.user.user,
    token: state.user.token,
    message: state.user.message,
    test:state.admin.test
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

    clear: () => {
      dispatch({ type: "clear", payload: "" })
    },
    sendScore: (data) => {
     
      return fetch('/api/info/sendscore',{
        method: "post",
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },body:JSON.stringify(data)})
        .then(res=>res.json())
      .then(response=> dispatch({ type: "score", payload: data }))
    },
   
  }
}

export default connect(mapStateToProps, mapDispatchToStates)(Quiz);