import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import Register from './components/Register.js';
import Login from './components/Login';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom'
import configureStore from './store';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import RoutesMap from './components/routes';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'masonry-layout'

// const defaultState = {
// 	postsInfo: {
// 		posts: [],
// 		postsLoading: false,
//      postsError: false
// 	}
// }
        
const store = configureStore();

ReactDOM.render((
  <Provider store = {store}>
   <RoutesMap />
</Provider>
)
	, document.getElementById('root'));
registerServiceWorker();
