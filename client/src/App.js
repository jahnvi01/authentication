import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Log from './login';
import Profile from './profile';
import { Switch, Route} from 'react-router-dom';
import './App.css';
import Reg from './reg';
import 'bootstrap/dist/css/bootstrap.css';
class App extends Component {
  render() {
    return (

      <div className="App">
 
    <Switch>    <Route exact path="/register" component={Reg} />
    <Route exact path="/" component={Log} />
    <Route exact path="/profile" component={Profile} />
    </Switch >


      </div>
    );
  }
}

export default App;