import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Log from './login';
import Profile from './profile';
import Quiz from './components/quiz';
import { Switch, Route} from 'react-router-dom';
import './App.css';
import Reg from './reg';
import Charts from './components/charts';
import 'bootstrap/dist/css/bootstrap.css';
class App extends Component {
  render() {
    return (

      <div className="App">
 
    <Switch>    <Route exact path="/register" component={Reg} />
    <Route exact path="/" component={Log} />
    <Route exact path="/profile" component={Profile} />
    <Route exact path="/test" component={Quiz} />
    <Route exact path="/chart" component={Charts} />
    </Switch >


      </div>
    );
  }
}

export default App;