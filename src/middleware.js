import agent from './agent';
import {
  GET_TOKEN
} from './actions/actionTypes';

const localStorageMiddleware = store => next => action => {
  if (action.type === GET_TOKEN) {
    if (!action.error) {
      window.localStorage.setItem('jwt', action.payload.user.token);
      agent.setToken(action.payload.user.token);
    }
  } else if (action.type === LOGOUT) {
    window.localStorage.setItem('jwt', '');
    agent.setToken(null);
  }

  next(action);
};

export { localStorageMiddleware }
