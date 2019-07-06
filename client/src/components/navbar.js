import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Navbar extends Component {

 
  render() {


    return (
      <div className="navbar row">
       <div className="col-md-5"><Link className="logo link" to='/profile'>TestPortal</Link></div>
       <div className="col-md-7 nav-part">
        <ul className="nav-list">
            <li className="nav-item">Home</li>
            <li className="nav-item">Test</li>
            <li className="nav-item">Scores</li>
            <li className="nav-item" onClick={()=>this.props.logout()}>Logout</li>
        </ul>

       </div>

      </div>
    );
  }
}
function mapStateToProps(state){

      return {
          user:state.user[0],
          token:state.token
      }
    }
    function mapDispatchToStates(dispatch){
      return{
  
        logout:()=>{
          dispatch({type:"logout",payload:""})
        }
      }
    }

export default connect(mapStateToProps,mapDispatchToStates)(Navbar);