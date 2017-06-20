import { createActions } from 'reduxsauce';
import {POSTS_ARE_LOADING,
POSTS_LOAD_ERROR,
POSTS_FETCH_DATA_SUCCESS,
POST_IS_LOADING,
POST_LOAD_ERROR,
POST_FETCH_DATA_SUCCESS } from './actionTypes'
import agent from '../agent.js'

export default const { Types, Creators } = createActions({
  postsLoading: ['bool'],
  postsLoadError: ['bool'],
  postsFetchData: null,
  postsFetchDataSuccess: ['posts'],
  postLoading: ['bool'],
  postLoadError: ['bool'],
  postFetchDataSuccess: ['post'],
  appLoad: ['bool'],
  registerSuccess: null,
  registerError: ['status'], ['body'],
  login: ['null'],
  register: ['null'],
  registerSuccess: ['null'],
  registerError: ['status', 'body'];
  loginSuccess: null,
  loginError: ['status'], ['body'],
  setCurrentUser: ['user'],
  getCurrentUser: null,
  setToken: []
  logout: null,
  custom: (a, b) => ({ type: 'CUSTOM', total: a + b })
}, {}) 



