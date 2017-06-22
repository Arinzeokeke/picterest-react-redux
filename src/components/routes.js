// import PostsContainer from '../containers/PostsContainer'
// import PostContainer from '../containers/PostContainer'
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Register from './Register.js';
import Login from './Login.js';

class RoutesMap extends Component {
  render() {
    return (
        <Router>
        
        <Switch>
          <Route exact path = "/" render = {function() {
            return (<div> Home </div>);}} />
          <Route path = "/login" component={Login} />
          <Route path='/register' component={Register} />

          <Route render = {function() {
            return (<div> Nothing </div>);}} />
        </Switch>
      </Router>
    );
  }
}


export default RoutesMap;