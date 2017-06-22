import { createActions } from 'reduxsauce';
import {POSTS_ARE_LOADING,
POSTS_LOAD_ERROR,
POSTS_FETCH_DATA_SUCCESS,
POST_IS_LOADING,
POST_LOAD_ERROR,
POST_FETCH_DATA_SUCCESS } from './actionTypes'
import agent from '../agent.js'

export default const { Types, Creators } = createActions({
  requestAppLoad
  appLoad: ['payload', 'token', 'skipTracking'],
  redirect: null,
  articleSubmitted: ['payload', 'error'],
  settingsSaved: ['payload', 'error'],
  deletePost: ['payload', 'error'],
  postPageUnloaded: null,
  editorPageUnloaded: null,
  homePageUnloaded: null,
  profilePageUnloaded: null,
  profileFavoritesPageUnloaded: null,
  settingsPageUnloaded: null,
  loginPageUnloaded: null,
  registerPageUnloaded: null,
  login: ['payload', 'error'],
  register: ['payload', 'error'],
  getCurrentUser: null,
  updateUser: null,
  setToken: []
  logout: null,
  asyncStart: ['subtype'],
  updateFieldAuth: ['key', 'value'],
  custom: (a, b) => ({ type: 'CUSTOM', total: a + b })
}, {});



