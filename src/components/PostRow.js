import React from 'react'
import PostBox from './PostBox'

const PostRow = props => {
  const boxes = props.posts.map(post => {
    return (
      <div className="col s6 m6">
        {' '}
        <PostBox post={post} key={post.id} indexElem />{' '}
      </div>
    )
  })
  return <div className="row">{boxes}</div>
}
export default PostRow
