const defaultState = {
  appName: 'Picterest'
};

export function common(state = {}, action) {
	return {
		appLoaded: appLoaded(state.appLoaded, action),
		token: setToken(state.token),
		currentUser: 
	}
}