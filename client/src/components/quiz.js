import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

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
      //  console.log(options[2]);
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
    notanswered=answers.length-incorrect-correct;
  var  data={
      correctAnswer:correct,
      incorrectAnswer:incorrect,
      notAnswered:notanswered
    }
 this.props.sendScore(data);
 let counter = setInterval(()=>{
  this.props.history.push('/chart');
 }, 3000);
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

    return fetch('/api/test', config)
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
    var questions

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
      this.props.history.push('/login');
    }
    return (
      <div className="testset container">
        <form action="">
          {questions}
          <input type="submit" value="Submit" onClick={(event) => { this.checkResult(event) }} />
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {
    users: state.users,
    user: state.user,
    token: state.token,
    message: state.message

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
      dispatch({ type: "score", payload: data })
    },

  }
}

export default connect(mapStateToProps, mapDispatchToStates)(Quiz);