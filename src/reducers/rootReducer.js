import { combineReducers } from 'redux';
import {postsInfo} from './posts';
import {postInfo} from './post';
export default combineReducers({
	postsInfo,
    postInfo
});