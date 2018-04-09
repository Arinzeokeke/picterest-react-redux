import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ListErrors from './ListErrors'
import { Creators } from '../actions/actions'
import { withRouter } from 'react-router-dom'

const mapStateToProps = state => ({
  ...state.auth
})

const mapDispatchToProps = dispatch => ({
  onChangeEmail: value => dispatch(Creators.updateFieldAuth('email', value)),
  onChangePassword: value =>
    dispatch(Creators.updateFieldAuth('password', value)),
  onSubmit: (email, password, history) =>
    dispatch(Creators.requestLogin({ email, password, history })),
  onUnload: () => dispatch(Creators.loginPageUnloaded())
})

class Login extends Component {
  constructor() {
    super()
    this.changeEmail = e => this.props.onChangeEmail(e.target.value)
    this.changePassword = e => this.props.onChangePassword(e.target.value)
    this.submitForm = (email, password, history) => ev => {
      ev.preventDefault()
      this.props.onSubmit(email, password, history)
    }
  }

  componentWillUnmount() {
    this.props.onUnload()
  }

  // changeEmail(e) {
  //   this.props.onChangeEmail(e.target.value);
  // }

  render() {
    const { email, password, history } = this.props

    return (
      <div>
        <ListErrors errors={this.props.errors} />
        <h2> Login </h2>
        <form onSubmit={this.submitForm(email, password, history)}>
          <div>
            <input
              placeholder="Email"
              type="email"
              style={{ marginBottom: '5px' }}
              value={this.props.email}
              onChange={this.changeEmail}
            />
            <div className="red-text" style={{ marginBottom: '20px' }}>
              {this.props.touched && this.props.error}
            </div>
          </div>

          <div>
            <input
              placeholder="Password"
              type="password"
              style={{ marginBottom: '5px' }}
              value={this.props.password}
              onChange={this.changePassword}
            />
            <div className="red-text" style={{ marginBottom: '20px' }}>
              {this.props.touched && this.props.error}
            </div>
          </div>

          <button
            className="teal btn-flat right white-text"
            type="submit"
            disabled={this.props.inProgress}
          >
            Login
          </button>
        </form>
      </div>
    )
  }
}

//export default Login;
export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false
})(withRouter(Login))
