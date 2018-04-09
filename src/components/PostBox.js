import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import agent from '../agent'
import { Creators } from '../actions/actions'
import HashTag from './HashTag'
import PostActions from './Post/PostActions'

const LIKED_CLASS = 'btn btn-sm btn-primary'
const NOT_LIKED_CLASS = 'btn btn-sm btn-danger'

const mapDispatchToProps = dispatch => ({
  like: slug => dispatch(Creators.postLiked(agent.Posts.like(slug))),
  unlike: slug => dispatch(Creators.postUnliked(agent.Posts.unlike(slug)))
})

const PostBox = props => {
  const post = props.post
  //console.log(post);
  const likeClass = post.liked ? LIKED_CLASS : NOT_LIKED_CLASS

  const handleClick = ev => {
    ev.preventDefault()
    if (post.liked) {
      props.unlike(post.slug)
    } else {
      props.like(post.slug)
    }
  }
  console.log(post)
  return (
    <div className="card medium">
      <div className="card-image">
        <img src={post.url} />
      </div>
      <div className="card-content">
        <p> {post.tile}</p>
        <p> {new Date(post.created_at).toDateString()} </p>

        <em>
          {post.tags.map(tag => {
            return (
              <div key={tag + 'div'}>
                <HashTag key={tag + 'postbox'} tag={tag} />
                ,
              </div>
            )
          })}
        </em>
        <div class="card-action">
          <p>
            {' '}
            <a className={likeClass} onClick={handleClick}>
              <i className="ion-heart" /> {post.likes}
            </a>
          </p>

          <br />
          <br />
          {props.canEdit ? <PostActions post={post} /> : null}

          {props.indexElem ? (
            <Link to={`post/${post.slug}`} className="btn-d">
              View
            </Link>
          ) : null}
        </div>
        {/* <div className="row">
          <div classNae="col-xs-8">
            <h4> {post.title} </h4>
          </div>
          <div className="col-xs-4">
            <h5 className="date">{new Date(post.created_at).toDateString()}</h5>
          </div>
        </div>

        <h5 className="post-tags">
          {post.tags.map(tag => {
            return (
              <div key={tag + 'div'}>
                <HashTag key={tag + 'postbox'} tag={tag} />
                ,
              </div>
            )
          })}
        </h5>

        <div>
          <button className={likeClass} onClick={handleClick}>
            <i className="ion-heart" /> {post.likes}
          </button>

          {props.canEdit ? <PostActions post={post} /> : null}

          {props.indexElem ? (
            <Link to={`post/${post.slug}`} className="btn-d">
              View
            </Link>
          ) : null}
        </div> */}
      </div>
    </div>
  )
  // <div className='box'>
  //   <div className='meta-info'>
  //     <Link to={`@${post.author.name}`}>
  //       <p> @{post.author.name} </p>
  //     </Link>

  //     <span className='date'>
  //       { new Date(post.createdAt).toDateString()}
  //     </span>
  //   </div>

  //   <div className="post-image">
  //   <img src={post.url} className='img img-responsive' />
  //   </div>
  //   <div className='post-details'>
  //     <p>{post.title}</p>
  //     <p className='post-tags'>
  //     {
  //       post.tags.map(tag => {
  //         return (
  //           <div key={tag + 'div'}>
  //           <HashTag key={tag + 'postbox'} tag={tag} />
  //           ,
  //           </div>
  //           );
  //       })
  //     }
  //     </p>

  //   </div>

  //     <div className="pull-xs-right">
  //       <button className={likeClass} onClick={handleClick}>
  //         <i className="ion-heart"></i> {post.likes}
  //       </button>

  //       { props.canEdit ? <PostActions post={post} /> : null }

  //       { props.indexElem ?
  //         <Link to={`post/${post.slug}`} className='btn btn-md btn-success'>
  //         View
  //       </Link>
  //       : null }
  //     </div>
  // </div>
}

export default connect(null, mapDispatchToProps)(PostBox)
