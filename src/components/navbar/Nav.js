import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, 
  Nav, 
  NavItem, 
  NavDropdown, 
  MenuItem } from 'react-bootstrap';

const LoggedOutView = props => {
  return (
  <Nav pullRight>
    <NavItem eventKey={1} > 
      <Link to='/login'> Login </Link>
    </NavItem>
    <NavItem eventKey={2} >
    <Link to='/register'> Register </Link>
    
    </NavItem>
  </Nav>
    );

};

const LoggedInView = props => {
  return (
  <Nav pullRight>
    <NavItem eventKey={1} href="#">Create New Post</NavItem>
    <NavItem eventKey={2} href="#">{props.currentUser.name}</NavItem>
    <NavItem eventKey={3} href="#">Sign Out</NavItem>

  </Nav>
    );

};
const Header = ({appName, currentUser}) => {
    const navbarInstance = (
      <Navbar  collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">React-Bootstrap</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Action</MenuItem>
             <MenuItem divider />
              <MenuItem eventKey={3.3}>Separated link</MenuItem>
            </NavDropdown>
          </Nav>
          <Nav pullRight>
            {currentUser ? <LoggedInView currentUser={currentUser}/> : <LoggedOutView />
          }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
    return (
      <div>
      { navbarInstance }
      </div>
    );
}; 

export default Header;
