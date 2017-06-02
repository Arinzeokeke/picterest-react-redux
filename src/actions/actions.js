import {POSTS_ARE_LOADING,
POSTS_LOAD_ERROR,
POSTS_FETCH_DATA_SUCCESS,
POST_IS_LOADING,
POST_LOAD_ERROR,
POST_FETCH_DATA_SUCCESS } from './actionTypes'
import agent from '../agent.js'

//Posts Index
export function postsLoading(bool) {
	return {
		type: POSTS_ARE_LOADING,
		postsLoading: bool
	}
}

export function postsErrored(bool){
		return {
		type: POSTS_LOAD_ERROR,
		postsError: bool
	}
}

export function postsFetchDataSuccess(posts) {
    return {
        type: POSTS_FETCH_DATA_SUCCESS,
        posts
    };
}


export function postsFetchData() {
    return (dispatch) => {
        dispatch(postsLoading(true));
        // dispatch(postsFetchDataSuccess([{id:2, title:'lkl9'}]));
        // dispatch(postsLoading(false));
        agent.Posts.all(0)
            .then((response) => {
                dispatch(postsLoading(false));
                var data = JSON.parse(response.text).posts
                //console.log(response.body.posts);
                dispatch(postsFetchDataSuccess(data))
                console.log(data);
            })
            .catch((err) => {
                console.error(err);

                dispatch(postsLoading(false));
                dispatch(postsErrored(true))
            });
    };
}


export function postLoading(bool) {
    return {
        type: POST_IS_LOADING,
        postLoading: bool
    }
}

export function postErrored(bool){
        return {
        type: POST_LOAD_ERROR,
        postError: bool
    }
}

export function postFetchDataSuccess(post) {
    return {
        type: POST_FETCH_DATA_SUCCESS,
        post
    };
}


export function postFetchData(slug) {
    return (dispatch) => {
        dispatch(postLoading(true));
        // dispatch(postsFetchDataSuccess([{id:2, title:'lkl9'}]));
        // dispatch(postsLoading(false));
        agent.Posts.get(slug)
            .then((response) => {
                console.log(response)
                dispatch(postLoading(false));
                return response;
            })
            .then((response) => response.body.post)
            .then((post) => dispatch(postFetchDataSuccess(post)))
            .catch((err) => {
                dispatch(postErrored(true))
                dispatch(postsLoading(false));
            });
    };
}