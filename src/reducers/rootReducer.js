import { combineReducers } from 'redux';
import auth from './auth';
import common from './common';
import editor from './editor';
import home from './home';
import profile from './profile';
import settings from './settings';
import post from './post';
import postList from './postlist';

export default combineReducers({
    auth,
    common
});