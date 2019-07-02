import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Chart } from "react-google-charts";


class Charts extends Component {

    
    componentWillMount() {
  
      this.props.get();
  
    }
  
    render() {
        var correctAnswer=this.props.correctAnswer;
        var incorrectAnswer=this.props.incorrectAnswer;
        var notAnswered=this.props.notAnswered;
      if (this.props.message[0] !== "" && this.props.message !== "") {
  
        console.log(this.props.message);
        this.props.clear();
  
      }
      if (!this.props.token) {
        this.props.history.push('/login');
      }
      return (
        <div className="testset container">
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