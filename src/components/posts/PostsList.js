import React from 'react'
import PropTypes from 'prop-types'
import {Button} from 'react-bootstrap'
import PostRow from './PostRow'


class PostsList extends React.Component{
	componentWillMount() {
        this.props.fetchData();
    }
    render() {
        if (this.props.hasErrored) {
            return <p>Sorry! There was an error loading the items</p>;
        }
        if (this.props.isLoading) {
            return <p>Loading…</p>;
        }

        var out = [];
        var posts = this.props.posts;
        console.log(posts[2]);

        while (posts.length > 0){
            let cur = posts.splice(0, 4);
            out.push(<PostRow posts = {cur} key = {cur[0].id} />);
        }
        //console.log(JSON.stringify(out[0]))

        
        return (
            <div>
            
               
             {out}
            
            </div>
        );
    }
}

PostsList.PropTypes = {
	posts: PropTypes.array.isRequired,
	hasErrored: PropTypes.bool.isRequired,
	isLoading: PropTypes.bool.isRequired,
    fetchData: PropTypes.func.isRequired
}

export default PostsList