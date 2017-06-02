import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import configureStore from './store'
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
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

ReactDOM.render((<Provider store = {store}>
	<App />
	</Provider>)
	, document.getElementById('root'));
registerServiceWorker();
