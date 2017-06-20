import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects';
import { Types, Creators } from './actions/actions';
import Api from '...';
import agent from '../agent.js'


function* login(action) {
  const { email, password } = yield select((state) => ({
    email: state.auth.email,
    password: state.auth.password
  }));

  try {
    const response = yield call(agent.Auth.token, email, password);
    yield put(Creators.setToken(response.body.auth.token));
    yield put(Creators.getCurrentUser());

  } catch (e) {
    yield put(Creators.loginError(response.status, response.body));
  }
}

export function* getCurrentUser() {

  try {
    const res = yield call(agent.Auth.current);
    yield put(Creators.setUser(res.user));

  } catch (e) {
  }
  yield put(Creators.appLoad(true));
}



function* register(action) {
  const { username, password, email } = yield select(state => ({
    username: state.auth.username,
    password: state.auth.password,
    email: state.auth.email
  }));

  try {
    const res = yield call(agent.Auth.register, username, email, password);
    yield put(Creators.login());
    yield put(Creators.registerSuccess());

  } catch (e) {
    yield put(Creators.registerError(res.status, res.body));
  }
}


function* postsFetchData(action) {
  try {
    yield put(Creators.postsLoading(true));
    const res = yield call(agent.Posts.all, 0); 
    yield put(Creators.postsFetchDataSuccess(res.posts));
    yield put(Creators.postsLoadError(false));
    yield put(Creators.postsLoading(false));

  } catch(e) {
    yield put(Creators.postsLoading(false));
    yield put(Creators.postsLoadError(true));
  }
}

function* postFetchData() {
  try {
    yield put(Creators.postLoading(true));
    const res = yield call(agent.Posts.get, action.slug); 
    yield put(Creators.postFetchDataSuccess(res.posts));
    yield put(Creators.postLoadError(false));
    yield put(Creators.postLoading(false));

  } catch(e) {
    yield put(Creators.postLoading(false));
    yield put(Creators.postLoadError(true));
  }
}



// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchUser(action) {
   try {
      const user = yield call(Api.fetchUser, action.payload.userId);
      yield put({type: "USER_FETCH_SUCCEEDED", user: user});
   } catch (e) {
      yield put({type: "USER_FETCH_FAILED", message: e.message});
   }
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* mySaga() {
  yield takeEvery("USER_FETCH_REQUESTED", fetchUser);
}

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
function* mySaga() {
  yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
}

export default mySaga;