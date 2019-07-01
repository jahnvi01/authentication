import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Quiz extends Component {

state={
  testset:{}
}
getTest=()=>{
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
    .then(data =>this.setState({testset:data.testset}) );

}
  componentWillMount() {

    this.props.get();
   
  }
  componentDidMount(){
    this.getTest();

  }
  render() {
    console.log(this.state.testset);
    if (this.props.message[0] !== "" && this.props.message !== "") {

      console.log(this.props.message);
      this.props.clear();

    }
    if (!this.props.token) {
      this.props.history.push('/login');
    }
    return (
      <div className="block">
        hii
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
 

  }
}

export default connect(mapStateToProps, mapDispatchToStates)(Quiz);