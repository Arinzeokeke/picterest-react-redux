import PostsContainer from '../containers/PostsContainer'
import PostContainer from '../containers/PostContainer'
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'


class RoutesMap extends Component {
  render() {
    return (
        <Router>
        
        <Switch>
          <Route exact path = "/" component = {PostsContainer} />
          <Route path = '/post/:slug' component = {PostContainer} />

          <Route render = {function() {
            return (<div> Nothing </div>);}} />
        </Switch>
      </Router>
    );
  }
}


export default RoutesMap;