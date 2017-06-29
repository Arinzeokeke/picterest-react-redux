import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import agent from '../agent';
import { Creators } from '../actions/actions';
import DisplayForm from './DisplayForm';

const mapStateToProps = state => ({
  ...state.editor,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onAddTag: () => dispatch(Creators.addTag()),
  onLoad: payload => dispatch(Creators.editorPageLoaded(payload)),
  onRemoveTag: tag => dispatch(Creators.removeTag(tag)),
  onSubmit: payload => dispatch(Creators.postSubmitted(payload)),
  onUnload: () => dispatch(Creators.editorPageUnloaded()),
  onUpdateField: (key, value) => dispatch(Creators.updateFieldEditor(key, value)) 
});

const UserLoggedOut = props => {
  return (
      <div>
        <p> You need to be logged in to do this. </p>
        <p> 
        <Link to= '/login'> Login </Link> or <Link to='/register'> Register </Link>
        </p>
      </div>
    );
};

const UserForbidden = props => {
    return (
      <div>
        <p> You are not allowed to do that. You are not the author of this post </p>
      </div>
      );
};


class Editor extends Component {
  constructor() {
    super();

    const updateFieldEvent = key => ev => 
      this.props.onUpdateField(key, ev.target.value);

    this.changeTitle = updateFieldEvent('title');
    this.changeUrl = updateFieldEvent('url');
    this.changeTagInput = updateFieldEvent('tagInput');

    this.watchForEnter = ev => {
      if (ev.keyCode === 13) {
        ev.preventDefault();
        this.props.onAddTag();
      }
    };

    this.removeTagHandler = tag => () => {
      this.props.onRemoveTag(tag);
    };

    this.submitForm = ev => {
      ev.preventDefault();
      const post = {
        title: this.props.title,
        url: this.props.url,
        tagList: this.props.tags
      };

      const slug = { slug: this.props.postSlug };
      const promise = this.props.postSlug ?
        agent.Posts.update(Object.assign(post, slug)) 
        :
        agent.Posts.create(post);
      this.props.onSubmit(promise);
    };
  }

  componentWillMount() {
    if ( this.props.match.params.slug ) {
     this.props.onLoad(agent.Posts.get(this.props.match.params.slug));

    } 
    else {
      this.props.onLoad(null);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.slug !== nextProps.match.params.slug) {
      if (nextProps.match.params.slug) {
        this.props.onUnload();
        return this.props.onLoad(agent.Articles.get(this.props.match.params.slug));
      }
      this.props.onLoad(null);
    }
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {

    const outputDecider  = () => {
     if (!this.props.currentUser) {
      return <UserLoggedOut />;
     } 

    else {
      if (this.props.postAuthor && this.props.postAuthor.id !== this.props.currentUser.id) {
        console.log('ewooo');
        return <UserForbidden />;
        } 

      else {
        return (

          <DisplayForm 
          errors = {this.props.errors}
          title = {this.props.title}
          tags = {this.props.tags}
          changeTitle = {this.changeTitle}
          url=  {this.props.url}
          changeUrl = {this.changeUrl}
          tagInput = {this.props.tagInput}
          changeTagInput = {this.changeTagInput}
          watchForEnter = {this.watchForEnter}
          inProgress = {this.props.inProgress}
          submitForm = {this.submitForm}
          removeTagHandler = {this.removeTagHandler}
          />
          );
      }
    }
   };

   const output  = outputDecider();
   console.log(output);

    // }
    return (
      <div className="editor-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">
              
              {output}

            </div>
          </div>
        </div>
      </div>
    );
  }


}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);