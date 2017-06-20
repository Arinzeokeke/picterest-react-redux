import {
	REGISTER, LOGIN, LOGOUT, GET_TOKEN, SET_CURRENT_USER, SET_TOKEN, REGISTER_ERROR, LOGIN_ERROR
, REGISTER_SUCCESS, LOGIN_SUCCESS, APP_LOAD} from './actionTypes'
import agent from '../agent';



export function register(name, password, email){

	return (dispatch) => {
		agent.Auth.register(name, email, password).
			then((response) => {
				if (response.ok){
					dispatch(login(email, password))
					dispatch(registerSuccess());
				}
				else{
					dispatch(registerError(response.status, response.body));
				}
			});
	};
}

export function registerSuccess(){
	return {
		type: REGISTER_SUCCESS
	}
}

export function loginSuccess(){
	return {
		type: LOGIN_SUCCESS
	}
}

export function setUser(response){
	return{
		type: SET_CURRENT_USER,
		user: response.user
	}
}

export function loginError(status, body){
	return {
		type: LOGIN_ERROR,
		status,
		body
	}
}

export function registerError(status, body){
	return {
		type: REGISTER_ERROR,
		status,
		body
	}
}

export function appLoad(bool){
	return {
		type: APP_LOAD,
		status: bool
	}
}


export function getCurrentUser(){

	return (dispatch) => {
		agent.Auth.current().
			then((response) => {
				dispatch(appLoad(true))
				if (response.ok){
					dispatch(setUser(response.body))
				}
			});
	};
}


export function login(email, password){

	return (dispatch) => {
		agent.Auth.token(email, password).
			then((response) => {
				if (response.ok){
					dispatch({type: SET_TOKEN, token: response.body.auth.token});
					dispatch(getCurrentUser());

				}
				else{
					dispatch(loginError(response.status, response.body));
				}
			});
	};
}


