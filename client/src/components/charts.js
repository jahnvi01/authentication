import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Chart } from "react-google-charts";
import Navbar from './navbar';

class Charts extends Component {

    conditionCheck=()=>{
      if (this.props.message[0] !== "" && this.props.message !== "") {
  
        console.log(this.props.message);
        this.props.clear();
  
      }
      if (!this.props.token) {
        this.props.history.push('/login');
      }
    }
    componentWillMount() {
  
      this.props.get();
  if(this.props.correctAnswer===0 && this.props.incorrectAnswer===0 && this.props.notAnswered===0){

    this.props.history.push('/profile'); 
  }
    }
  
    render() {
        var correctAnswer=this.props.correctAnswer;
        var incorrectAnswer=this.props.incorrectAnswer;
        var notAnswered=this.props.notAnswered;
     
      return (
        <div>
          <Navbar />
        <div className="testset container">
      <div className="row">
     <div className="col-md-10">Your Scores </div>
      <div className="col-md-2"><Link to='/'><button>Go back to Home</button></Link></div>
     
     </div>       
   <div className="row">
     <div className="col-md-6">
      <Chart
  width={'500px'}
  height={'300px'}
  chartType="PieChart"
  loader={<div>Loading Chart</div>}
  data={[
    ['Total questions', 'your score'],
    ['Correct answers',correctAnswer ],
    ['Incorrect answers', incorrectAnswer],
    ['Not answered', notAnswered],

  ]}
  options={{
    title: 'My Current Score',
    // Just add this option
    is3D: true,
  }}
  rootProps={{ 'data-testid': '2' }}
/>
</div>
<div className="col-md-6">
 <h2>Correct Answers: {correctAnswer} </h2>
 <h2>InCorrect Answers: {incorrectAnswer} </h2>
 <h2>Not Answered: {notAnswered} </h2>
  </div>
    </div>
        </div>
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
      message: state.message,
      notAnswered:state.notAnswered,
      incorrectAnswer:state.incorrectAnswer,
        correctAnswer:state.correctAnswer
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
    
  
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToStates)(Charts);
