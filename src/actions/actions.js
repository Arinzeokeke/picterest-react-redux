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
                return response;
            })
            .then((response) => response.posts)
            .then((posts) => dispatch(postsFetchDataSuccess(posts)))
            .catch((err) => {

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


export function postFetchData() {
    return (dispatch) => {
        // dispatch(postLoading(true));
        // dispatch(postsFetchDataSuccess([{id:2, title:'lkl9'}]));
        // dispatch(postsLoading(false));
        agent.Posts.get('hello-world')
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(postLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((post) => dispatch(postFetchDataSuccess(post)))
            .catch(() => dispatch(postErrored(true)));
    };
}