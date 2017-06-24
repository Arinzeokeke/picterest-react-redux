import React from 'react';
import { connect } from 'react-redux';
import agent from '../../agent';
import { Creators } from '../../actions/actions';
import PostList from '../PostList';

const FeedTab = props => {
  if (props.token) {
    const clickHandler = e => {
      e.preventDefault();
      props.onTabClick('feed', agent.Posts.feed, agent.Posts.feed());     
    }

    return (
      <li className="nav-item">
        <a  href=""
            className={ props.tab === 'feed' ? 'nav-link active' : 'nav-link' }
            onClick={clickHandler}>
          Your Feed
        </a>
      </li>
      );
  }
  return null;
};

const GlobalTab = props => {
  const clickHandler = e => {
    e.preventDefault();
    props.onTabClick('all', agent.Posts.all, agent.Posts.all());
  };
  return (
    <li className="nav-item">
      <a
        href=""
        className={ props.tab === 'all' ? 'nav-link active' : 'nav-link' }
        onClick={clickHandler}>
        Global Feed
      </a>
    </li>
    );
};

const TagFilterTab = props => {
  if (props.tag) {
      return (
    <li className="nav-item">
      <a href="" className="nav-link active">
        <i className="ion-pound"></i> {props.tag}
      </a>
    </li>
  );
  }

  return null;
}

const mapStateToProps = state => ({
  ...state.postList,
  tags: state.home.tags,
  token: state.common.token
});

const mapDispatchToProps = dispatch => ({
  onTabClick: (tab, pager, payload) => dispatch(Creators.changeTab(tab, pager, payload))
});

const MainView = props => {
  return (
    <div className="col-md-9">
      <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">

          <YourFeedTab
            token={props.token}
            tab={props.tab}
            onTabClick={props.onTabClick} />

          <GlobalFeedTab tab={props.tab} onTabClick={props.onTabClick} />

          <TagFilterTab tag={props.tag} />

        </ul>
      </div>

      <PostList
        pager={props.pager}
        articles={props.posts}
        loading={props.loading}
        articlesCount={props.postsCount}
        currentPage={props.currentPage} />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
