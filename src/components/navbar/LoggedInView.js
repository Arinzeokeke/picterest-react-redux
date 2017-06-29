import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {  
  Nav, 
  NavItem } from 'react-bootstrap';
  import { Creators } from '../../actions/actions';


const mapDispatchToProps = dispatch => ({
  onLogOutClick: () => dispatch(Creators.logout())
});
class LoggedInView extends  Component {

  constructor(){
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.onLogOutClick();
  }
// onClick={this.handleClick}
  render() {
    return (
    <Nav pullRight>
      <NavItem eventKey={1} href="#">
      <Link to='/editor'> 
      Create New Post 
      </Link>
      </NavItem>
      <NavItem eventKey={2} href="#">@{this.props.currentUser.name}</NavItem>
      <NavItem eventKey={3} href="#" onClick={this.handleClick}> logout
      </NavItem>

    </Nav>
    );
  }
}

export default connect(null, mapDispatchToProps, null, {pure: false})(LoggedInView);