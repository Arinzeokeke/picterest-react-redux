import React from 'react';
import PostBox from './PostBox';

const PostRow = props => {
  const boxes = props.posts.map(post => {
    return (
        <PostBox post={post} key={post.id} indexElem />
      );
  });
  return (
    <div className="flex-grid">
      { boxes }
    </div>
    );
};
export default PostRow;