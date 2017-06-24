import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import agent from '../agent';
import { Creators } from '../actions/actions';
import HashTag from './HashTag';

const LIKED_CLASS = 'btn btn-sm btn-primary';
const NOT_LIKED_CLASS = 'btn btn-sm btn-outline-primary';

const mapDispatchToProps = dispatch => ({
  like: slug => dispatch(
    Creators.postLiked(agent.Posts.like(slug))),
  unlike: slug => dispatch(
    Creators.postUnliked(agent.Posts.unlike(slug)))
});

const PostBox = props => {
  const post = props.post;
  const likeClass = post.liked ? LIKED_CLASS : NOT_LIKED_CLASS;

  const handleClick = ev => {
    ev.preventDefault();
    if (post.liked){
      props.unfavorite(post.slug);
    } else {
      props.favorite(post.slug);
    }
  };

  return (
    <div className='box'>
      <div className='meta-info'>
        <Link to={`@${post.author.name}`}>
          <p> @{post.author.name} </p>
        </Link>

        <span className='date'>
          { new Date(post.createdAt).toDateString()}
        </span>
      </div>

      <div className="post-image">
      <img src={post.url} className='img img-responsive' />
      </div>
      <div className='post-details'>
        <p>{post.title}</p>
        <p className='post-tags'>
        {
          post.tags.map(tag => {
            return (
              <div key={tag + 'div'}>
              <HashTag key={tag + 'postbox'} tag={tag} />
              ,
              </div>
              );
          })
        }
        </p>

      </div>

        <div className="pull-xs-right">
          <button className={likeClass} onClick={handleClick}>
            <i className="ion-heart"></i> {post.likes}
          </button>

          <Link to={`post/${post.slug}`} className='btn btn-md btn-success'>
          View
          </Link>
        </div>
    </div>
    );
};

export default connect(null, mapDispatchToProps)(PostBox);