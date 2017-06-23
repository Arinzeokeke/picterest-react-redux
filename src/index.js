import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import configureStore from './store';
import registerServiceWorker from './registerServiceWorker';
import RoutesMap from './components/routes';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

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
