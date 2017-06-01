import React from 'react'
import PropTypes from 'prop-types'
import {Button} from 'react-bootstrap'


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
                        {item.title}
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
	isLoading: PropTypes.bool.isRequired
}

export default PostsList