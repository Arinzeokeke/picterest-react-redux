import React, { Component } from 'react'
import ListErrors from './ListErrors'

const DisplayForm = props => {
  const tagsDisplay = props.tags.map((tag, i) => {
    return (
      <div key={tag + i}>
        <span className="tag-default tag-pill">
          <i
            className="ion-close-round"
            onClick={props.removeTagHandler(tag)}
          />
          {tag}
        </span>
      </div>
    )
  })

  return (
    <div>
      <ListErrors errors={props.errors} />

      <form onSubmit={props.submitForm}>
        <div>
          <input
            type="text"
            placeholder="Post Title"
            style={{ marginBottom: '5px' }}
            value={props.titlw}
            onChange={props.changeTitle}
          />
          <div className="red-text" style={{ marginBottom: '20px' }}>
            {props.touched && props.error}
          </div>
        </div>

        <div>
          <input
            type="text"
            placeholder="Image Link"
            style={{ marginBottom: '5px' }}
            value={props.url}
            onChange={props.changeUrl}
          />
          <div className="red-text" style={{ marginBottom: '20px' }}>
            {props.touched && props.error}
          </div>
        </div>

        <div>
          <input
            type="text"
            placeholder="Enter tags"
            value={props.tagInput}
            onChange={props.changeTagInput}
            onKeyUp={props.watchForEnter}
          />

          <div className="tag-list">{tagsDisplay}</div>
        </div>

        <button
          className="teal btn-flat right white-text"
          type="submit"
          disabled={props.inProgress}
        >
          Publish
          <i className="material-icons right">Submit</i>
        </button>
      </form>
    </div>
  )
}

export default DisplayForm

/*     <div>
        <ListErrors errors={props.errors}></ListErrors>

        <form>
          <fieldset>

            <fieldset className="form-group">
              <input
                className="form-control form-control-lg"
                type="text"
                placeholder="Post Title"
                value={props.title}
                onChange={props.changeTitle} />
            </fieldset>

            <fieldset className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Image Link"
                value={props.url}
                onChange={props.changeUrl} />
            </fieldset>

            <fieldset className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Enter tags"
                value={props.tagInput}
                onChange={props.changeTagInput}
                onKeyUp={props.watchForEnter} />

              <div className="tag-list">
                { 
                  props.tags.map(tag => {
                    return (
                      <span className="tag-default tag-pill" key={tag}>
                         <i  className="ion-close-round"
                        onClick={props.removeTagHandler(tag)}>
                         </i>
                          {tag}
                      </span>
                      );
                    })
                 }
              </div>
            </fieldset>

            <button
              className="btn btn-lg pull-xs-right btn-primary"
              type="button"
              disabled={props.inProgress}
              onClick={props.submitForm}>
              Publish Post
            </button>

          </fieldset>
        </form>
      </div>
*/
