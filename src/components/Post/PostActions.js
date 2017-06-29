import { Link } from 'react-router-dom';
import React from 'react';
import { connect } from 'react-redux';
import agent from '../../agent';
import { Creators } from '../../actions/actions';

const mapDispatchToProps = dispatch => ({
  onClickDelete: payload => dispatch(Creators.deletePost(payload))
});

const PostActions = props => {
  const post = props.post;
  const del = () => {
    props.onClickDelete(agent.Posts.del(post.slug))
  };

  return (
          <span>

        <Link
          to={`/editor/${post.slug}`}
          className="btn btn-outline-secondary btn-sm">
          <i className="ion-edit"></i> Edit Post
        </Link>

        <button className="btn btn-outline-danger btn-sm" onClick={del}>
          <i className="ion-trash-a"></i> Delete Post
        </button>

      </span>
    );
};

export default connect(null, mapDispatchToProps)(PostActions);