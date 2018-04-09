import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Nav, NavItem } from 'react-bootstrap'
import { Creators } from '../../actions/actions'

const mapDispatchToProps = dispatch => ({
  onLogOutClick: () => dispatch(Creators.logout())
})
class LoggedInView extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    e.preventDefault()
    this.props.onLogOutClick()
  }
  // onClick={this.handleClick}
  render() {
    const materialNav = (
      <Fragment>
        <li>
          <Link to="/editor">Create New Post</Link>
        </li>

        <li>
          <a href="#" onClick={this.handleClick}>
            Log Out
          </a>
        </li>
      </Fragment>
    )
    return materialNav
  }
}

export default connect(null, mapDispatchToProps, null, { pure: false })(
  LoggedInView
)
