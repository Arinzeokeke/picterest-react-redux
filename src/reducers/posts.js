import {POSTS_ARE_LOADING,
POSTS_LOAD_ERROR,
POSTS_FETCH_DATA_SUCCESS,
POST_IS_LOADING,
POST_LOAD_ERROR,
POST_FETCH_DATA_SUCCESS } from '../actions/actionTypes'

function postsErrored(state = false, action) {
    switch (action.type) {
        case POSTS_LOAD_ERROR:
            return action.postsError;
        default:
            return state;
    }
}
function postsLoading(state = false, action) {
    switch (action.type) {
        case POSTS_ARE_LOADING:
            return action.postsLoading;
        default:
            return state;
    }
}
function posts(state = [], action) {
    switch (action.type) {
        case POSTS_FETCH_DATA_SUCCESS:
            return action.posts;
        default:
            return state;
    }
}

export function postsInfo(state = {}, action){
    return Object.assign({}, state, 
        {
            postsLoading: postsLoading(state.postsLoading, action),
        posts: posts(state.posts, action),
        postsError: postsErrored(state.postsError, action)

        });
}



