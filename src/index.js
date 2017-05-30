import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import store from './store'
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
//import 'bootstrap'
import { Button } from 'react-bootstrap';

ReactDOM.render((<Provider store = {store}>
	<App />
	</Provider)
	, document.getElementById('root'));
registerServiceWorker();
