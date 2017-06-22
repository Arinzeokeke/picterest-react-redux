import { createActions } from 'reduxsauce';
import {POSTS_ARE_LOADING,
POSTS_LOAD_ERROR,
POSTS_FETCH_DATA_SUCCESS,
POST_IS_LOADING,
POST_LOAD_ERROR,
POST_FETCH_DATA_SUCCESS } from './actionTypes'
import agent from '../agent.js'

export default const { Types, Creators } = createActions({
  appLoad: ['bool'],
  login: ['payload', 'error'],
  register: ['payload', 'error'],
  getTags: null,
  getCurrentUser: null,
  updateUser: null,
  updateUserError: ['status'], ['body'],
  updateUserSuccess: null,
  setToken: []
  logout: null,
  custom: (a, b) => ({ type: 'CUSTOM', total: a + b })
}, {});



