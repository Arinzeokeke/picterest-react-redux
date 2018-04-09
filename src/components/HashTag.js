import React from 'react'
import { connect } from 'react-redux'
import agent from '../agent'
import { Creators } from '../actions/actions'

const mapDispatchToProps = dispatch => ({})

const HashTag = props => {
  return <div class="chip">#{props.tag}</div>
}

export default HashTag
