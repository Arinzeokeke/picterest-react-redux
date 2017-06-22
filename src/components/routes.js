// import PostsContainer from '../containers/PostsContainer'
// import PostContainer from '../containers/PostContainer'
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { Creators } from '../actions/actions';
import Register from './Register.js';
import Login from './Login.js';

const mapStateToProps = state => ({
  redirectTo: state.common.redirectTo
});

const mapDispatchToProps = dispatch => ({
  onRedirect: () => dispatch(Creators.redirect())
});

class RoutesMap extends Component {
  componentDidMount() {
    if (this.props.redirectTo){
      this.props.onRedirect();
    }
  }
  render() {
    let redirect = null;
    if (this.props.redirectTo) {
      redirect = <Redirect to = {this.props.redirectTo} />
    }
    return (
        <Router>
        
        <Switch>
          { redirect }
          <Route exact path = "/" render = {function() {
            return (<div> Home </div>);}} />

          <Route render = {function() {
            return (<div> 
              Nothing </div>);}} />
        </Switch>
      </Router>
    );
  }
}


export default RoutesMap;

          // <Route path = "/login" component={Login} />
          // <Route path='/register' component={Register} />