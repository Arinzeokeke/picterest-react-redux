import { Types } from '../actions/actions';
const {
  APP_LOAD,
  REDIRECT,
  LOGOUT,
  POST_SUBMITTED,
  SETTINGS_SAVED,
  LOGIN,
  REGISTER,
  DELETE_POST,
  POST_PAGE_UNLOADED,
  EDITOR_PAGE_UNLOADED,
  HOME_PAGE_UNLOADED,
  PROFILE_PAGE_UNLOADED,
  PROFILE_FAVORITES_PAGE_UNLOADED,
  SETTINGS_PAGE_UNLOADED,
  LOGIN_PAGE_UNLOADED,
  SET_TOKEN,
  REGISTER_PAGE_UNLOADED
} = Types;


const defaultState = {
  appName: 'Picterest',
  token: null,
  viewChangeCounter: 0
};

export default (state = defaultState, action) => {
	switch (action.type) {
    case APP_LOAD:
      return {
        ...state,
        token: action.token || null,
        appLoaded: true,
        currentUser: action.payload ? { ...action.payload.user, token: action.token } : null 
      };
    case REDIRECT:
      return { ...state, redirectTo: null };
    case LOGOUT:
      return {
        ...state,
        redirectTo: '/',
        token: null,
        currentUser: null
      };
    case POST_SUBMITTED:
      const redirectUrl = `post/${action.payload.post.slug}`;
      return {
        ...state,
        redirectTo: redirectUrl
      };

    case SETTINGS_SAVED:
      return {
        ...state,
        redirectTo: action.error ? null : '/',
        currentUser: action.error ? null : { ...action.payload.user, token: state.currentUser.token }
      };
    case LOGIN:
    case REGISTER:
      return {
        ...state,
        redirectTo: action.error ? null : '/',
        token: action.error ? null : action.payload.token,
        currentUser: action.error ? null : action.payload.user
      };
    case SET_TOKEN:
      return {
        ...state, 
        token: action.token
      }
    case DELETE_POST:
      return {
        ...state,
        redirectTo: '/'
      };
    case POST_PAGE_UNLOADED:
    case EDITOR_PAGE_UNLOADED:
    case HOME_PAGE_UNLOADED:
    case PROFILE_PAGE_UNLOADED:
    case PROFILE_FAVORITES_PAGE_UNLOADED:
    case SETTINGS_PAGE_UNLOADED:
    case LOGIN_PAGE_UNLOADED:
    case REGISTER_PAGE_UNLOADED:
      return {
        ...state, viewChangeCounter: state.viewChangeCounter + 1
      };
    default:  
      return state;

  }
}