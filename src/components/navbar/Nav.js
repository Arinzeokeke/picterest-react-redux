import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import LoggedInView from './LoggedInView'

const LoggedOutView = props => {
  return (
    <Fragment>
      <li>
        <Link to="/login"> Login </Link>
      </li>
      <li>
        <Link to="/register"> Register </Link>
      </li>
      <li>
        <Link to="/"> Home </Link>
      </li>
    </Fragment>
  )
}

const Header = ({ appName, currentUser }) => {
  const materialNav = (
    <nav>
      <div className="nav-wrapper">
        <Link to="/" className="brand-logo">
          {appName}
        </Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {currentUser ? (
            <LoggedInView currentUser={currentUser} />
          ) : (
            <LoggedOutView />
          )}
        </ul>
      </div>
    </nav>
  )
  return <div>{materialNav}</div>
}

export default Header
