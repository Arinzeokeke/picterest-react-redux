import agent from './agent';
import {
  GET_TOKEN, GET_CURRENT_USER
} from './actions/actionTypes';

const localStorageMiddleware = store => next => action => {
  if (action.type === SET_TOKEN) {
    if (!action.error) {
      window.localStorage.setItem('jwt', action.payload.auth.token);
      agent.setToken(action.payload.auth.token);
    }
  } else if (action.type === LOGOUT) {
    window.localStorage.setItem('jwt', '');
    agent.setToken(null);
  }

  next(action);
};

export { localStorageMiddleware }
