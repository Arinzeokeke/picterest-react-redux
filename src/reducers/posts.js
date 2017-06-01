import {POSTS_ARE_LOADING,
POSTS_LOAD_ERROR,
POSTS_FETCH_DATA_SUCCESS } from '../actions/actionTypes'

export function postsErrored(state = false, action) {
    switch (action.type) {
        case POSTS_LOAD_ERROR:
            return action.postsError;
        default:
            return state;
    }
}
export function postsLoading(state = false, action) {
    switch (action.type) {
        case POSTS_ARE_LOADING:
            return action.postsLoading;
        default:
            return state;
    }
}
export function posts(state = [], action) {
    switch (action.type) {
        case POSTS_FETCH_DATA_SUCCESS:
            return action.posts;
        default:
            return state;
    }
}