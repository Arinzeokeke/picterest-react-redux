import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects';
import { Types, Creators } from './actions/actions';
import Api from '...';
import agent from '../agent.js'


function* requestLogin(action) {
  const { email, password } = action.payload;

  try {

    const tokenResponse = yield call(agent.Auth.token, email, password);
    yield put(Creators.setToken(response.auth.token));
    const userResponse = yield call(agent.Auth.current);
    const res = { ...userResponse, token: tokenResponse.auth.token };
    yield put(Creators.login(res, false));

  } catch (e) {
    yield put(Creators.login(e.response.body, true));
  }
}

function* requestRegister(action) {
  const { name, email, password } = action.payload;

  try {

    const res = yield call(agent.Auth.register, username, email, password);
    const token = yield call(agent.Auth.token, email, password);
    const output = { ...res.user, token: token.auth.token };
    yield put(Creators.register(output, false));
  } catch (e) {
    yield put(Creators.register(e.response.body, true));
  }
} 

export function* appLoad(action) {

  try {
    const res = yield call(agent.Auth.current);
    const token = yield select(state => {
      state.common.token
    });
    const user = 
    yield put(Creators.setUser(res.user));

  } catch (e) {
  }
  yield put(Creators.appLoad(true));
}

export function* updateCurrentUser(action) {
  const { user } = yield select(state => ({
    user: state.auth.newUser
  }));

  try {
    const res = yield call(agent.Auth.update, user);
    yield put(Creators.setUser(res.body.user));
    yield put(Creators.updateUserSuccess());

  } catch (e) {
    yield put(Creators.updateUserError(res.status, res.body));
  }
}

export function* getTags(action) {


  try {
    const res = yield call(agent.Tag.all);
    yield put(Creators.setTags(res.body.tags));
    yield put(Creators.getTagsSuccess());

  } catch (e) {
    yield put(Creators.getTagsError(res.status, res.body));
  }
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

function* postFetchData(action) {
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