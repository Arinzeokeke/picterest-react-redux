import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { promiseMiddleware, localStorageMiddleware } from './middleware';
import rootReducer from './reducers/rootReducer';



const getMiddleware = () => {
  if (process.env.NODE_ENV === 'production') {
    return applyMiddleware(thunk, localStorageMiddleware);
  } else {
    // Enable additional logging in non-production environments.
    return applyMiddleware(thunk, localStorageMiddleware, createLogger())
  }
}

export default function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        composeWithDevTools(getMiddleware())
    );
}
