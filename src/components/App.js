import React, { Component } from 'react';
import '../res/css/App.css';
import Nav from './navbar/Nav'
import {connect} from 'react-redux'
import  RoutesMap from './routes'



const mapStateToProps = state => ({
  appLoaded: state.common.appLoaded,
  appName: state.common.appName,
  currentUser: state.auth.user
});

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) =>
    dispatch({ type: APP_LOAD, payload, token, skipTracking: true }),
  onRedirect: () =>
    dispatch({ type: REDIRECT })
});

class App extends Component {
  render() {
    return (
      <div className = 'container-fluid app'>
      <RoutesMap />
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