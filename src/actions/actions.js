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
  profilePageUnloaded: null,
  profileFavoritesPageUnloaded: null,
  settingsPageUnloaded: null,
  loginPageUnloaded: null,
  registerPageUnloaded: null,
  login: ['payload', 'error'],
  register: ['payload', 'error'],
  getCurrentUser: null,
  updateUser: null,
  setToken: [],
  logout: null,
  asyncStart: ['subtype'],
  asyncEnd: null,
  updateFieldAuth: ['key', 'value'],
  custom: (a, b) => ({ type: 'CUSTOM', total: a + b })
}, {});



