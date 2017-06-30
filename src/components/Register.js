import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ListErrors  from './ListErrors';
import { Creators } from '../actions/actions';

const mapStateToProps = state => ({
  ...state.auth
});

const mapDispatchToProps = dispatch => ({
  onChangeEmail: value => dispatch(Creators.updateFieldAuth('email', value)),
  onChangePassword: value => dispatch(Creators.updateFieldAuth('password', value)),
  onChangeName: value => dispatch(Creators.updateFieldAuth('name', value)),
  onChangeUrl: value => dispatch(Creators.updateFieldAuth('url', value)),
  onUpdateFile: (file) => dispatch(Creators.updateFileAuth(file)),
  onSubmit: (name, email, password) => dispatch(Creators.requestRegister({name, email, password})),
  onUnload: () => dispatch(Creators.registerPageUnloaded())
});

class Register extends Component {
  constructor() {
    super();
    this.changeEmail = e => this.props.onChangeEmail(e.target.value);
    this.changeName = ev => this.props.onChangeName(ev.target.value);
    this.changeUrl = ev => this.props.onChangeUrl(ev.target.value);
    this.changePassword = e => this.props.onChangePassword(e.target.value);
    this.handleFileChange = (ev) => {
     const file = ev.target.files[0];
     this.props.onUpdateFile(file);
    };
    this.submitForm = (name, email, password) => ev => {
      ev.preventDefault();
      this.props.onSubmit(name, email, password);
    };
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  // changeEmail(e) {
  //   this.props.onChangeEmail(e.target.value);
  // }

  render() {

    const email = this.props.email;
    const password = this.props.password;
    const name = this.props.name;

    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">

            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign Up</h1>
              <p className="text-xs-center">
                <Link to="login">
                  Have an account?
                </Link>
              </p>

              <ListErrors errors={this.props.errors} />

              <form onSubmit={this.submitForm(name, email, password)}>
                <fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Username"
                      value={this.props.name}
                      onChange={this.changeName} />
                  </fieldset>

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
                    className="form-control"
                    type="file" 
                    onChange={this.handleFileChange} />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="Password"
                      value={this.props.password}
                      onChange={this.changePassword} />
                  </fieldset>

                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                    disabled={this.props.inProgress}>
                    Sign Up
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
export default connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(Register);