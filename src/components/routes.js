// import PostsContainer from '../containers/PostsContainer'
// import PostContainer from '../containers/PostContainer'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom'
import { Creators } from '../actions/actions';
import Register from './Register.js';
import Login from './Login';
import App from './App';

const mapStateToProps = state => ({
  redirectTo: state.common.redirectTo
});

const mapDispatchToProps = dispatch => ({
  onRedirect: () => dispatch(Creators.redirect())
});

class RoutesMap extends Component {
  componentDidMount() {
    if (this.props.redirectTo != null){
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
      <App>
        <Switch>
        { redirect }
          <Route exact path = "/" render = {function() {
            return (<div> Home </div>);}} />
          <Route path = "/login" component={Login} />
          <Route path='/register' component={Register} />
          <Route render = {function() {
            return (<div> 
              <Link to='/login'> Login </Link> </div>);}} />
        </Switch>
      </App>
     </Router>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(RoutesMap);

          // <Route path = "/login" component={Login} />
          // <Route path='/register' component={Register} />