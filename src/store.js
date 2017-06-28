import { createStore, applyMiddleware, compose } from 'redux';
//import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { promiseMiddleware, localStorageMiddleware } from './middleware';
import rootReducer from './reducers/rootReducer';
import mySaga from './sagas.js';


const sagaMiddleware = createSagaMiddleware();

const getMiddleware = () => {
  if (process.env.NODE_ENV === 'production') {
    return applyMiddleware(sagaMiddleware, promiseMiddleware, localStorageMiddleware);
  } else {
    // Enable additional logging in non-production environments.
    return applyMiddleware(sagaMiddleware, promiseMiddleware, localStorageMiddleware, createLogger())
  }
}

export default function configureStore(initialState) {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || composeWithDevTools;

    const store = createStore(
        rootReducer,
        initialState,
        composeEnhancers(getMiddleware())
    );
    sagaMiddleware.run(mySaga);
    return store;
}
