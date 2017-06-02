import React from 'react'
import PropTypes from 'prop-types'
import {Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'


class PostsList extends React.Component{
	componentDidMount() {
        this.props.fetchData();
    }
    render() {
        if (this.props.hasErrored) {
            return <p>Sorry! There was an error loading the items</p>;
        }
        if (this.props.isLoading) {
            return <p>Loading…</p>;
        }
        
        return (
            <div>
            <Button>Hello world</Button>


            <ul>
                {this.props.posts.map((item) => (
                    <li key={item.id}>
                        <p className = 'text-center'> Title: {item.title} </p>
                        <p> URL: <a href = {item.slug}> {item.url} </a> </p>
                        <p> Slug: {item.slug} </p>
                        <Link to = {'/post?slug=' + item.slug}>
                            {item.title} 
                        </Link>
                    </li>
                ))}
            </ul>
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