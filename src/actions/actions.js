import {POSTS_ARE_LOADING,
POSTS_LOAD_ERROR } from 'actionTypes'


export function postsLoading(bool) {
	return {
		type: POSTS_ARE_LOADING,
		postsLoading: bool
	}
}