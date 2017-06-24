import React from 'react';
import { connect } from 'react-redux';
import agent from '../agent';
import { Creators } from '../actions/actions';

const mapDispatchToProps = dispatch => ({

});

const HashTag = props => {
  return (
    <span> #{props.tag}, 
    </span>
    );
};

export default HashTag;
