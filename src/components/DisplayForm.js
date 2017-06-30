import React, { Component } from 'react';
import ListErrors from './ListErrors';

const DisplayForm =  props =>  {
    const tagsDisplay =  props.tags.map((tag, i) => {
          return (
            <div key={tag + i}>
            <span className="tag-default tag-pill">
              <i  className="ion-close-round"
                  onClick={props.removeTagHandler(tag)}>
              </i>
              {tag}
            </span>
            </div>
          );
      });

      return (
      <div>
          <div>
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
            type="file" 
            onChange={props.handleFileChange} />
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
                { tagsDisplay }
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
      </div>
      );
};

export default DisplayForm;

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