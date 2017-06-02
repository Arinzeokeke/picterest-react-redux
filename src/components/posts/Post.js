import React from 'react';
import PropTypes from 'prop-types'
import {Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'


class Post extends React.Component{

    render(){
        var item = this.props.info;
        return (       
            <div>


            
            <p> Title: {item.title} </p>
            
            <Link to = {'/post/' + item.slug}> 
                {item.title}
            </Link>
            </div>
        );
    }

}

Post.PropTypes = {
    posts: PropTypes.object.isRequired
}

export default Post;