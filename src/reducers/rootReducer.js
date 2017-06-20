import { combineReducers } from 'redux';
import {postsInfo} from './posts';
import {postInfo} from './post';
import {auth} from './auth';
export default combineReducers({
	postsInfo,
    postInfo,
    auth
});