import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Creators } from '../../actions/actions';
import Banner from './Banner';
import MainView from './MainView';
import Tags from './Tags';
import agent from '../../agent';

const Promise = global.Promise;
const mapDispatchToProps = dispatch => ({
  onClickTag: (tag, pager, payload) => dispatch(Creators.applyTagFilter(tag, pager, payload)),
  onLoad: (tab, pager, payload) => dispatch(Creators.homePageLoaded(tab, pager, payload)),
  onUnload: () => dispatch(Creators.homePageUnloaded())
});

const mapStateToProps = state => ({
  ...state.home,
  appName: state.common.appName,
  token: state.common.token
});

class Home extends Component {

  componentWillMount() {
    const tab = this.props.token ?  'feed' : 'all';
    const postsPromise = this.props.token ? agent.Posts.feed : agent.Posts.all;

    this.props.onLoad(tab, postsPromise, Promise.all([agent.Tags.getAll(), postsPromise()]));

  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <div className="home-page">

        <Banner token={this.props.token} appName={this.props.appName} />

        <div className="container page">
          <div className="row">
            <MainView />

            <div className="col-md-3">
              <div className="sidebar">

                <p>Popular Tags</p>

                <Tags
                  tags={this.props.tags}
                  onClickTag={this.props.onClickTag} />

              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(Home);