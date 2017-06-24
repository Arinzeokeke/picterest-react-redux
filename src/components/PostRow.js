import React from 'react';
import PostBox from './PostBox';

const PostRow = props => {
  const boxes = props.posts.map(post => {
    return (
        <PostBox post={post} key={post.slug} />
      );
  });
  return (
    <div class="flex-grid">
      { boxes }
    </div>
    );
};