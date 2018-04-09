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
  onChangeName: value => dispatch(Creators.updateFieldAuth('name', value)),
  onChangeUrl: value => dispatch(Creators.updateFieldAuth('url', value)),
  onUpdateFile: file => dispatch(Creators.updateFileAuth(file)),
  onSubmit: (name, email, password, history) =>
    dispatch(Creators.requestRegister({ name, email, password, history })),
  onUnload: () => dispatch(Creators.registerPageUnloaded())
})

class Register extends Component {
  constructor() {
    super()
    this.changeEmail = e => this.props.onChangeEmail(e.target.value)
    this.changeName = ev => this.props.onChangeName(ev.target.value)
    this.changeUrl = ev => this.props.onChangeUrl(ev.target.value)
    this.changePassword = e => this.props.onChangePassword(e.target.value)
    this.handleFileChange = ev => {
      const file = ev.target.files[0]
      this.props.onUpdateFile(file)
    }
    this.submitForm = (name, email, password, history) => ev => {
      ev.preventDefault()
      this.props.onSubmit(name, email, password, history)
    }
  }

  componentWillUnmount() {
    this.props.onUnload()
  }

  // changeEmail(e) {
  //   this.props.onChangeEmail(e.target.value);
  // }

  render() {
    const email = this.props.email
    const password = this.props.password
    const name = this.props.name
    const history = this.props.history

    return (
      <div>
        <ListErrors errors={this.props.errors} />
        <h2> Register </h2>
        <form onSubmit={this.submitForm(name, email, password, history)}>
          <div>
            <input
              placeholder="Username"
              type="text"
              style={{ marginBottom: '5px' }}
              value={this.props.name}
              onChange={this.changeName}
            />
            <div className="red-text" style={{ marginBottom: '20px' }}>
              {this.props.touched && this.props.error}
            </div>
          </div>

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
            Register
          </button>
        </form>
      </div>
    )
  }
}

//export default Login;
export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false
})(withRouter(Register))
