import React from 'react';
import {Row, Col} from 'react-bootstrap';
import PropTypes from 'prop-types';
import Post from './Post';



const PostRow = (props) => {
	var out = props.posts.map((post) => {
		return (<Col xs = {3} key = {post.id}>
		   
			<Post info = {post} />
		</Col>);
	});
	//console.log(out)
	return (
		
		
		<Row>
		
			{out}
		</Row>
		
		);
}


PostRow.PropTypes = {
	posts: PropTypes.array.isRequired
}

export default PostRow;