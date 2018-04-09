import React from 'react'
import agent from '../../agent'

const Tags = props => {
  const tags = props.tags
  if (tags) {
    return (
      <div className="tag-list">
        {tags.map(tag => {
          const handleClick = ev => {
            ev.preventDefault()
            props.onClickTag(
              tag,
              page => agent.Posts.byTag(tag, page),
              agent.Posts.byTag(tag)
            )
          }

          return (
            <div class="chip" key={tag}>
              <a href="" onClick={handleClick}>
                {tag}
              </a>
            </div>
          )
        })}
      </div>
    )
  } else {
    return <div>Loading Tags...</div>
  }
}

export default Tags
