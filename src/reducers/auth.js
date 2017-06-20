import { SET_STATE, 
	REGISTER_SUCCESS, 
	REGISTER_ERROR, 
	LOGIN_SUCCESS, 
	LOGIN_ERROR } from '../actions/actionTypes'



function setUser(state = {}, action) {
	
	switch (action.type){
		case SET_USER: {
			action.user;
		}

		default:
			return state;
	}
}

var defaultState = {
	registerError: false,
	loginError: false,
	registerSuccess: false,
	loginSuccess: false
}

function resolveErrors(state = defaultState, action){

	switch (action.type){
		case REGISTER_ERROR:
			return {
				...state,
				registerError: true

			}
		case LOGIN_ERROR:
			return {
				...state,
				loginError: true

			}
		case REGISTER_SUCCESS:
			return {
				...state,
				registerSuccess: true

			}
		case LOGIN_SUCCESS:
			return {
				...state,
				loginSuccess: true

			}
		default:
			return state;
	}
}


// function getRelations(state = {}, state) {

// 	switch (action.type){
// 		case SET_FOLLOWER:
// 	}
// }







export function loggedInUser(state = {}, action){
	return {
		...state,

		user: setUser(state.user, action),
		errors: resolveErrors(state.errors, action)
	}
}