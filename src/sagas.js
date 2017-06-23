import { call, put, takeEvery } from 'redux-saga/effects';
import { Types, Creators } from './actions/actions';
import agent from './agent.js'


function* requestLogin(action) {
  yield put(Creators.asyncStart(Types.LOGIN));
  const { email, password } = action.payload;

 try {
    const { jwt } = yield call(agent.Auth.token, email, password);
    yield call(agent.setToken, jwt);
    yield put(Creators.setToken(jwt));
    const userResponse = yield call(agent.Auth.current);
    console.log('USER', userResponse);
    const res = { ...userResponse, token: jwt };
    yield put(Creators.login(res, false));

  } catch (e) {
    console.log('ERROR', e);
    if (e.status === 404) {
      yield put(Creators.login({errors: ['Invalid Username or Password' ]}, true));
    }
    else{
      yield put(Creators.login({errors: "Something went wrong"}, true));
    }
  }
}

function* requestRegister(action) {
  const { name, email, password } = action.payload;

  try {

    const res = yield call(agent.Auth.register, name, email, password);
    const token = yield call(agent.Auth.token, email, password);
    const output = { ...res.user, token: token.jwt };
    yield put(Creators.register(output, false));
  } catch (e) {
    console.log('ERROR', e);
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