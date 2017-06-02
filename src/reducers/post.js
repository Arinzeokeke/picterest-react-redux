import {
POST_IS_LOADING,
POST_LOAD_ERROR,
POST_FETCH_DATA_SUCCESS } from '../actions/actionTypes'

function postErrored(state = false, action) {
    switch (action.type) {
        case POST_LOAD_ERROR:
            return action.postError;
        default:
            return state;
    }
}
function postLoading(state = false, action) {
    switch (action.type) {
        case POST_IS_LOADING:
            return action.postLoading;
        default:
            return state;
    }
}
function post(state = {}, action) {
    switch (action.type) {
        case POST_FETCH_DATA_SUCCESS:
            return action.post;
        default:
            return state;
    }
}


export function postInfo(state = {}, action){
	return Object.assign({}, state,
		{
			post: post(state.post, action),
			postLoading: postLoading(state.postLoading, action),
			postError: postErrored(state.postError, action)
		});
}