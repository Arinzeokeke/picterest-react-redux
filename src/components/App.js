import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import '../res/css/App.css';
import PostsContainer from '../containers/PostsContainer'
import PostContainer from '../containers/PostContainer'

class App extends Component {
  render() {
    return (
      <div className = 'container-fluid app'>
        <Router>
        
        <Switch>
          <Route exact path = "/" component = {PostsContainer} />
          <Route path = '/post/:slug' component = {PostContainer} />

          <Route render = {function() {
            return (<div> Nothing </div>);}} />
        </Switch>
      </Router>
      </div>
    );
  }
}

export default App;

      // <Router>
        
      //   <Switch>
      //     <Route exact path = "/" component = {PostsContainer} />

      //     <Route render = {<div> Nothing </div>} />
      //   </Switch>
      // </Router>
//<NavContainer />
          // <Route path = "/feed" component = {PostsContainer} />
          // <Route path = "/post/:slug" component = {PostContainer} />
          // <Route path = "/@:username" component = {ProfilesContainer} />