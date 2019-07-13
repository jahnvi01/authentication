import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class AdminNavbar extends Component {
  
 
  render() {

    return (
      <div className="navbar row">
       <div className="col-md-5"><Link className="logo link" to='/profile'>TestPortal</Link></div>
       <div className="col-md-7 nav-part">
        <ul className="nav-list">
            <li><Link to="/profile" className="nav-item link">Home</Link></li>
            {/* <li><Link to="/test" className="nav-item link">Test</Link></li>
            <li className="nav-item">Scores</li> */}
            {/* <li><Link className="nav-item link" to="/admin_login">Admin</Link></li> */}
            <li className="nav-item" onClick={()=>this.props.logout()}>Logout</li>
        </ul>

       </div>

      </div>
    );
  }
}
function mapStateToProps(state){

      return {
          user:state.user.user[0],
          token:state.user.token
      }
    }
    function mapDispatchToStates(dispatch){
      return{
        logout: () => {
          dispatch({ type: "admin_logout", payload: "" })
        },
   
      }
    }

export default connect(mapStateToProps,mapDispatchToStates)(AdminNavbar);