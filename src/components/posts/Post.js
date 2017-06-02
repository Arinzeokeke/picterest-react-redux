import React from 'react'
import PropTypes from 'prop-types'
import {Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import queryString from 'query-string';


class Post extends React.Component{

	componentWillMount(){
		this.query = queryString.parse(this.props.location.search);
		this.props.fetchPost(this.query.slug);
	}


	render() {
		
        if (this.props.hasErrored) {
            return <p>Sorry! There was an error loading the items</p>;
        }
        if (this.props.isLoading) {
            return <p>Loading…</p>;
        }
        var item = this.props.post;
        return (
        	
            <div>
            <Button>Hello world</Button>


            
            <p> Title: {item.title} </p>
            <p> URL: <a href = {item.slug}> {item.url} </a> </p>
            <p> Slug: {item.slug} </p>
            <Link to = {'/post?slug=' + item.slug}/> 

            </div>
        );
    }
}

Post.PropTypes = {
	post: PropTypes.object.isRequired,
	hasErrored: PropTypes.bool.isRequired,
	isLoading: PropTypes.bool.isRequired,
	fetchPost: PropTypes.func.isRequired
}

export default Post;


