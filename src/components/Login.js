import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ListErrors  from './ListErrors';
import agent from '../agent';
import { Creators } from '../actions/actions';

const mapStateToProps = state => ({
  ...state.auth
});

const mapDispatchToProps = dispatch => ({
  onChangeEmail: value => dispatch(Creators.updateFieldAuth('email', value)),
  onChangePassword: value => dispatch(Creators.updateFieldAuth('password', value)),
  onSubmit: (email, password) => dispatch(Creators.requestLogin({email, password})),
  onUnload: () => dispatch(Creators.loginPageUnloaded())
});

class Login extends Component {
  constructor() {
    super();
    this.changeEmail = e => this.props.onChangeEmail(e.target.value);
    this.changePassword = e => this.props.onChangePassword(e.target.value);
    this.submitForm = (email, password) => ev => {
      ev.preventDefault();
      this.props.onSubmit(email, password);
    };
    // this.changeEmail = this.changeEmail.bind(this);
    // this.changePassword = this.changePassword.bind(this);
    // this.submitForm = this.submitForm.bind(this);
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  // changeEmail(e) {
  //   this.props.onChangeEmail(e.target.value);
  // }

  render() {

    const { email, password } = this.props;

    return (
            <div className="auth-page">
        <div className="container page">
          <div className="row">

            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign In</h1>
              <p className="text-xs-center">
                <Link to="register">
                  Need an account?
                </Link>
              </p>

              <ListErrors errors={this.props.errors} />

              <form onSubmit={this.submitForm(email, password)}>
                <fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="email"
                      placeholder="Email"
                      value={this.props.email}
                      onChange={this.changeEmail} />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={this.changePassword} />
                  </fieldset>

                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                    disabled={this.props.inProgress}>
                    Sign in
                  </button>

                </fieldset>
              </form>
            </div>

          </div>
        </div>
      </div>
      );
  }
}

//export default Login;
export default connect(mapStateToProps, mapDispatchToProps)(Login);