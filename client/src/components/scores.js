import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Navbar from './navbar';
import BarChart from 'react-bar-chart';
import { Chart } from "react-google-charts";

const data = [
  {text: 'Man', value: 500}, 
  {text: 'Woman', value: 300} 
];
const margin = {top: 20, right: 20, bottom: 30, left: 40};
class Scores extends Component {

  state = {
    score: null,
    subjects:[],
    data: [
      {text: 'Man', value: 500}, 
      {text: 'Woman', value: 300} 
    ],
    
   }
 
  getScores = () => {
    if(this.props.user){
      var email=this.props.user[0].email;
       // console.log(this.props.user)
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
  getSubjects = () => {
    if(this.props.user){
      var email=this.props.user[0].email;
       // console.log(this.props.user)
        return fetch('/api/info/subjects',{
            method: "post",
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },body:JSON.stringify({email})})
            .then(res=>res.json())
          .then(response=> this.setState({ subjects: response.subjects }))
    }
 
    //  console.log(token);
  

  }
  selectSubject=()=>{
    this.state.data.pop();
    this.state.data.pop();
   
   console.log(this.state.data);
    var subject = document.getElementById("subject-option").value;
    this.state.score.map(set=>{
     if(set.subject===subject){
     //  this.state.data.push(set.score);
     var date=set.date;
     var score=set.score;
     var subdata=[date,score]
     this.state.data.push(subdata);
     console.log(this.state.data);
return this.state.data;
     }
     } ) 
    
  }
  componentWillMount() {
    this.props.get();
    this.getScores();
   this.getSubjects();
  }
  componentDidMount() {
    this.props.get();
    this.getScores();
    this.getSubjects();
  }
 
  render() {
    //this.getSubjects();
    //this.getScores();
    if (!this.props.token) {
      this.props.history.push('/');
    }
    var i=0;
    if(this.state.score){
      
    var showtable=this.state.score.map(set=>{
      i++;
      // this.state.subjects.push(set.subject);
      // console.log(this.state.subjects)
        return    <tr key={set._id}>
        <th scope="row">{i}</th>
        <td>{set.subject}</td> 
        <td>{set.score}</td>
        <td>{set.correct}</td>
        <td>{set.incorrect}</td>
        <td>{set.notAnswered}</td>
        <td>{set.date}</td>
      </tr>
     } )
     var showsubjects=this.state.subjects.map(set=>{
        return    <option key={set}>{set}</option>
     } )
 
    }

    return (
      <div>
        <Navbar />
      <div className="testset container">

<div className="row">
<div className="col-md-6">
<BarChart ylabel='Quantity'
                  width={this.state.width}
                  height={500}
                  margin={margin}
                  data={data}
                  onBarClick={this.handleBarClick}/>
      {/* <Chart
  width={'500px'}
  height={'300px'}
  chartType="Bar"
  loader={<div>Loading Chart</div>}
  data={[
    ['Year', 'Sales'],
  this.state.data
  ]}
//   data={[
//     ['Year', 'Sales'],
// [1,3],
// [2,5]
//   ]}

  options={{
    // Material design options
    chart: {
      title: 'your Performance',
      subtitle: 'subject',
    },
  }}
  // For tests
  rootProps={{ 'data-testid': '2' }}
/> */}
</div>
<div className="col-md-6">
  <select id="subject-option" onChange={()=>{this.selectSubject()}}>
{showsubjects}
  </select>
</div>
</div>
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
      <th scope="col">Date</th>
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
//  console.log(state.user.user);
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





















