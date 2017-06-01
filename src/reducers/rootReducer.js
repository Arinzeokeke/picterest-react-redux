import { combineReducers } from 'redux';
import { posts, postsErrored, postsLoading } from './posts';
export default combineReducers({
    posts,
    postsErrored,
    postsLoading
});