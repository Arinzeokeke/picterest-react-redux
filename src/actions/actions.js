import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions({
  requestLogin: ['payload'],
  requestRegister: ['payload'],
  appLoad: ['payload', 'token', 'skipTracking'],
  redirect: null,
  articleSubmitted: ['payload', 'error'],
  settingsSaved: ['payload', 'error'],
  deletePost: ['payload', 'error'],
  postPageUnloaded: null,
  editorPageUnloaded: null,
  homePageUnloaded: null,
  profilePageLoaded: ['payload'],
  profilePageUnloaded: null,
  profileFavoritesPageUnloaded: null,
  settingsPageUnloaded: null,
  loginPageUnloaded: null,
  registerPageUnloaded: null,
  homePageLoaded: ['tab', 'pager', 'payload'],
  login: ['payload', 'error'],
  register: ['payload', 'error'],
  getCurrentUser: null,
  updateUser: null,
  setToken: ['token'],
  logout: null,
  asyncStart: ['subtype'],
  asyncEnd: null,
  updateFieldAuth: ['key', 'value'],
  applyTagFilter: ['tag', 'pager', 'payload'],
  postLiked: ['payload'],
  postUnliked: ['payload'],
  setPage: ['page', 'payload'],
  changeTab: ['tab', 'pager', 'payload'],

  custom: (a, b) => ({ type: 'CUSTOM', total: a + b })
}, {});



