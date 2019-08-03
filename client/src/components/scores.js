import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Navbar from './navbar';
class Scores extends Component {

  state = {
    score: null,
    }
 
  getScores = () => {
    if(this.props.user){
      var email=this.props.user[0].email;
        console.log(this.props.user)
        return fetch('/api/info/scores',{
            method: "post",
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },body:JSON.stringify({email})})
            .then(res=>res.json())
          .then(response=> this.setState({ score: response.score }))
    }
 
    //  console.log(token);
  

  }
  componentWillMount() {
    this.props.get();
    this.getScores();

  }
  componentDidMount() {
    this.props.get();
    this.getScores();
  }
  render() {
   console.log(this.state.score);
    if (!this.props.token) {
      this.props.history.push('/');
    }
    var i=0;
    if(this.state.score){
      
    var showtable=this.state.score.map(set=>{
      i++;
        return    <tr>
        <th scope="row">{i}</th>
        <td>{set.subject}</td>
        <td>{set.score}</td>
        <td>{set.correct}</td>
        <td>{set.incorrect}</td>
        <td>{set.notAnswered}</td>
      </tr>
     } )
    }
  // this.getScores();
    return (
      <div>
        <Navbar />
      <div className="testset container">
     <div className="row">
     <div className="col-md-12"  style={{marginTop:"20px"}}>
     <table className="table table-striped">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Subject</th>
      <th scope="col">Score</th>
      <th scope="col">correct</th>
      <th scope="col">incorrect</th>
      <th scope="col">NotAnswered</th>
    </tr>
  </thead>
  <tbody>
{showtable}
  </tbody>
</table>
      </div>
      </div>
      </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state.user.user);
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

   
  }
}

export default connect(mapStateToProps, mapDispatchToStates)(Scores);





















