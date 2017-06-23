import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './navbar/Nav';
import  RoutesMap from './routes';
import '../res/css/App.css';
import { Creators } from '../actions/actions';
import agent from '../agent';



const mapStateToProps = state => ({
  appLoaded: state.common.appLoaded,
  appName: state.common.appName,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) =>
    dispatch(Creators.appLoad(payload, token, true))
});

class App extends Component {

  componentWillMount() {
    const token = window.localStorage.getItem('jwt');
    if (token) {
      agent.setToken(token);
    }

    this.props.onLoad(token ? agent.Auth.current(): null, token);
  }


  render() {
    const { appName, appLoaded, currentUser } = this.props;
    if (appLoaded) {
      return (
        <div className='container-fluid app'>
          <Header 
          appName={appName}
          currentUser={currentUser}/>
          { this.props.children }
        </div>
        )
    }
    return (
      <div className = 'container-fluid app'>
      <Header />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(App);

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