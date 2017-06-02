import {connect} from 'react-redux';
import React from 'react';
import { postFetchData } from '../actions/actions';
import Post from '../components/posts/Post';



const mapStateToProps = (state) => {
	console.log(state)
    return {

        post: state.postInfo.post,
        hasErrored: state.postInfo.postError,
        isLoading: state.postInfo.postLoading
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        fetchPost: (slug) => dispatch(postFetchData(slug))

    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Post);
