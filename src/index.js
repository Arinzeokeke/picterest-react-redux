import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'


import store 
import { Provider } from 'react-redux'
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
//import 'bootstrap'
import { Button } from 'react-bootstrap';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
