import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import logo from '../logo.svg';
import '../res/css/App.css';

class App extends Component {
  render() {
    return (
      <div className = 'container-fluid app'>
      <Router>
        
        <Switch>
          <Route exact path = "/" component = {PostsContainer} />

          <Route render = {<div> Nothing </div>} />
        </Switch>
      </Router>
      </div>
    );
  }
}

export default App;
//<NavContainer />
          // <Route path = "/feed" component = {PostsContainer} />
          // <Route path = "/post/:slug" component = {PostContainer} />
          // <Route path = "/@:username" component = {ProfilesContainer} />