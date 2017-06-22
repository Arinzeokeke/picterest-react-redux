import { call, put, takeEvery } from 'redux-saga/effects';
import { Types, Creators } from './actions/actions';
import agent from './agent.js'


function* requestLogin(action) {
  yield put(Creators.asyncStart(Types.LOGIN));
  const { email, password } = action.payload;
  //console.log('mmmmmmmm');

  try {

    const tokenResponse = yield call(agent.Auth.token, email, password);
    yield put(Creators.setToken(tokenResponse.auth.token));
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

    const res = yield call(agent.Auth.register, name, email, password);
    const token = yield call(agent.Auth.token, email, password);
    const output = { ...res.user, token: token.auth.token };
    yield put(Creators.register(output, false));
  } catch (e) {
    yield put(Creators.register(e.response.body, true));
  }
} 


// function* updateCurrentUser(action) {
//   const { user } = yield select(state => ({
//     user: state.auth.newUser
//   }));

//   try {
//     const res = yield call(agent.Auth.update, user);
//     yield put(Creators.setUser(res.body.user));
//     yield put(Creators.updateUserSuccess());

//   } catch (e) {
//     yield put(Creators.updateUserError(res.status, res.body));
//   }
// }

// export function* getTags(action) {


//   try {
//     const res = yield call(agent.Tag.all);
//     yield put(Creators.setTags(res.body.tags));
//     yield put(Creators.getTagsSuccess());

//   } catch (e) {
//     yield put(Creators.getTagsError(res.status, res.body));
//   }
// }



// function* register(action) {
//   const { username, password, email } = yield select(state => ({
//     username: state.auth.username,
//     password: state.auth.password,
//     email: state.auth.email
//   }));

//   try {
//     const res = yield call(agent.Auth.register, username, email, password);
//     yield put(Creators.login());
//     yield put(Creators.registerSuccess());

//   } catch (e) {
//     yield put(Creators.registerError(res.status, res.body));
//   }
// }




/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
console.log(Types);
function* mySaga() {
  yield takeEvery(Types.REQUEST_LOGIN, requestLogin);
  yield takeEvery(Types.REQUEST_REGISTER, requestRegister);
}

export default mySaga;