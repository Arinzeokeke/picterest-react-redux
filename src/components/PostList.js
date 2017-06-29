import React from 'react';
import GridPagination from './GridPagination';
import PostRow from './PostRow';

const PostList = props => {
  if (!props.posts) {
    return (
      <div className="post-preview">Loading...</div>
      );
  }

  if (props.posts.length === 0) {
    return (
       <div className="post-preview">
        No posts are here... yet.
      </div> 
    );
  }
  let posts = props.posts.slice();
  let rows = [];
  let count = 0;
  while (posts.length > 0) {
    count++;
    rows.push(<PostRow key ={count} posts={posts.splice(0, 3)} />);
 }
  return (
    <div>
      {rows}

      <GridPagination
        pager={props.pager}
        postsCount={props.postsCount}
        currentPage={props.currentPage}
      />
      </div>
    );
};

export default PostList;