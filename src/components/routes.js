import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  Link
} from 'react-router-dom'
import firebase from 'firebase'
import { Creators } from '../actions/actions'
import Register from './Register.js'
import Login from './Login'
import App from './App'
import Home from './Home'
import Editor from './Editor'
import Post from './Post/index'

const mapStateToProps = state => ({
  redirectTo: state.common.redirectTo
})

const mapDispatchToProps = dispatch => ({
  onRedirect: () => dispatch(Creators.redirect())
})

class RoutesMap extends Component {
  componentDidMount() {
    if (this.props.redirectTo != null) {
      this.props.onRedirect()
    }
  }

  componentWillMount() {
    // Initialize Firebase
    const config = {
      apiKey: 'AIzaSyBZkgZKVc0SFUyNvJ62VBvvUcJ-ti_Gyks',
      authDomain: 'picterest-44fd5.firebaseapp.com',
      databaseURL: 'https://picterest-44fd5.firebaseio.com',
      projectId: 'picterest-44fd5',
      storageBucket: 'gs://picterest-44fd5.appspot.com',
      messagingSenderId: '391756120477'
    }
    firebase.initializeApp(config)
  }

  render() {
    let redirect = null
    // if (this.props.redirectTo) {
    //   redirect = <Redirect to = {this.props.redirectTo} />
    // }
    return (
      <Router>
        <App>
          <Switch>
            {redirect}

            <Route exact path="/" component={Home} />

            <Route path="/post/:slug" component={Post} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route exact path="/editor" component={Editor} />
            <Route path="/editor/:slug" component={Editor} />
            <Route
              render={function() {
                return <div>J hus </div>
              }}
            />
          </Switch>
        </App>
      </Router>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoutesMap)

// <Route path = "/login" component={Login} />
// <Route path='/register' component={Register} />
