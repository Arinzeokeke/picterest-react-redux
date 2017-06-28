import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Creators } from '../actions/actions';
import agent from '../agent';

const mapDispatchToProps = dispatch => ({
  onSetPage: (page, payload) => 
    dispatch(Creators.setPage(page, payload))
});

const GridPagination = props => {
  if (props.postsCount <= 12) {
    return null;
  }

  let range = [];
  for (let i = 0; i < Math.ceil(props.postsCount / 12); ++i) {
    range.push(i);
  }

  const setPage = page => {
    if (props.pager) {
      props.onSetPage(page, props.pager(page));
    } else {
      props.onSetPage(page, agent.Posts.all(page));
    }
  };

  return (
    <nav className='pagination'>
          <ul className="pagination">

        {
          range.map(v => {
            const isCurrent = v === props.currentPage;
            const onClick = ev => {
              ev.preventDefault();
              setPage(v);
            };
            return (
              <li
                className={ isCurrent ? 'page-item active' : 'page-item' }
                onClick={onClick}
                key={v.toString()}>

                <a className="page-link" href="">{v + 1}</a>

              </li>
            );
          })
        }

      </ul>
    </nav>
    );

};

export default connect(null, mapDispatchToProps)(GridPagination);