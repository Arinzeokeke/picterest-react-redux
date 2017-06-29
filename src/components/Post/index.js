import React, { Component } from 'react';
import { connect } from 'react-redux';
import agent from '../../agent';
import { Creators } from '../../actions/actions';
import PostBox from '../PostBox';

const mapStateToProps = state => ({
  ...state.post,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onLoad: (payload) => dispatch(Creators.postPageLoaded(payload)),
  onUnload: () => dispatch(Creators.postPageUnloaded())
});

class Post extends Component {
  componentWillMount() {
    this.props.onLoad(agent.Posts.get(this.props.match.params.slug));    
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    if (!this.props.post) {
      return (
        <p> Loading </p>
        );
    }

    const canEdit = this.props.currentUser &&
      this.props.currentUser.id === this.props.post.author.id;
    return (
        <div>
          <div className="flex-grid">
            <PostBox post={this.props.post} canEdit={canEdit} />
          </div>
        </div>
      );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Post);